import { query, withTransaction } from "../libs/db.js";
import { formatOrderById } from "../libs/mysqlDataHelper.js";

const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"];
const validPaymentStatuses = ["UNPAID", "PAID", "REFUNDED"];

const postOrder = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { shippingAddress, buyerName, buyerEmail, buyerPhone, note } = req.body;

    if (!shippingAddress || !buyerName || !buyerPhone) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const orderId = await withTransaction(async (conn) => {
      const [cartRows] = await conn.query("SELECT id FROM carts WHERE user_id = ? LIMIT 1", [userId]);
      const cart = cartRows[0];

      if (!cart) {
        throw new Error("EMPTY_CART");
      }

      const [cartItems] = await conn.query(
        `SELECT ci.book_id, ci.quantity, b.title, b.price, b.stock
         FROM cart_items ci
         INNER JOIN books b ON b.id = ci.book_id
         WHERE ci.cart_id = ?`,
        [cart.id]
      );

      if (cartItems.length === 0) {
        throw new Error("EMPTY_CART");
      }

      let totalAmount = 0;

      for (const item of cartItems) {
        if (Number(item.stock) < Number(item.quantity)) {
          throw new Error(`OUT_OF_STOCK:${item.title}:${item.stock}`);
        }
        totalAmount += Number(item.price) * Number(item.quantity);
      }

      const [result] = await conn.query(
        `INSERT INTO orders
         (user_id, total_amount, shipping_address, buyer_name, buyer_email, buyer_phone, note, status, payment_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', 'UNPAID')`,
        [
          userId,
          totalAmount,
          shippingAddress,
          buyerName,
          buyerEmail || req.user.email,
          buyerPhone,
          note || null,
        ]
      );

      for (const item of cartItems) {
        await conn.query(
          `INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
           VALUES (?, ?, ?, ?)`,
          [result.insertId, item.book_id, item.quantity, item.price]
        );

        await conn.query("UPDATE books SET stock = stock - ? WHERE id = ?", [item.quantity, item.book_id]);
      }

      await conn.query("DELETE FROM cart_items WHERE cart_id = ?", [cart.id]);

      return result.insertId;
    });

    const newOrder = await formatOrderById(orderId);

    return res.status(201).json({ message: "Đặt hàng thành công!", data: newOrder });
  } catch (error) {
    if (error.message === "EMPTY_CART") {
      return res.status(400).json({ message: "Giỏ hàng của bạn đang trống" });
    }

    if (error.message.startsWith("OUT_OF_STOCK:")) {
      const [, title, stock] = error.message.split(":");
      return res.status(400).json({ message: `Sách "${title}" không đủ hàng! Còn lại: ${stock}` });
    }

    return res.status(500).json({ message: `Create order error: ${error.message}` });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const whereParts = ["user_id = ?"];
    const params = [userId];

    if (req.query.status) {
      whereParts.push("status = ?");
      params.push(req.query.status);
    }

    const whereClause = `WHERE ${whereParts.join(" AND ")}`;

    const orderRows = await query(
      `SELECT id FROM orders ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );

    const [{ total }] = await query(
      `SELECT COUNT(*) AS total FROM orders ${whereClause}`,
      params
    );

    const orders = await Promise.all(orderRows.map((row) => formatOrderById(row.id)));

    return res.status(200).json({
      message: "Lấy đơn hàng thành công!",
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    return res.status(500).json({ message: `Get user orders error: ${error.message}` });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { id } = req.params;

    const orderRows = await query("SELECT id, user_id FROM orders WHERE id = ? LIMIT 1", [id]);
    const orderRow = orderRows[0];

    if (!orderRow) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (Number(orderRow.user_id) !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập đơn hàng này" });
    }

    const order = await formatOrderById(orderRow.id);
    return res.status(200).json({ message: "Lấy thông tin đơn hàng thành công!", data: order });
  } catch (error) {
    return res.status(500).json({ message: `Get order by id error: ${error.message}` });
  }
};

const cancelOrderById = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { id } = req.params;
    const { cancelReason } = req.body;

    const orderRows = await query(
      "SELECT id, user_id, status FROM orders WHERE id = ? LIMIT 1",
      [id]
    );
    const order = orderRows[0];

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (Number(order.user_id) !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập đơn hàng này" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Chỉ có thể hủy đơn hàng ở trạng thái Đang chờ xử lý" });
    }

    await withTransaction(async (conn) => {
      await conn.query(
        "UPDATE orders SET status = 'CANCELLED', cancel_reason = ? WHERE id = ?",
        [cancelReason || "Người dùng hủy đơn hàng", id]
      );

      const [items] = await conn.query(
        "SELECT book_id, quantity FROM order_items WHERE order_id = ?",
        [id]
      );

      for (const item of items) {
        await conn.query("UPDATE books SET stock = stock + ? WHERE id = ?", [item.quantity, item.book_id]);
      }
    });

    const updatedOrder = await formatOrderById(Number(id));
    return res.status(200).json({ message: "Hủy đơn hàng thành công!", data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: `Cancel order error: ${error.message}` });
  }
};

const getALlOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const whereParts = [];
    const params = [];

    if (req.query.status) {
      whereParts.push("status = ?");
      params.push(req.query.status);
    }

    if (req.query.paymentStatus) {
      whereParts.push("payment_status = ?");
      params.push(req.query.paymentStatus);
    }

    const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    const orderRows = await query(
      `SELECT id FROM orders ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );

    const [{ total }] = await query(
      `SELECT COUNT(*) AS total FROM orders ${whereClause}`,
      params
    );

    const orders = await Promise.all(orderRows.map((row) => formatOrderById(row.id)));

    return res.status(200).json({
      message: "Lấy danh sách đơn hàng thành công!",
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    return res.status(500).json({ message: `Get all orders error: ${error.message}` });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const rows = await query("SELECT id, status FROM orders WHERE id = ? LIMIT 1", [id]);
    const order = rows[0];

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Trạng thái đơn hàng không hợp lệ" });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: "Trạng thái thanh toán không hợp lệ" });
    }

    await withTransaction(async (conn) => {
      if (status) {
        if (order.status !== "CANCELLED" && status === "CANCELLED") {
          const [items] = await conn.query(
            "SELECT book_id, quantity FROM order_items WHERE order_id = ?",
            [id]
          );

          for (const item of items) {
            await conn.query("UPDATE books SET stock = stock + ? WHERE id = ?", [item.quantity, item.book_id]);
          }
        }

        if (status === "COMPLETED") {
          await conn.query("UPDATE orders SET status = ?, delivered_at = NOW() WHERE id = ?", [status, id]);
        } else {
          await conn.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
        }
      }

      if (paymentStatus) {
        if (paymentStatus === "PAID") {
          await conn.query("UPDATE orders SET payment_status = ?, paid_at = NOW() WHERE id = ?", [paymentStatus, id]);
        } else {
          await conn.query("UPDATE orders SET payment_status = ? WHERE id = ?", [paymentStatus, id]);
        }
      }
    });

    const updatedOrder = await formatOrderById(Number(id));
    return res.status(200).json({ message: "Cập nhật trạng thái đơn hàng thành công!", data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: `Update order status error: ${error.message}` });
  }
};

export { postOrder, getUserOrders, getOrderById, cancelOrderById, getALlOrders, updateOrderStatus };
