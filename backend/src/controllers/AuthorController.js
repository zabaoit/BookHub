import Author from "../models/AuthorModel.js";
import Book from "../models/BookModel.js";

const postAuthor = async (req, res) => {
    try {
        const {name, bio, website} = req.body;
        // validate
        if(!name) {
            return res.status(400).json({message: 'Tên tác giả không được để trống' });
        }
        // check author existing
        const existingAuthor = await Author.findOne({ name });
        if(existingAuthor){
            return res.status(400).json({message: 'Tác giả đã tồn tại' });
        }
        // create author
        const newAuthor = await Author.create({
            name,
            bio,
            website
        });
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
        const filter = {};
        if(req.query.search) {
            filter.name = { $regex: req.query.search, $options: 'i' };
        }

        // Lấy danh sách tác giả từ database với phân trang và tìm kiếm
        const authors = await Author.find(filter).skip(skip).limit(limit);
        // Tính tổng số trang
        const total = await Author.countDocuments(filter);
        
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
        const author =  await Author.findById(id);
        // Nếu không tìm thấy tác giả
        if(!author){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        // Tìm tất cả sách của tác giả
        const books = await Book.find({author: id});
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy thông tin tác giả thành công', data: author, books});
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
        const author = await Author.findByIdAndUpdate(id, {
            name, bio, website
        }, { new: true, runValidators: true });
        // Nếu không tìm thấy tác giả
        if(!author){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        // Trả về kết quả
        return res.status(200).json({message: 'Cập nhật tác giả thành công', data: author});

    } catch (error) {
        return res.status(500).json({message: `Update author by id error: ${error.message}`});
    }
}

const deleteAuthorById = async (req, res) => {
    try {
        // Lấy ID tác giả từ tham số URL
        const {id} = req.params;
        // Xóa tác giả
        const author = await Author.findByIdAndDelete(id);
        if(!author){
            return res.status(404).json({message: 'Không tìm thấy tác giả'});
        }
        // Xóa tất cả sách của tác giả
        return res.status(200).json({message: 'Xóa tác giả thành công'});
    } catch (error) {
        return res.status(500).json({message: `Delete author by id error: ${error.message}`});
    }
}
export {postAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById};