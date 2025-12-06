// Import thư viện mongoose để làm việc với MongoDB
import mongoose from "mongoose";    

// Định nghĩa schema cho sách
const bookSchema = new mongoose.Schema({
  // title: Tiêu đề sách (bắt buộc)
  title: { type: String, required: true },
  
  // slug: Đường dẫn URL thân thiện (vd: "lap-trinh-javascript")
  // - required: Bắt buộc phải có
  // - unique: Không được trùng lặp
  slug: { type: String, required: true, unique: true },
  
  // description: Mô tả chi tiết về sách
  description: String,
  
  // isbn: Mã ISBN của sách (có đánh index để tìm kiếm nhanh)
  isbn: { type: String, index: true },
  
  // publisher: Nhà xuất bản
  publisher: String,
  
  // publicationDate: Ngày xuất bản
  publicationDate: Date,
  
  // pages: Số trang
  pages: Number,
  
  // language: Ngôn ngữ (vd: "Vietnamese", "English")
  language: String,

  // price: Giá bán (bắt buộc, dùng Number cho số thập phân)
  price: { type: Number, required: true },
  
  // stock: Số lượng tồn kho, mặc định là 0
  stock: { type: Number, default: 0 },

  // author: Tham chiếu đến tác giả của sách
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],

  // images: Danh sách ảnh của sách (mảng)
  images: [
    {
      // url: Đường dẫn ảnh
      url: String,
      // altText: Văn bản thay thế khi ảnh không hiển thị
      altText: String,
      // order: Thứ tự hiển thị ảnh
      order: Number,
    }
  ],

  // categories: Danh sách thể loại của sách (mảng tham chiếu)
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
  ],

}, { 
  // timestamps: Tự động thêm createdAt và updatedAt
  timestamps: true 
});

// Tạo model Book từ schema
const Book = mongoose.model('Book', bookSchema);

// Export để sử dụng ở file khác
export default Book;
