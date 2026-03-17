import { query } from "../libs/db.js";
import { getBooksByIds } from "../libs/mysqlDataHelper.js";

const mapCategory = (row) => ({
  _id: String(row.id),
  name: row.name,
  slug: row.slug,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const postCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
    }

    const existingRows = await query(
      "SELECT id FROM categories WHERE name = ? OR slug = ? LIMIT 1",
      [name, slug]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({ message: "Danh mục này đã tồn tại, vui lòng chọn tên khác" });
    }

    const result = await query(
      "INSERT INTO categories (name, slug) VALUES (?, ?)",
      [name, slug]
    );

    const createdRows = await query(
      "SELECT id, name, slug, created_at, updated_at FROM categories WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({ message: "Thêm danh mục thành công!", data: mapCategory(createdRows[0]) });
  } catch (error) {
    return res.status(500).json({ message: `Post category error: ${error.message}` });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const whereClause = search ? "WHERE name LIKE ?" : "";
    const params = search ? [`%${search}%`] : [];

    const rows = await query(
      `SELECT id, name, slug, created_at, updated_at
       FROM categories
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );

    const [{ total }] = await query(
      `SELECT COUNT(*) AS total FROM categories ${whereClause}`,
      params
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      message: "Lấy danh sách danh mục thành công!",
      data: rows.map(mapCategory),
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: `Get all categories error: ${error.message}` });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await query(
      "SELECT id, name, slug, created_at, updated_at FROM categories WHERE id = ? LIMIT 1",
      [id]
    );

    const category = rows[0];
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    const bookIdRows = await query(
      "SELECT book_id FROM book_categories WHERE category_id = ?",
      [id]
    );

    const books = await getBooksByIds(bookIdRows.map((row) => row.book_id));

    return res.status(200).json({ message: "Lấy danh mục thành công!", data: mapCategory(category), books });
  } catch (error) {
    return res.status(500).json({ message: `Get categories by id error: ${error.message}` });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const rows = await query(
      "SELECT id, name, slug, created_at, updated_at FROM categories WHERE slug = ? LIMIT 1",
      [slug]
    );
    const category = rows[0];

    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    const bookIdRows = await query(
      "SELECT book_id FROM book_categories WHERE category_id = ?",
      [category.id]
    );
    const books = await getBooksByIds(bookIdRows.map((row) => row.book_id));

    return res.status(200).json({ message: "Lấy danh mục thành công!", data: mapCategory(category), books });
  } catch (error) {
    return res.status(500).json({ message: `Get categories by slug error: ${error.message}` });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const existing = await query("SELECT id FROM categories WHERE id = ? LIMIT 1", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    await query("UPDATE categories SET name = ?, slug = ? WHERE id = ?", [name, slug, id]);

    const updatedRows = await query(
      "SELECT id, name, slug, created_at, updated_at FROM categories WHERE id = ?",
      [id]
    );

    return res.status(200).json({ message: "Cập nhật danh mục thành công!", data: mapCategory(updatedRows[0]) });
  } catch (error) {
    return res.status(500).json({ message: `Update categories by id error: ${error.message}` });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRows = await query("SELECT id FROM categories WHERE id = ? LIMIT 1", [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    await query("DELETE FROM categories WHERE id = ?", [id]);

    return res.status(200).json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    return res.status(500).json({ message: `Delete category by id error: ${error.message}` });
  }
};

export {
  postCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategoryById,
  deleteCategoryById,
};
