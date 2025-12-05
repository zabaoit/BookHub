// Import thư viện mongoose để làm việc với MongoDB
import mongoose from "mongoose";    

// Định nghĩa schema cho thể loại sách
const categorySchema = new mongoose.Schema({
  // name: Tên thể loại (vd: "Tiểu thuyết", "Khoa học")
  // - required: Bắt buộc phải có
  // - unique: Không được trùng lặp
  name: { type: String, required: true, unique: true },
  
  // slug: Đường dẫn URL thân thiện (vd: "tieu-thuyet", "khoa-hoc")
  // - required: Bắt buộc phải có
  // - unique: Không được trùng lặp
  slug: { type: String, required: true, unique: true },
  
  // createdAt: Thời gian tạo thể loại
  createdAt: { type: Date, default: Date.now },
});

// Tạo model Category từ schema
const Category = mongoose.model("Category", categorySchema);

// Export để sử dụng ở file khác
export default Category;