import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

import bodyparser from 'body-parser'


import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import cors from 'cors'




dotenv.config({
    path: '../.env'
});

dotenv.config();

connectDB();

const app = express();
app.use(cors())

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)

app.listen(process.env.PORT || 2000);

app.listen(process.env.PORT, console.log(`server running in development mode on port ${process.env.PORT}`));


  
