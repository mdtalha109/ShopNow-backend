import express from 'express';

import { getProducts, getProductById, getProductByCategory, deleteProduct, updateProduct, createProduct } from '../controllers/productController.js';
import {protect, isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router();


router.get('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

router.get('/', getProducts)
router.post('/', protect, isAdmin, createProduct)
router.get('/:id', getProductById)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
router.get('/category/:category', getProductByCategory)




export default router;