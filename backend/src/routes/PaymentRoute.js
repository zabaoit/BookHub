import express from 'express';
import {
    createVNPayPayment,
    vnpayCallback,
    createMoMoPayment,
    momoCallback,
    momoReturn,
    createCODPayment,
    getPaymentByOrderId
} from '../controllers/PaymentController.js';
import { protectedRoute, verifyUser } from '../middlewares/AuthMiddleWare.js';

const router = express.Router();

// ====== VNPAY ROUTES ======
// Tạo URL thanh toán VNPay (yêu cầu đăng nhập)
router.post('/vnpay/create', protectedRoute, verifyUser, createVNPayPayment);

// Callback từ VNPay (public - không cần auth vì VNPay gọi)
router.get('/vnpay/callback', vnpayCallback);

// ====== MOMO ROUTES ======
// Tạo URL thanh toán MoMo (yêu cầu đăng nhập)
router.post('/momo/create', protectedRoute, verifyUser, createMoMoPayment);

// IPN Callback từ MoMo (public - MoMo gọi để notify)
router.post('/momo/callback', momoCallback);

// Return URL từ MoMo (public - redirect về frontend)
router.get('/momo/return', momoReturn);

// ====== COD ROUTE ======
// Tạo thanh toán COD (yêu cầu đăng nhập)
router.post('/cod', protectedRoute, verifyUser, createCODPayment);

// ====== GET PAYMENT INFO ======
// Lấy thông tin payment theo orderId (yêu cầu đăng nhập)
router.get('/:orderId', protectedRoute, verifyUser, getPaymentByOrderId);

export default router;
