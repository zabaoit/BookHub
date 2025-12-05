import mongoose from "mongoose";   
// Định nghĩa schema cho đơn hàng
const orderSchema = new mongoose.Schema({
  // user: Tham chiếu đến người dùng đặt hàng
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // orderDate: Ngày đặt hàng, tự động lấy thời gian hiện tại
  orderDate: { type: Date, default: Date.now },
  
  // status: Trạng thái đơn hàng
  status: { 
    type: String,
    // enum: Chỉ được chọn 1 trong 5 giá trị:
    // - PENDING: Đang chờ xử lý
    // - PROCESSING: Đang xử lý
    // - SHIPPED: Đã giao cho vận chuyển
    // - COMPLETED: Hoàn thành
    // - CANCELLED: Đã hủy
    enum: ["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"],
    default: "PENDING"  // Mặc định là PENDING
  },

  // paymentStatus: Trạng thái thanh toán
  paymentStatus: {
    type: String,
    // enum: Chỉ được chọn 1 trong 3 giá trị:
    // - UNPAID: Chưa thanh toán
    // - PAID: Đã thanh toán
    // - REFUNDED: Đã hoàn tiền
    enum: ["UNPAID", "PAID", "REFUNDED"],
    default: "UNPAID"  // Mặc định là UNPAID
  },

  // totalAmount: Tổng giá trị đơn hàng (bắt buộc)
  totalAmount: { type: Number, required: true },
  
  // shippingAddress: Địa chỉ giao hàng (bắt buộc)
  shippingAddress: { type: String, required: true },
  
  // note: Ghi chú của khách hàng (tùy chọn)
  note: String,

  // buyerName: Tên người mua
  buyerName: String,
  
  // buyerEmail: Email người mua
  buyerEmail: String,
  
  // buyerPhone: Số điện thoại người mua
  buyerPhone: String,

  // items: Danh sách sản phẩm trong đơn hàng (mảng)
  items: [
    {
      // book: Tham chiếu đến sách được mua
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      
      // quantity: Số lượng
      quantity: Number,
      
      // priceAtPurchase: Giá tại thời điểm mua (lưu lại để tránh thay đổi giá sau này)
      priceAtPurchase: Number
    }
  ],

}, { 
  // timestamps: Tự động thêm createdAt và updatedAt
  timestamps: true 
});

// Tạo và export model Order
export default mongoose.model("Order", orderSchema);
