import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import  products from './data/products.js';


dotenv.config();

connectDB()

const app = express();

app.get('/api/products', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.json(products);
})

app.get('/api/products/:id', function(req, res){
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
