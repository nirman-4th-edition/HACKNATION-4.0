import mongoose, { Schema } from "mongoose";

const transactionListSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export const TransactionList = mongoose.model("TransactionList", transactionListSchema);
