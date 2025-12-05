// Import thư viện mongoose để làm việc với MongoDB
import mongoose from 'mongoose';
// Định nghĩa schema cho thanh toán
const paymentSchema = new mongoose.Schema({
  // order: Tham chiếu đến đơn hàng
  // - unique: true: Mỗi đơn hàng chỉ có 1 bản ghi thanh toán duy nhất
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", unique: true },

  // provider: Nhà cung cấp dịch vụ thanh toán
  // Ví dụ: "stripe", "paypal", "momo", "vnpay"
  provider: String,
  
  // providerId: Mã giao dịch từ nhà cung cấp
  providerId: String,
  
  // amount: Số tiền thanh toán
  amount: Number,
  
  // status: Trạng thái thanh toán
  // - UNPAID: Chưa thanh toán
  // - PAID: Đã thanh toán
  // - REFUNDED: Đã hoàn tiền
  status: { type: String, enum: ["UNPAID", "PAID", "REFUNDED"], default: "UNPAID" },
  
  // paidAt: Thời gian thanh toán thành công
  paidAt: Date,

}, { 
  // timestamps: Tự động thêm createdAt và updatedAt
  timestamps: true 
});

// Tạo model Payment từ schema
const Payment = mongoose.model("Payment", paymentSchema);

// Export để sử dụng ở file khác
export default Payment;
