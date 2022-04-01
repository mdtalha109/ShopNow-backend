import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'
import APIFeatures from '../utils/apiFeatures.js'

//function for fetching product for product list
export const getProducts = asyncHandler(async(req, res) => {
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().sort()
    const products = await apiFeatures.query
    // const products = await Product.find({});
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

//Fetching product by Category
export const getProductByCategory = asyncHandler(async(req, res) => {
    const limit = req.query.Limit
    let product;
    if(limit){
         product = await Product.find({category : req.params.category}).limit(6).sort({price: req.query.sort})
    }
    else {
        product = await Product.find({category : req.params.category}).sort({price: req.query.sort})
    }
    
    if(product){
        res.json(product);
    }
    else {
        res.status(404).json({message: 'Product not found'})
    }
})


// Delete Product
export const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
       await product.remove();
       res.json({message: 'Product deleted!'})
    }
    else {
        res.status(404).json({message: 'Product not found'})

    }
})
