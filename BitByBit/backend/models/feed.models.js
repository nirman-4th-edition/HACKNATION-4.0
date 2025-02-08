import mongoose from "mongoose";
import { Loan } from "./loan.models.js";

const feedSchema = new mongoose.Schema(
  {
    borrowerAddress: {
      type: String,
      required: true,
      trim: true,
      match: /^0x[a-fA-F0-9]{40}$/, // Ethereum address validation
    },

    lenderAddress: {
      type: String,
      default: null, // Lender might not be assigned yet
      trim: true,
      match: /^0x[a-fA-F0-9]{40}$/,
    },

    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    time: {
      type: Number,
      required: true,
      min: 1, // Minimum 1 day
    },

    interestRate: {
      type: Number,
      required: true,
    },

    totalRepayable: {
      type: Number,
      default: 0, // Computed before saving
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
  },
  { timestamps: true }
);

// Pre-save Hook: Auto-fetch loan details and compute `totalRepayable`
feedSchema.pre("save", async function (next) {
  try {
    const loan = await Loan.findById(this.loanId);
    if (!loan) {
      return next(new Error("Loan not found"));
    }

    // Auto-fill borrowerAddress from Loan model
    this.borrowerAddress = loan.borrowerEthAddress;

    // Calculate total repayable amount
    const interest =
      (this.amount * this.interestRate * (this.time / 365)) / 100; // Simple interest formula
    this.totalRepayable = this.amount + interest;

    next();
  } catch (error) {
    next(error);
  }
});

export const Feed = mongoose.model("Feed", feedSchema);
