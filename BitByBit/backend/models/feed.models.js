import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  borrowerAddress: {
    type: String,
    unique: true, // Each user should have a unique Ethereum address  // Allows some users to have no Ethereum address
    trim: true,
    match: /^0x[a-fA-F0-9]{40}$/, // Validates Ethereum address format
  },
  lenderAddress: {
    type: String,
    unique: true, // Each user should have a unique Ethereum address  // Allows some users to have no Ethereum address
    trim: true,
    match: /^0x[a-fA-F0-9]{40}$/, // Validates Ethereum address format
  },
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
    required: false,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  time: {
    type: Number,
    required: true,
    min: 1,
  },
  interest: {
    type: Number,
    required: true,
    default: 7,
  },
  isRepaid: {
    type: Boolean,
    default: false,
  },
  isFunded: {
    type: Boolean,
    default: false,
  },
  isDefaulted: {
    type: Boolean,
    default: false,
  },
});

export const Feed = mongoose.model("Feed", feedSchema);
