import mongoose, { Schema } from "mongoose";
import User from "./user.models.js";

const loanSchema = new Schema(
    {   
        uniqueId: {
            type: String,
            unique: true,
            
        },
        borrower: {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: true 
        },
       
        borrowerEthAddress: { 
            type: String, 
            required: true 
        }, // Auto-Filled
        
        loanAmount: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        time: {
            type: Number,
            required: true,
            min: 1
        }
        
    },
    { timestamps: true }
);

loanSchema.pre("save", async function (next) {
    try {
        const borrowerUser = await User.findById(this.borrower);
        const lenderUser = await User.findById(this.lender);

        if (!borrowerUser || !lenderUser) {
            return next(new Error("Borrower or lender not found"));
        }

        this.borrowerEthAddress = borrowerUser.ethAddress;
        this.lenderEthAddress = lenderUser.ethAddress;
     
        const interest = (this.loanAmount * this.interestRate * this.tenureMonths) / 100; // Interest formula
        this.totalRepayable = this.loanAmount + interest; // Total repayable amount
        this.emiAmount = this.totalRepayable / this.tenureMonths; // EMI per month

        next();
    } catch (error) {
        next(error);
    }
});

export const Loan = mongoose.model("Loan", loanSchema);
