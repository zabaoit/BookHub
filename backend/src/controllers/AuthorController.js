import { query } from "../libs/db.js";
import { getBooksByIds } from "../libs/mysqlDataHelper.js";

const postAuthor = async (req, res) => {
    try {
        const {name, bio, website} = req.body;
        // validate
        if(!name) {
            return res.status(400).json({message: 'Tên tác giả không được để trống' });
        }
        // check author existing
        const existingRows = await query(
            "SELECT id FROM authors WHERE name = ? LIMIT 1",
            [name]
        );
        const existingAuthor = existingRows[0];
        if(existingAuthor){
            return res.status(400).json({message: 'Tác giả đã tồn tại' });
        }
        // create author
        const result = await query(
            "INSERT INTO authors (name, bio, website) VALUES (?, ?, ?)",
            [name, bio || null, website || null]
        );
        const createdRows = await query(
            "SELECT id, name, bio, website, created_at, updated_at FROM authors WHERE id = ?",
            [result.insertId]
        );
        const created = createdRows[0];

        const newAuthor = {
            _id: String(created.id),
            name: created.name,
            bio: created.bio,
            website: created.website,
            createdAt: created.created_at,
            updatedAt: created.updated_at,
        };
        return res.status(201).json({message: 'Thêm tác giả thành công', data: newAuthor});
    } catch (error) {
        return res.status(500).json({message: `Loi server: ${error.message}`});
    }
}

const getAllAuthors = async (req, res) => {
    try {
        // Phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Tìm kiếm
        const search = req.query.search?.trim();
        const whereClause = search ? "WHERE name LIKE ?" : "";
        const params = search ? [`%${search}%`] : [];

        const rows = await query(
            `SELECT id, name, bio, website, created_at, updated_at FROM authors ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, skip]
        );
        const [{ total }] = await query(
            `SELECT COUNT(*) AS total FROM authors ${whereClause}`,
            params
        );

        const authors = rows.map((author) => ({
            _id: String(author.id),
            name: author.name,
            bio: author.bio,
            website: author.website,
            createdAt: author.created_at,
            updatedAt: author.updated_at,
        }));
        
        const totalPages = Math.ceil(total / limit) || 1;
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy danh sách tác giả thành công', data: authors, total, page, limit, totalPages});
    } catch (error) {
        return res.status(500).json({message: `Get all authors error: ${error.message}`});
    }
}

const getAuthorById = async (req, res) => {
    try {
        // Lấy ID tác giả từ tham số URL
        const {id} = req.params;
        // Tìm tác giả theo ID
        const rows =  await query(
            "SELECT id, name, bio, website, created_at, updated_at FROM authors WHERE id = ? LIMIT 1",
            [id]
        );
        const author = rows[0];
        // Nếu không tìm thấy tác giả
        if(!author){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        // Tìm tất cả sách của tác giả
        const bookIdRows = await query(
            "SELECT book_id FROM book_authors WHERE author_id = ?",
            [id]
        );
        const books = await getBooksByIds(bookIdRows.map((row) => row.book_id));
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy thông tin tác giả thành công', data: {
            _id: String(author.id),
            name: author.name,
            bio: author.bio,
            website: author.website,
            createdAt: author.created_at,
            updatedAt: author.updated_at,
        }, books});
    } catch (error) {
        return res.status(500).json({message: `Get author by id error: ${error.message}`});
    }
}

const updateAuthorById = async (req, res) => {
    try {
        // lấy ID tác giả từ tham số URL
        const {id} = req.params;
        const {name, bio, website} = req.body;
        // Cập nhật tác giả
        const existingRows = await query("SELECT id FROM authors WHERE id = ? LIMIT 1", [id]);
        if(existingRows.length === 0){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }

        await query(
            "UPDATE authors SET name = ?, bio = ?, website = ? WHERE id = ?",
            [name || null, bio || null, website || null, id]
        );

        const updatedRows = await query(
            "SELECT id, name, bio, website, created_at, updated_at FROM authors WHERE id = ?",
            [id]
        );
        const author = updatedRows[0];
        // Nếu không tìm thấy tác giả
        if(!author){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        // Trả về kết quả
        return res.status(200).json({
            message: 'Cập nhật tác giả thành công',
            data: {
                _id: String(author.id),
                name: author.name,
                bio: author.bio,
                website: author.website,
                createdAt: author.created_at,
                updatedAt: author.updated_at,
            },
        });

    } catch (error) {
        return res.status(500).json({message: `Update author by id error: ${error.message}`});
    }
}

const deleteAuthorById = async (req, res) => {
    try {
        // Lấy ID tác giả từ tham số URL
        const {id} = req.params;
        // Xóa tác giả
        const existingRows = await query("SELECT id FROM authors WHERE id = ? LIMIT 1", [id]);
        if(existingRows.length === 0){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        await query("DELETE FROM authors WHERE id = ?", [id]);
        // Xóa tất cả sách của tác giả
        return res.status(200).json({message: 'Xóa tác giả thành công'});
    } catch (error) {
        return res.status(500).json({message: `Delete author by id error: ${error.message}`});
    }
}
export {postAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById};