// Import thư viện mongoose để làm việc với MongoDB
import mongoose from 'mongoose'

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    // username: Tên đăng nhập
    username: {
        type: String,
        required: true,        // Bắt buộc phải có
        unique: true,          // Không được trùng lặp
        maxlength: 255,        // Tối đa 255 ký tự
    },
    
    // email: Địa chỉ email
    email: {
        type: String,
        required: true,        // Bắt buộc phải có
        unique: true,          // Không được trùng lặp
        maxlength: 255,        // Tối đa 255 ký tự
    },
    
    // hashedPassword: Mật khẩu đã được mã hóa (không lưu mật khẩu gốc)
    hashedPassword: {
        type: String,
        required: true,        // Bắt buộc phải có
    }, 
    
    // role: Vai trò của người dùng
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],  // Chỉ được chọn 1 trong 2 giá trị
        default: 'USER',          // Mặc định là USER
    },

    // createdAt: Thời gian tạo tài khoản
    createdAt: {
        type: Date,
        default: Date.now,     // Tự động lấy thời gian hiện tại
    },
    
    // updatedAt: Thời gian cập nhật lần cuối
    updatedAt: {
        type: Date,
        default: Date.now,     // Tự động lấy thời gian hiện tại
    },
}, {
    // timestamps: true - Tự động cập nhật createdAt và updatedAt
    timestamps: true,
})

// Tạo model User từ schema
const User = mongoose.model('User', userSchema);

// Export để sử dụng ở file khác
export default User;