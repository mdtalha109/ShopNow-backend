import mongoose, { Model } from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: number,
        required: true
    },
    comment: {
        type: number,
        required: true
    },
}, {
    timeStamps : true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema], 
    rating: {
        type: String,
        required: true
    },
    numReviews: {
        type: number,
        required: true,
        default: 0
    },
    price: {
        type: number,
        required: true,
        default: 0
    },
    countInStock: {
        type: number,
        required: true,
        default: 0
    },

}, {
    timeStamps: true
})

const Product = mongoose.model('Product', productSchema);

export default User 