import { query } from "../libs/db.js";

const getWishlist = async (req, res) => {
  try {
    const userId = Number(req.user._id);

    const rows = await query(
      `SELECT
        b.id,
        b.title,
        b.price,
        b.stock,
        bi.url AS image_url,
        uw.created_at
      FROM user_wishlists uw
      INNER JOIN books b ON b.id = uw.book_id
      LEFT JOIN book_images bi ON bi.book_id = b.id AND bi.display_order = 0
      WHERE uw.user_id = ?
      ORDER BY uw.created_at DESC`,
      [userId]
    );

    return res.status(200).json({
      message: "Lấy wishlist thành công!",
      data: rows.map((row) => ({
        _id: String(row.id),
        title: row.title,
        price: row.price,
        stock: row.stock,
        imageUrl: row.image_url || null,
        addedAt: row.created_at,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const getWishlistStatus = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const bookId = Number(req.params.bookId);

    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Book ID không hợp lệ!" });
    }

    const rows = await query(
      "SELECT id FROM user_wishlists WHERE user_id = ? AND book_id = ? LIMIT 1",
      [userId, bookId]
    );

    return res.status(200).json({
      message: "Lấy trạng thái wishlist thành công!",
      data: { isWishlisted: rows.length > 0 },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const bookId = Number(req.body.bookId);

    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Book ID không hợp lệ!" });
    }

    const books = await query("SELECT id FROM books WHERE id = ? LIMIT 1", [bookId]);
    if (books.length === 0) {
      return res.status(404).json({ message: "Sách không tồn tại!" });
    }

    await query(
      "INSERT INTO user_wishlists (user_id, book_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = created_at",
      [userId, bookId]
    );

    return res.status(200).json({
      message: "Đã thêm vào wishlist!",
      data: { bookId: String(bookId), isWishlisted: true },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const bookId = Number(req.params.bookId);

    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Book ID không hợp lệ!" });
    }

    await query("DELETE FROM user_wishlists WHERE user_id = ? AND book_id = ?", [
      userId,
      bookId,
    ]);

    return res.status(200).json({
      message: "Đã xóa khỏi wishlist!",
      data: { bookId: String(bookId), isWishlisted: false },
    });
  } catch (error) {
    return res.status(500).json({ message: `Lỗi server: ${error.message}` });
  }
};

export { getWishlist, getWishlistStatus, addToWishlist, removeFromWishlist };
