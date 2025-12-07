import express from 'express';
import { deleteCategoryById, getAllCategories, getCategoryById , postCategory, updateCategoryById } from '../controllers/CategoryController.js';


const router = express.Router();

router.post('/', postCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);
export default router;