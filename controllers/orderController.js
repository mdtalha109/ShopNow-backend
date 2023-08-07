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
    console.log("inside get order details")
    const {order_id} =req.body

    console.log(order_id)

    try{

        let orderDetail = await Order.findById(order_id).populate("user").populate({path: "orderItems.product"});
        
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

export const getOrdersByUser = asyncHandler(async (req, res) => {
    
    try {
        console.log("req.user._id: ", req.user._id)
      const orders = await Order.find({user:req.user._id}).sort({ createdAt: 1 }).populate('orderItems.product');


      console.log("orders: ", orders)
  
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      // Handle any unexpected errors
      res.status(500).json({ message: 'Failed to fetch orders for this user.' });
    }
  });
  



export default addOrder
