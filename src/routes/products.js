import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const router = Router();

router.get('/', getProducts);
router.post('/', authMiddleware(['admin']), createProduct);
router.put('/:id', authMiddleware(['admin']), updateProduct);
router.delete('/:id', authMiddleware(['admin']), deleteProduct);

export default router;
