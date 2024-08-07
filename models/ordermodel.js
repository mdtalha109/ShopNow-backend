import mongoose from "mongoose";


const orderSchema = mongoose.Schema({

    order_id: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
             }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true }, 
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: false
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Number,
        required: false,
        default: false
    },
    deliveredAt: {
        type: Date
    }

}, {
    timeStamps: true
})

const Order = mongoose.model('Order', orderSchema);

export default Order 