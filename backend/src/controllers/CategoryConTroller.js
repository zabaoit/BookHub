import Book from "../models/BookModel.js";
import Category from "../models/CategoryModel.js"

const postCategory = async (req, res) => {
    try {
        const {name, slug} = req.body;
        if(!name || !slug) {
            return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin bắt buộc'});
        }

        const existingCategory = await Category.findOne({name, slug});
        if(existingCategory) {
            return res.status(400).json({message: 'Danh mục này đã tồn tại, vui lòng chọn tên khác'});
        }

        const newCategory = await Category.create({
            name,
            slug
        }); 

        return res.status(201).json({message: 'Thêm danh mục thành công!', data: newCategory});

    } catch (error) {
        return res.status(500).json({message: `Post category error: ${error.message}`});
    }
}

const getAllCategories = async (req, res) => {
    try {
        // Phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // Tìm kiếm
        const filter = {};
        if(req.query.search) {
            filter.name = {$regex: req.query.search, $options: 'i'};
        }
        // Lấy danh sách danh mục từ database với phân trang và tìm kiếm
        const categories = await Category.find(filter).skip(skip).limit(limit);
        // Tính tổng số trang
        const total = await Category.countDocuments(filter);
        const totalPages = Math.ceil(total / limit) || 1;
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy danh sách danh mục thành công!', data: categories, total, page, limit, totalPages});
    } catch (error) {
        return res.status(500).json({message: `Get all categories error: ${error.message}`});
    }
}

const getCategoryById = async (req, res) => {
    try {
        // 
        const {id} = req.params;
        const category = await Category.findById(id);
        // 
        if(!category) {
            return res.status(404).json({message: 'Không tìm thấy danh mục'});
        }
        // Lấy sách thuộc danh mục này
        const books = await Book.find({categories: id});
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy danh mục thành công!', data: category, books});
    } catch (error) {
        return res.status(500).json({message: `Get categories by id error: ${error.message}`});
    }
}

const getCategoryBySlug = async (req, res) => {
    try {
        const {slug} = req.params;

        const category = await Category.findOne({slug});
        if(!category) {
            return res.status(404).json({message: 'Không tìm thấy danh mục'});
        }
        const books = await Book.find({categories: category._id});
        return res.status(200).json({message: 'Lấy danh mục thành công!', data: category, books});
    } catch (error) {
        return res.status(500).json({message: `Get categories by slug error: ${error.message}`});
    }
}
const updateCategoryById = async (req, res) => {
    try {
        // 
        const {id}  = req.params;
        const {name, slug} = req.body;
        // Cập nhật danh mục
        const categories = await Category.findByIdAndUpdate(id, {
            name, slug
        }, {new: true, runValidators: true});
        //  nếu không tìm thấy danh mục
        if(!categories) {
            return res.status(404).json({message: 'Không tìm thấy danh mục'});
        }
        // trả về kết quả
        return res.status(200).json({message: 'Cập nhật danh mục thành công!', data: categories});
    } catch (error) {
                return res.status(500).json({message: `Update categories by id error: ${error.message}`});

    }
}

const deleteCategoryById = async (req, res) => {
    try {
        // Lấy ID tác giả từ tham số URL
        const {id} = req.params;
        // Xóa tác giả
        const category = await Category.findByIdAndDelete(id);
        // Nếu không tìm thấy danh mục
        if(!category){
            return res.status(404).json({message: 'Không tìm thấy danh mục'});
        }
        // Xóa tất cả sách của danh mục
        return res.status(200).json({message: 'Xóa danh mục thành công'});
    } catch (error) {
        return res.status(500).json({message: `Delete category by id error: ${error.message}`});
    }
}

export { postCategory, getAllCategories, getCategoryById, getCategoryBySlug, updateCategoryById, deleteCategoryById };