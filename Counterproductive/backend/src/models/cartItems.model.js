import mongoose, { Schema } from "mongoose";

const cartItemsSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    food: {
        type: Schema.Types.ObjectId,
        ref: "FoodListing", 
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: false
    }
});

export const CartItem = mongoose.model("CartItem", cartItemsSchema);