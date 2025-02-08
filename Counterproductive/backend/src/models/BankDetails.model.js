import mongoose, { Schema } from "mongoose";

const bankDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  },
  accountHolderName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);