import { Router } from 'express';
import { purchaseCart } from '../controllers/CartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/:cid/purchase', authMiddleware(['user']), purchaseCart);

export default router;
