import express from "express";
import { postCart, getCart, updateCartItem, removeCartItem, clearCart } from "../controllers/CartController.js";
import { protectedRoute, verifyUser } from "../middlewares/AuthMiddleWare.js";

const router = express.Router();

// Tất cả routes giỏ hàng đều yêu cầu đăng nhập (USER hoặc ADMIN)
router.use(protectedRoute, verifyUser)
router.post('/add', postCart)
router.get('/', getCart);
router.put('/update', updateCartItem);
router.delete('/remove/:bookId', removeCartItem);
router.delete('/clear', clearCart)
export default router;
