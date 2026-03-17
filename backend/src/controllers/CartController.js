import { query, withTransaction } from "../libs/db.js";
import { formatCart, getOrCreateCartByUserId } from "../libs/mysqlDataHelper.js";

const buildCartResponse = async (cartId) => {
  const items = await formatCart(cartId);
  const totalAmount = items.reduce((total, item) => total + item.book.price * item.quantity, 0);

  return {
    cart: {
      _id: String(cartId),
      items,
    },
    totalAmount,
    totalItems: items.length,
  };
};

const postCart = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity) {
      return res.status(400).json({ message: "Sách không tồn tại trong giỏ hàng" });
    }

    const quantityInt = parseInt(quantity, 10);
    if (quantityInt < 1) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn hoặc bằng 1" });
    }

    const bookRows = await query(
      "SELECT id, stock FROM books WHERE id = ? LIMIT 1",
      [Number(bookId)]
    );
    const book = bookRows[0];

    if (!book) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    if (Number(book.stock) < quantityInt) {
      return res.status(400).json({
        message: `Số lượng trong kho không đủ! Còn lại: ${book.stock}, bạn muốn mua: ${quantity}`,
      });
    }

    const cartId = await withTransaction(async (conn) => {
      const cart = await getOrCreateCartByUserId(userId, conn);

      const [existingRows] = await conn.query(
        "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND book_id = ? LIMIT 1",
        [cart.id, Number(bookId)]
      );

      if (existingRows.length > 0) {
        const existing = existingRows[0];
        const newQuantity = Number(existing.quantity) + quantityInt;

        if (Number(book.stock) < newQuantity) {
          throw new Error(`OUT_OF_STOCK:${book.stock}:${newQuantity}`);
        }

        await conn.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [newQuantity, existing.id]);
      } else {
        await conn.query(
          "INSERT INTO cart_items (cart_id, book_id, quantity) VALUES (?, ?, ?)",
          [cart.id, Number(bookId), quantityInt]
        );
      }

      return cart.id;
    });

    const cartData = await buildCartResponse(cartId);
    return res.status(200).json({ message: "Thêm sách vào giỏ hàng thành công!", data: cartData.cart });
  } catch (error) {
    if (String(error.message).startsWith("OUT_OF_STOCK:")) {
      const [, stock, need] = String(error.message).split(":");
      return res.status(400).json({
        message: `Số lượng trong kho không đủ! Còn lại: ${stock}, tổng cần: ${need}`,
      });
    }

    return res.status(500).json({ message: `Post cart error: ${error.message}` });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const cart = await getOrCreateCartByUserId(userId);
    const data = await buildCartResponse(cart.id);

    return res.status(200).json({
      message: "Lấy giỏ hàng thành công!",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: `Get cart error: ${error.message}` });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { bookId, quantity } = req.body;

    if (!bookId || quantity === undefined || quantity === null) {
      return res.status(400).json({ message: "Sách không tồn tại trong giỏ hàng" });
    }

    const quantityInt = parseInt(quantity, 10);
    if (quantityInt < 0) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn hoặc bằng 1" });
    }

    const cartRows = await query("SELECT id FROM carts WHERE user_id = ? LIMIT 1", [userId]);
    const cart = cartRows[0];
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const itemRows = await query(
      "SELECT id FROM cart_items WHERE cart_id = ? AND book_id = ? LIMIT 1",
      [cart.id, Number(bookId)]
    );

    if (itemRows.length === 0) {
      return res.status(404).json({ message: "Sách không tồn tại trong giỏ hàng" });
    }

    if (quantityInt === 0) {
      await query("DELETE FROM cart_items WHERE id = ?", [itemRows[0].id]);
    } else {
      const bookRows = await query("SELECT id, stock FROM books WHERE id = ? LIMIT 1", [Number(bookId)]);
      const book = bookRows[0];
      if (!book) {
        return res.status(404).json({ message: "Không tìm thấy sách" });
      }
      if (Number(book.stock) < quantityInt) {
        return res.status(400).json({
          message: `Số lượng trong kho không đủ! Còn lại: ${book.stock}, bạn muốn mua: ${quantity}`,
        });
      }

      await query("UPDATE cart_items SET quantity = ? WHERE id = ?", [quantityInt, itemRows[0].id]);
    }

    const cartData = await buildCartResponse(cart.id);
    return res.status(200).json({ message: "Cập nhật giỏ hàng thành công!", data: cartData.cart });
  } catch (error) {
    return res.status(500).json({ message: `Update cart error: ${error.message}` });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const { bookId } = req.params;

    const cartRows = await query("SELECT id FROM carts WHERE user_id = ? LIMIT 1", [userId]);
    const cart = cartRows[0];
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const itemRows = await query(
      "SELECT id FROM cart_items WHERE cart_id = ? AND book_id = ? LIMIT 1",
      [cart.id, Number(bookId)]
    );

    if (itemRows.length === 0) {
      return res.status(404).json({ message: "Sách không tồn tại trong giỏ hàng" });
    }

    await query("DELETE FROM cart_items WHERE id = ?", [itemRows[0].id]);

    const cartData = await buildCartResponse(cart.id);
    return res.status(200).json({ message: "Xoá sách khỏi giỏ hàng thành công!", data: cartData.cart });
  } catch (error) {
    return res.status(500).json({ message: `Remove cart error: ${error.message}` });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const cartRows = await query("SELECT id FROM carts WHERE user_id = ? LIMIT 1", [userId]);
    const cart = cartRows[0];

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    await query("DELETE FROM cart_items WHERE cart_id = ?", [cart.id]);

    const cartData = await buildCartResponse(cart.id);
    return res.status(200).json({ message: "Xoá tất cả sách khỏi giỏ hàng thành công!", data: cartData.cart });
  } catch (error) {
    return res.status(500).json({ message: `Clear cart error: ${error.message}` });
  }
};

export { postCart, getCart, updateCartItem, removeCartItem, clearCart };
