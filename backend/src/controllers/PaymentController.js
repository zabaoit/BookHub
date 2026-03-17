import { query } from "../libs/db.js";
import { createVNPayPaymentUrl, verifyVNPayCallback } from "../libs/vnpayHelper.js";
import { createMoMoPaymentUrl, verifyMoMoCallback } from "../libs/momoHelper.js";

const getOrderById = async (orderId) => {
  const rows = await query(
    "SELECT id, user_id, status, payment_status, total_amount FROM orders WHERE id = ? LIMIT 1",
    [orderId]
  );
  return rows[0] || null;
};

const getPaymentByOrderIdFromDb = async (orderId) => {
  const rows = await query(
    "SELECT id, order_id, provider, provider_id, amount, status, paid_at, created_at, updated_at FROM payments WHERE order_id = ? LIMIT 1",
    [orderId]
  );
  return rows[0] || null;
};

const createVNPayPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = Number(req.user._id);

    if (!orderId) {
      return res.status(400).json({ message: "Vui lòng cung cấp orderId!" });
    }

    const order = await getOrderById(Number(orderId));
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    if (Number(order.user_id) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền thanh toán đơn hàng này!" });
    }

    if (order.status === "CANCELLED") {
      return res.status(400).json({ message: "Đơn hàng đã bị hủy!" });
    }

    if (order.payment_status === "PAID") {
      return res.status(400).json({ message: "Đơn hàng đã được thanh toán!" });
    }

    const vnpTmnCode = process.env.VNP_TMN_CODE;
    const vnpHashSecret = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    if (!vnpTmnCode || !vnpHashSecret || !vnpUrl || !returnUrl) {
      return res.status(500).json({ message: "Chưa cấu hình VNPay! Vui lòng kiểm tra file .env" });
    }

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip ||
      "127.0.0.1";

    const amount = Number(order.total_amount);
    const orderInfo = `Thanh toan don hang ${orderId}`;

    const paymentUrl = createVNPayPaymentUrl(
      String(orderId),
      amount,
      orderInfo,
      ipAddr,
      returnUrl,
      vnpTmnCode,
      vnpHashSecret,
      vnpUrl
    );

    const existingPayment = await getPaymentByOrderIdFromDb(Number(orderId));
    if (existingPayment) {
      return res.status(400).json({ message: "Đơn hàng đã có phương thức thanh toán!" });
    }

    await query(
      "INSERT INTO payments (order_id, provider, amount, status) VALUES (?, 'VNPAY', ?, 'UNPAID')",
      [Number(orderId), amount]
    );

    return res.status(200).json({
      message: "Tạo URL thanh toán VNPay thành công!",
      paymentUrl,
    });
  } catch (error) {
    console.error("Create VNPay payment error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const vnpayCallback = async (req, res) => {
  try {
    const vnpParams = req.query;
    const vnpHashSecret = process.env.VNP_HASH_SECRET;

    const isValid = verifyVNPayCallback(vnpParams, vnpHashSecret);
    if (!isValid) {
      return res.status(400).json({ message: "Chữ ký không hợp lệ!" });
    }

    const orderId = Number(vnpParams.vnp_TxnRef);
    const responseCode = vnpParams.vnp_ResponseCode;
    const transactionNo = vnpParams.vnp_TransactionNo;

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    const payment = await getPaymentByOrderIdFromDb(orderId);

    if (responseCode === "00") {
      await query("UPDATE orders SET payment_status = 'PAID', paid_at = NOW() WHERE id = ?", [orderId]);

      if (payment) {
        await query(
          "UPDATE payments SET status = 'PAID', provider_id = ?, paid_at = NOW() WHERE id = ?",
          [transactionNo, payment.id]
        );
      }

      return res.status(200).json({ message: "Thanh toán thành công!", data: vnpParams });
    }

    if (payment) {
      await query("UPDATE payments SET status = 'FAILED' WHERE id = ?", [payment.id]);
    }

    return res.status(400).json({
      message: "Thanh toán thất bại",
      data: vnpParams,
    });
  } catch (error) {
    console.error("VNPay callback error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const createMoMoPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = Number(req.user._id);

    if (!orderId) {
      return res.status(400).json({ message: "Vui lòng cung cấp orderId!" });
    }

    const order = await getOrderById(Number(orderId));
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    if (Number(order.user_id) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền thanh toán đơn hàng này!" });
    }

    if (order.status === "CANCELLED") {
      return res.status(400).json({ message: "Đơn hàng đã bị hủy!" });
    }

    if (order.payment_status === "PAID") {
      return res.status(400).json({ message: "Đơn hàng đã được thanh toán!" });
    }

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const momoApiUrl = process.env.MOMO_API_URL;
    const returnUrl = process.env.MOMO_RETURN_URL;
    const notifyUrl = process.env.MOMO_NOTIFY_URL;

    if (!partnerCode || !accessKey || !secretKey || !momoApiUrl || !returnUrl || !notifyUrl) {
      return res.status(500).json({ message: "Chưa cấu hình MoMo! Vui lòng kiểm tra file .env" });
    }

    const amount = Number(order.total_amount);
    const orderInfo = `Thanh toan don hang ${orderId}`;
    const momoOrderId = `${orderId}_${new Date().getTime()}`;

    const momoResponse = await createMoMoPaymentUrl(
      momoOrderId,
      amount,
      orderInfo,
      returnUrl,
      notifyUrl,
      partnerCode,
      accessKey,
      secretKey,
      momoApiUrl
    );

    if (momoResponse.resultCode !== 0) {
      return res.status(400).json({
        message: `Lỗi MoMo: ${momoResponse.message}`,
        resultCode: momoResponse.resultCode,
      });
    }

    const existingPayment = await getPaymentByOrderIdFromDb(Number(orderId));
    if (existingPayment) {
      return res.status(400).json({ message: "Đơn hàng đã có phương thức thanh toán!" });
    }

    await query(
      "INSERT INTO payments (order_id, provider, provider_id, amount, status) VALUES (?, 'MOMO', ?, ?, 'UNPAID')",
      [Number(orderId), momoOrderId, amount]
    );

    return res.status(200).json({
      message: "Tạo URL thanh toán MoMo thành công!",
      paymentUrl: momoResponse.payUrl,
      deeplink: momoResponse.deeplink,
      qrCodeUrl: momoResponse.qrCodeUrl,
    });
  } catch (error) {
    console.error("Create MoMo payment error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const momoCallback = async (req, res) => {
  try {
    const momoParams = req.body;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const accessKey = process.env.MOMO_ACCESS_KEY;

    const isValid = verifyMoMoCallback(momoParams, accessKey, secretKey);
    if (!isValid) {
      return res.status(400).json({ message: "Chữ ký không hợp lệ!" });
    }

    const rawOrderId = momoParams.orderId;
    const orderId = Number(rawOrderId.split("_")[0]);
    const resultCode = Number(momoParams.resultCode);
    const transId = momoParams.transId;

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    const payment = await getPaymentByOrderIdFromDb(orderId);

    if (resultCode === 0) {
      await query("UPDATE orders SET payment_status = 'PAID', paid_at = NOW() WHERE id = ?", [orderId]);

      if (payment) {
        await query(
          "UPDATE payments SET status = 'PAID', provider_id = ?, paid_at = NOW() WHERE id = ?",
          [transId, payment.id]
        );
      }

      return res.status(200).json({ message: "Thanh toán thành công!" });
    }

    if (payment) {
      await query("UPDATE payments SET status = 'FAILED' WHERE id = ?", [payment.id]);
    }

    return res.status(200).json({ message: "Thanh toán thất bại!" });
  } catch (error) {
    console.error("MoMo callback error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const momoReturn = async (req, res) => {
  try {
    const momoParams = req.query;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const accessKey = process.env.MOMO_ACCESS_KEY;

    const isValid = verifyMoMoCallback(momoParams, accessKey, secretKey);
    if (!isValid) {
      return res.status(400).json({ message: "Chữ ký không hợp lệ!" });
    }

    const rawOrderId = momoParams.orderId;
    const orderId = Number(rawOrderId.split("_")[0]);
    const resultCode = Number(momoParams.resultCode);
    const transId = momoParams.transId;

    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    const payment = await getPaymentByOrderIdFromDb(orderId);

    if (resultCode === 0) {
      if (order.payment_status !== "PAID") {
        await query("UPDATE orders SET payment_status = 'PAID', paid_at = NOW() WHERE id = ?", [orderId]);

        if (payment) {
          await query(
            "UPDATE payments SET status = 'PAID', provider_id = ?, paid_at = NOW() WHERE id = ?",
            [transId, payment.id]
          );
        }
      }

      return res.status(200).json({
        message: "Thanh toán thành công!",
        data: momoParams,
      });
    }

    if (payment) {
      await query("UPDATE payments SET status = 'FAILED' WHERE id = ?", [payment.id]);
    }

    return res.status(400).json({
      message: "Thanh toán thất bại",
      data: momoParams,
    });
  } catch (error) {
    console.error("MoMo return error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const createCODPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = Number(req.user._id);

    if (!orderId) {
      return res.status(400).json({ message: "Vui lòng cung cấp orderId!" });
    }

    const order = await getOrderById(Number(orderId));
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    if (Number(order.user_id) !== userId) {
      return res.status(403).json({ message: "Bạn không có quyền thanh toán đơn hàng này!" });
    }

    if (order.status === "CANCELLED") {
      return res.status(400).json({ message: "Đơn hàng đã bị hủy!" });
    }

    if (order.payment_status === "PAID") {
      return res.status(400).json({ message: "Đơn hàng đã được thanh toán!" });
    }

    const existingPayment = await getPaymentByOrderIdFromDb(Number(orderId));
    if (existingPayment) {
      return res.status(400).json({ message: "Đơn hàng đã có phương thức thanh toán!" });
    }

    await query(
      "INSERT INTO payments (order_id, provider, amount, status) VALUES (?, 'COD', ?, 'UNPAID')",
      [Number(orderId), Number(order.total_amount)]
    );

    return res.status(200).json({
      message: "Đặt hàng COD thành công! Vui lòng thanh toán khi nhận hàng.",
      data: {
        orderId: String(order.id),
        totalAmount: Number(order.total_amount),
        paymentMethod: "COD",
      },
    });
  } catch (error) {
    console.error("Create COD payment error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = Number(req.user._id);

    const order = await getOrderById(Number(orderId));
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    if (Number(order.user_id) !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Bạn không có quyền xem thông tin thanh toán này!" });
    }

    const payment = await getPaymentByOrderIdFromDb(Number(orderId));

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy thông tin thanh toán!" });
    }

    return res.status(200).json({
      message: "Lấy thông tin thanh toán thành công!",
      data: {
        _id: String(payment.id),
        order: {
          _id: String(order.id),
          totalAmount: Number(order.total_amount),
          status: order.status,
          paymentStatus: order.payment_status,
        },
        provider: payment.provider,
        providerId: payment.provider_id,
        amount: Number(payment.amount),
        status: payment.status,
        paidAt: payment.paid_at,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
      },
    });
  } catch (error) {
    console.error("Get payment error:", error);
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

export {
  createVNPayPayment,
  vnpayCallback,
  createMoMoPayment,
  momoCallback,
  momoReturn,
  createCODPayment,
  getPaymentByOrderId,
};
