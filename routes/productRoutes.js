import express from 'express';

import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();


router.get('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

router.get('/', getProducts)
router.get('/:id', getProductById)


export default router;