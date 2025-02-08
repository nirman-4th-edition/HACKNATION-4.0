import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
  consumer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactionItems: [{
    type: Schema.Types.ObjectId,
    ref: 'TransactionList',
    required: true,
  }],
  deliveryDate:{
    type:String
  },
  paymentDetails: {
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    razorpayOrderId: { 
    type: String,
    required: true 
    },
    razorpayPaymentId: { 
    type: String,
    required: true
    },
    razorpaySignature: {
    type: String
    }
  },
  toatlPrice:{
    type:Number,
    required:true
  },
  address:{
    type: Schema.Types.ObjectId,
    ref:"Address"
  },
  totalDiscountedPrice:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  orderStatus:{
    type:String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  totalItem:{
    type: Number,
    required: true
  }
},{timestamps:true});

export const Transaction = mongoose.model("Transaction",transactionSchema);
