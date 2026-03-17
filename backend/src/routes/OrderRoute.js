import express from 'express';
import { cancelOrderById, getALlOrders, getOrderById, getUserOrders, postOrder, updateOrderStatus } from '../controllers/OrderController.js';
import { protectedRoute, verifyAdmin, verifyUser } from '../middlewares/AuthMiddleWare.js';

const router = express.Router();

router.use(protectedRoute);
// Admin routes
router.get('/admin/all',verifyAdmin, getALlOrders); // Xem tất cả đơn hàng
router.put('/admin/:id/status', verifyAdmin, updateOrderStatus); //Cập nhật trạng thái đơn hàng

// User routes
router.post('/',verifyUser, postOrder); // Tạo đơn hàng từ giỏ hàng
router.get('/', verifyUser, getUserOrders); // Lấy danh sách đơn hàng của chính mình
router.get('/:id', verifyUser, getOrderById);   // Xem chi tiết đơn hàng
router.put('/:id/cancel', verifyUser, cancelOrderById); // Hủy đơn hàng
export default router;