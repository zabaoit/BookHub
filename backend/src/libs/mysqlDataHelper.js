import { query } from "./db.js";

const toBookObject = (row) => ({
  _id: String(row.id),
  title: row.title,
  slug: row.slug,
  description: row.description,
  isbn: row.isbn,
  publisher: row.publisher,
  publicationDate: row.publication_date,
  pages: row.pages,
  language: row.language,
  price: Number(row.price || 0),
  stock: Number(row.stock || 0),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  author: [],
  categories: [],
  images: [],
});

export const normalizeIdArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((id) => Number(id));
  return [Number(value)];
};

export const getBooksByIds = async (bookIds) => {
  const normalizedIds = [...new Set(bookIds.map((id) => Number(id)).filter(Boolean))];
  if (normalizedIds.length === 0) return [];

  const books = await query(
    `SELECT id, title, slug, description, isbn, publisher, publication_date, pages, language, price, stock, created_at, updated_at
     FROM books
     WHERE id IN (?)`,
    [normalizedIds]
  );

  const bookMap = new Map();
  for (const row of books) {
    bookMap.set(Number(row.id), toBookObject(row));
  }

  const authorRows = await query(
    `SELECT ba.book_id, a.id, a.name
     FROM book_authors ba
     INNER JOIN authors a ON a.id = ba.author_id
     WHERE ba.book_id IN (?)`,
    [normalizedIds]
  );

  for (const row of authorRows) {
    const book = bookMap.get(Number(row.book_id));
    if (book) {
      book.author.push({ _id: String(row.id), name: row.name });
    }
  }

  const categoryRows = await query(
    `SELECT bc.book_id, c.id, c.name
     FROM book_categories bc
     INNER JOIN categories c ON c.id = bc.category_id
     WHERE bc.book_id IN (?)`,
    [normalizedIds]
  );

  for (const row of categoryRows) {
    const book = bookMap.get(Number(row.book_id));
    if (book) {
      book.categories.push({ _id: String(row.id), name: row.name });
    }
  }

  const imageRows = await query(
    `SELECT book_id, id, url, alt_text, display_order
     FROM book_images
     WHERE book_id IN (?)
     ORDER BY display_order ASC, id ASC`,
    [normalizedIds]
  );

  for (const row of imageRows) {
    const book = bookMap.get(Number(row.book_id));
    if (book) {
      book.images.push({
        _id: String(row.id),
        url: row.url,
        altText: row.alt_text,
        order: row.display_order,
      });
    }
  }

  return normalizedIds.map((id) => bookMap.get(id)).filter(Boolean);
};

export const getBookById = async (bookId) => {
  const books = await getBooksByIds([bookId]);
  return books[0] || null;
};

export const getOrCreateCartByUserId = async (userId, conn = null) => {
  const executor = conn || { query: async (sql, params) => [await query(sql, params)] };
  const [cartRows] = await executor.query("SELECT id, user_id, created_at, updated_at FROM carts WHERE user_id = ?", [userId]);

  if (cartRows.length > 0) {
    return cartRows[0];
  }

  const [insertResult] = await executor.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
  const [newRows] = await executor.query("SELECT id, user_id, created_at, updated_at FROM carts WHERE id = ?", [insertResult.insertId]);
  return newRows[0];
};

export const formatCart = async (cartId) => {
  const rows = await query(
    `SELECT ci.id AS cart_item_id, ci.quantity, b.id AS book_id
     FROM cart_items ci
     INNER JOIN books b ON b.id = ci.book_id
     WHERE ci.cart_id = ?`,
    [cartId]
  );

  const books = await getBooksByIds(rows.map((row) => row.book_id));
  const bookMap = new Map(books.map((book) => [Number(book._id), book]));

  const items = rows
    .map((row) => ({
      _id: String(row.cart_item_id),
      book_id: Number(row.book_id),
      quantity: Number(row.quantity),
      book: bookMap.get(Number(row.book_id)) || null,
    }))
    .filter((item) => item.book);

  return items;
};

export const formatOrderById = async (orderId) => {
  const orderRows = await query(
    `SELECT o.id, o.user_id, o.order_date, o.status, o.payment_status, o.total_amount, o.shipping_address,
            o.note, o.buyer_name, o.buyer_email, o.buyer_phone, o.cancel_reason, o.delivered_at, o.paid_at,
            o.created_at, o.updated_at,
            u.username, u.email
     FROM orders o
     INNER JOIN users u ON u.id = o.user_id
     WHERE o.id = ?`,
    [orderId]
  );

  if (orderRows.length === 0) {
    return null;
  }

  const order = orderRows[0];
  const itemRows = await query(
    `SELECT oi.id, oi.book_id, oi.quantity, oi.price_at_purchase
     FROM order_items oi
     WHERE oi.order_id = ?`,
    [orderId]
  );

  const books = await getBooksByIds(itemRows.map((item) => item.book_id));
  const bookMap = new Map(books.map((book) => [Number(book._id), book]));

  return {
    _id: String(order.id),
    user: {
      _id: String(order.user_id),
      username: order.username,
      email: order.email,
    },
    orderDate: order.order_date,
    status: order.status,
    paymentStatus: order.payment_status,
    totalAmount: Number(order.total_amount),
    shippingAddress: order.shipping_address,
    note: order.note,
    buyerName: order.buyer_name,
    buyerEmail: order.buyer_email,
    buyerPhone: order.buyer_phone,
    cancelReason: order.cancel_reason,
    deliveredAt: order.delivered_at,
    paidAt: order.paid_at,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    items: itemRows.map((item) => ({
      _id: String(item.id),
      quantity: Number(item.quantity),
      priceAtPurchase: Number(item.price_at_purchase),
      book: bookMap.get(Number(item.book_id)) || null,
    })),
  };
};
