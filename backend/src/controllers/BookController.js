import { query, withTransaction } from "../libs/db.js";
import { getBookById as fetchBookById, getBooksByIds, normalizeIdArray } from "../libs/mysqlDataHelper.js";

const insertBookRelations = async (conn, bookId, authorIds, categoryIds, images = []) => {
  const normalizedAuthorIds = [...new Set(normalizeIdArray(authorIds))];
  const normalizedCategoryIds = [...new Set(normalizeIdArray(categoryIds))];

  if (normalizedAuthorIds.length > 0) {
    const authorValues = normalizedAuthorIds.map((authorId) => [bookId, authorId]);
    await conn.query("INSERT INTO book_authors (book_id, author_id) VALUES ?", [authorValues]);
  }

  if (normalizedCategoryIds.length > 0) {
    const categoryValues = normalizedCategoryIds.map((categoryId) => [bookId, categoryId]);
    await conn.query("INSERT INTO book_categories (book_id, category_id) VALUES ?", [categoryValues]);
  }

  if (Array.isArray(images) && images.length > 0) {
    const imageValues = images.map((image, index) => [
      bookId,
      image.url || null,
      image.altText || null,
      Number(image.order ?? index),
    ]);
    await conn.query("INSERT INTO book_images (book_id, url, alt_text, display_order) VALUES ?", [imageValues]);
  }
};

const postBook = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      price,
      stock,
      author,
      images,
      categories,
    } = req.body;

    if (!title || !slug || price === undefined || price === null) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }

    const existing = await query("SELECT id FROM books WHERE slug = ? LIMIT 1", [slug]);
    if (existing.length > 0) {
      return res.status(400).json({
        message: "Đường dẫn URL đã tồn tại, vui lòng chọn đường dẫn khác",
      });
    }

    const bookId = await withTransaction(async (conn) => {
      const [result] = await conn.query(
        `INSERT INTO books (title, slug, description, isbn, publisher, publication_date, pages, language, price, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          slug,
          description || null,
          isbn || null,
          publisher || null,
          publicationDate || null,
          pages || null,
          language || null,
          Number(price),
          Number(stock || 0),
        ]
      );

      await insertBookRelations(conn, result.insertId, author, categories, images);
      return result.insertId;
    });

    const newBook = await fetchBookById(bookId);

    return res.status(201).json({ message: "Thêm sách thành công!", data: newBook });
  } catch (error) {
    return res.status(500).json({ message: `Loi server: ${error.message}` });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, author, sortBy } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    const whereParts = [];
    const params = [];

    if (search) {
      whereParts.push("b.title LIKE ?");
      params.push(`%${search}%`);
    }

    if (category) {
      whereParts.push("EXISTS (SELECT 1 FROM book_categories bc WHERE bc.book_id = b.id AND bc.category_id = ?)");
      params.push(Number(category));
    }

    if (author) {
      whereParts.push("EXISTS (SELECT 1 FROM book_authors ba WHERE ba.book_id = b.id AND ba.author_id = ?)");
      params.push(Number(author));
    }

    let orderBy = "b.created_at DESC";
    if (sortBy === "oldest") {
      orderBy = "b.created_at ASC";
    } else if (sortBy === "price-low") {
      orderBy = "b.price ASC";
    } else if (sortBy === "price-high") {
      orderBy = "b.price DESC";
    }

    const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    const countRows = await query(
      `SELECT COUNT(*) AS totalBooks FROM books b ${whereClause}`,
      params
    );
    const totalBooks = countRows[0]?.totalBooks || 0;

    const rows = await query(
      `SELECT b.id
       FROM books b
       ${whereClause}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, limitNum, offset]
    );

    const books = await getBooksByIds(rows.map((row) => row.id));

    return res.status(200).json({
      message: "Lấy danh sách sách thành công!",
      data: books,
      total: totalBooks,
      page: pageNum,
      totalPages: Math.ceil(totalBooks / limitNum) || 1,
    });
  } catch (error) {
    return res.status(500).json({ message: `Get all books error: ${error.message}` });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await fetchBookById(Number(id));
    if (!book) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    return res.status(200).json({ message: "Lấy thông tin sách thành công!", data: book });
  } catch (error) {
    return res.status(500).json({ message: `Get book by id error: ${error.message}` });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      price,
      stock,
      author,
      images,
      categories,
    } = req.body;

    const existingRows = await query("SELECT id FROM books WHERE id = ? LIMIT 1", [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    const slugRows = await query("SELECT id FROM books WHERE slug = ? AND id <> ? LIMIT 1", [slug, id]);
    if (slug && slugRows.length > 0) {
      return res.status(400).json({ message: "Đường dẫn URL đã tồn tại, vui lòng chọn đường dẫn khác" });
    }

    await withTransaction(async (conn) => {
      await conn.query(
        `UPDATE books
         SET title = ?, slug = ?, description = ?, isbn = ?, publisher = ?, publication_date = ?,
             pages = ?, language = ?, price = ?, stock = ?
         WHERE id = ?`,
        [
          title,
          slug,
          description || null,
          isbn || null,
          publisher || null,
          publicationDate || null,
          pages || null,
          language || null,
          Number(price),
          Number(stock || 0),
          id,
        ]
      );

      await conn.query("DELETE FROM book_authors WHERE book_id = ?", [id]);
      await conn.query("DELETE FROM book_categories WHERE book_id = ?", [id]);
      await conn.query("DELETE FROM book_images WHERE book_id = ?", [id]);

      await insertBookRelations(conn, Number(id), author, categories, images);
    });

    const book = await fetchBookById(Number(id));
    return res.status(200).json({ message: "Cập nhật sách thành công!", data: book });
  } catch (error) {
    return res.status(500).json({ message: `Update book by id error: ${error.message}` });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRows = await query("SELECT id FROM books WHERE id = ? LIMIT 1", [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    await query("DELETE FROM books WHERE id = ?", [id]);
    return res.status(200).json({ message: "Xóa sách thành công!" });
  } catch (error) {
    return res.status(500).json({ message: `Delete book by id error: ${error.message}` });
  }
};

export { postBook, getAllBooks, getBookById, updateBookById, deleteBookById };
