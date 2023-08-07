import express from 'express'
const router = express.Router()

import {protect, isAdmin} from '../middleware/authMiddleware.js'
import addOrder, { getOrderById, getOrdersByUser } from '../controllers/orderController.js' 

router.post('/', protect, addOrder);
router.post('/get-order-detail', getOrderById);
router.get('/get-all-order',protect, getOrdersByUser)



export default router