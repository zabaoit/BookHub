// Import thư viện mongoose để làm việc với MongoDB
import mongoose from "mongoose";    

// Định nghĩa schema (cấu trúc) cho giỏ hàng
const cartSchema = new mongoose.Schema({
    // user: Liên kết đến người dùng sở hữu giỏ hàng
    // - ObjectId: Kiểu dữ liệu tham chiếu đến document khác
    // - ref: "User": Tham chiếu đến collection User
    // - unique: true: Mỗi user chỉ có 1 giỏ hàng duy nhất
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    
    // items: Danh sách các sản phẩm trong giỏ hàng (mảng)
    items: [
        {
            // book: Tham chiếu đến sách được thêm vào giỏ
            book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
            
            // quantity: Số lượng sách, mặc định là 1
            quantity: { type: Number, default: 1 },
        }
    ],
}, {
    // timestamps: true - Tự động thêm createdAt và updatedAt
    timestamps: true,
})

// Tạo model Cart từ schema
const Cart = mongoose.model("Cart", cartSchema);

// Export để sử dụng ở file khác
export default Cart;