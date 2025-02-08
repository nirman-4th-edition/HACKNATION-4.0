import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";

const loanSchema = new Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },

    borrower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    borrowerEthAddress: {
      type: String,
      required: true,
    },

    lender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lenderEthAddress: {
      type: String,
      default: null,
    },

    loanAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },

    time: {
      type: Number,
      required: true,
      min: 1,
    },

    totalRepayable: {
      type: Number,
      default: 0,
    },

    emiAmount: {
      type: Number,
      default: 0,
    },

    isFunded: {
      type: Boolean,
      default: false,
    },

    isRepaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save Hook: Fetch Borrower & Lender Eth Address & Compute Interest
loanSchema.pre("save", async function (next) {
  try {
    // Fetch borrower details
    const borrowerUser = await User.findById(this.borrower);
    if (!borrowerUser) {
      return next(new Error("Borrower not found"));
    }
    this.borrowerEthAddress = borrowerUser.ethAddress;

    // If lender is present, fetch lender details
    if (this.lender) {
      const lenderUser = await User.findById(this.lender);
      if (!lenderUser) {
        return next(new Error("Lender not found"));
      }
      this.lenderEthAddress = lenderUser.ethAddress;
    }

    // Compute total repayable & EMI
    const interest =
      (this.loanAmount * this.interestRate * (this.time / 365)) / 100; // Simple interest formula
    this.totalRepayable = this.loanAmount + interest;
    this.emiAmount = this.totalRepayable / (this.time / 30); // EMI per month

    next();
  } catch (error) {
    next(error);
  }
});

export const Loan = mongoose.model("Loan", loanSchema);
