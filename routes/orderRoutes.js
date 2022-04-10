import express from 'express'
const router = express.Router()

import {protect, isAdmin} from '../middleware/authMiddleware.js'
import addOrder from '../controllers/orderController.js' 

router.post('/', protect, addOrder);



export default router