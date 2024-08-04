import express from 'express'
const router = express.Router()

import {protect, isAdmin} from '../middleware/authMiddleware.js'
import addOrder, { getAllOrder, getOrderById, getOrdersByUser, markOrderDelivered, verifyOrderPayment } from '../controllers/orderController.js' 

router.post('/', protect, addOrder);
router.post('/verify-order-payment', protect, verifyOrderPayment)
router.post('/get-order-detail', getOrderById);
router.get('/get-all-order',protect, getOrdersByUser)
router.get('/', protect, getAllOrder)
router.patch('/deliver/:order_id',protect, markOrderDelivered);



export default router