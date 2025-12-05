// Import thư viện mongoose để làm việc với MongoDB
import mongoose from 'mongoose';

// Định nghĩa schema cho tác giả
const authorSchema = new mongoose.Schema({
    // name: Tên tác giả
    name: {
        type: String,
        required: true,        // Bắt buộc phải có
        maxlength: 255,        // Tối đa 255 ký tự
    },
    
    // bio: Tiểu sử, giới thiệu về tác giả
    bio: {
        type: String,
        maxlength: 1024,       // Tối đa 1024 ký tự
    },
    
    // website: Trang web cá nhân của tác giả
    website: {
        type: String,
        maxlength: 255,        // Tối đa 255 ký tự
    },
    
    // createdAt: Thời gian thêm tác giả vào hệ thống
    createdAt: {
        type: Date,
        default: Date.now,     // Tự động lấy thời gian hiện tại
    },
})

// Tạo model Author từ schema
const Author = mongoose.model('Author', authorSchema);

// Export để sử dụng ở file khác
export default Author;