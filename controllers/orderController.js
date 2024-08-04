import asyncHandler from 'express-async-handler';
import crypto from 'crypto'
import Order from '../models/ordermodel.js'
import { RAZORPAY_KEY_SECRET, createRazorPayInstance } from '../config/razorpay.js';

const razorpayInstance = createRazorPayInstance()

//controller for create new order
//endpoint -> /api/orders/
//access -> private
export const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order Items');
    }
   

    const options = {
        amount: parseInt(totalPrice) * 100,
        currency: "INR",
        receipt: "reciept_order_1"
    }


    const razorPayOrder = await razorpayInstance.orders.create(options);

    const order = new Order({
        order_id: razorPayOrder.id,
        orderItems,
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
        isPaid: false
    })

    const createdOrder = await order.save()

    res.status(201).json(razorPayOrder)
 
    
})

export const verifyOrderPayment = async(req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        res.status(400);
        throw new Error('Missing payment details, Please try again');
    }

    const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        console.log("Signature matched");

        const order = await Order.findOne({ order_id: razorpay_order_id });

        if (!order) {
            res.status(404);
            throw new Error('Order not found.');
        }

        order.isPaid = true;
        await order.save();

        res.status(200).json({ status: 'success', data: order });
    } else {
        res.status(400).json({ status: 'failed', message: 'Signature verification failed.' });
    }
}



export const getOrderById = asyncHandler(async (req, res) => {
   
    const { order_id } = req.body

    console.log(order_id)

    try {

        let orderDetail = await Order.findById(order_id).populate("user").populate({ path: "orderItems.product" });

        if (orderDetail) {
            res.json(orderDetail);
        }
        else {
            res.status(404).json({ message: 'Something went wrong' })
        }

    } catch (err) {
        res.json({ message: "something went wrong" })
    }

})

export const getOrdersByUser = asyncHandler(async (req, res) => {

    try {
        console.log("req.user._id: ", req.user._id)
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: 1 }).populate('orderItems.product');


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

export const getAllOrder = asyncHandler(async (req, res) => {
    try{
        const allOrder = await Order.find().populate("user")
        if(allOrder){
            return res.status(200).json(allOrder)
        }
    }
    catch(err) {
        res.status(404).json({message: 'something went wrong'})
    }
})

export const markOrderDelivered = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    

    const order = await Order.findById(order_id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});




export default addOrder
