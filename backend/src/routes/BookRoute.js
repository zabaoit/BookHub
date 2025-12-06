import express from "express";
import { deleteBookById, getAllBooks, getBookById, postBook, updateBookById } from "../controllers/BookController.js";
import { protectedRoute, verifyAdmin } from "../middlewares/AuthMiddleWare.js";
const router = express.Router();

// public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Bảo vệ các route dưới đây bằng middleware xác thực và kiểm tra quyền ADMIN
router.use(protectedRoute, verifyAdmin);

router.post("/", postBook);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

export default router;