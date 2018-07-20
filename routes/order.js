import express from 'express';
import OrderController from '../controllers/order';
import Auth from '../middleware/auth';

const router = express.Router();

router.route('/')
  .post(Auth.validateToken, OrderController.updateOrder)
  .get(Auth.validateToken, OrderController.getAllOrders);

router.route('/:id')
  .delete(Auth.validateToken, OrderController.deleteOrder);

export default router;
