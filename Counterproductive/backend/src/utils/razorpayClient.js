import Razorpay from "razorpay";

export const razorpay = new Razorpay({
    key_id: process.env.API_KEY,
    key_secret: process.env.API_SECRET
});