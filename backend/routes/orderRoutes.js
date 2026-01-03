import express from 'express';
import { createOrder, getAllOrders, deleteOrder, updateOrderStatus, getOrderCount, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/count', getOrderCount);
router.get('/user/:userId', getUserOrders);
router.delete('/:id', deleteOrder);
router.patch('/:id/status', updateOrderStatus);

export default router;
