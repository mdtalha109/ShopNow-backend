import Razorpay from "razorpay";


export const RAZORPAY_KEY_ID = 'rzp_test_KIS4vAphUl5PrB';
export const RAZORPAY_KEY_SECRET = 'QvhoiD5YJWN24IyiEF3qLino';



export const createRazorPayInstance = () => {
    return new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
    });
}

