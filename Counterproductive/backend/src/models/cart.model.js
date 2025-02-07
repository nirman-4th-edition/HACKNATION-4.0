import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    cartItems:[{
        type: Schema.Types.ObjectId,
        ref: "CartItems",
        required:true
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalItem:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscount:{
        type:Number,
        required:true,
        default:0
    }
});


export const Cart = mongoose.model("Cart",cartSchema);