import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

//function for fetching product for product list
export const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}) 

//Fetching single product detail
export const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    }
    else {
        res.status(404).json({message: 'Product not found'})
    }
})