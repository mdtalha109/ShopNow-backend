import asyncHandler from 'express-async-handler';
import Order from '../models/ordermodel.js'

//controller for create new order
//endpoint -> /api/orders/
//access -> private
export const addOrder = asyncHandler(async(req, res) => {
    const {orderItems, shippingAddress, itemsPrice,shippingPrice, totalPrice} =req.body

    if(orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order Items');
        return;
    }
    else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            itemsPrice,
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
}) 



export const getOrderById = asyncHandler(async(req, res) => {
    const {order_id} =req.body

    console.log(order_id)

    try{

        let orderDetail = await Order.findById(order_id).populate("user").populate({path: "orderItems.product"});
        console.log("orderDetail: ",orderDetail)
        if(orderDetail){
            res.json(orderDetail);
        }
        else {
            res.status(404).json({message: 'Something went wrong'})
        }

    } catch(err){
        res.json({message: "something went wrong"})
    }
   
}) 



export default addOrder
