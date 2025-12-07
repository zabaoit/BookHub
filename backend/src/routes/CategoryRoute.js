import express from 'express';
import { deleteCategoryById, getAllCategories, getCategoryById , getCategoryBySlug, postCategory, updateCategoryById } from '../controllers/CategoryController.js';
import { protectedRoute, verifyAdmin } from '../middlewares/AuthMiddleWare.js';

const router = express.Router();

// Public routes (không cần đăng nhập)

//  /slug/:slug đặt TRƯỚC /:id
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);
router.get('/', getAllCategories);
// Protected routes (chỉ ADMIN)
router.use(protectedRoute, verifyAdmin);

router.post('/', postCategory);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

export default router;