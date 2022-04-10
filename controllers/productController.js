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


// create Product
export const createProduct = asyncHandler(async(req, res) => {

    const {productName, productCategory, productImage,productBrand,productPrice, productDescription,countInStock} = req.body 
    console.log(req) 
    console.log(productName)
    console.log(productCategory)
    console.log(productImage)


    const product = new Product({
        name: productName,
        price: productPrice,
        user: req.user._id,
        image: productImage,
        brand: productBrand,
        category:productCategory,
        countInStock: countInStock,
        numReviews: 0,
        description: productDescription
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})  


// update Product (put request)
export const updateProduct = asyncHandler(async(req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
 
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404);
        throw new Error('Product not found!!');
    }

})  
