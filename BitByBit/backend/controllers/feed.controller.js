import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Loan } from "../models/loan.models.js";


const createLoan = asyncHandler(async (req, res)=>{
    const {amount, time} = req.body;
    const userId = req._id;
    // if(!user){
    //     throw ApiError(401, "Unauthorized error")
    // }
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found");
    }

    if((!amount) || (!time)){
        throw new ApiError(400, "All fields are required")
    }

    const newLoan = await Loan.create({
        borrowerEthAddress: user.ethAddress,
        loanAmount: amount,
        time: time
    })

    if(!newLoan){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, "Loan request created successfully")
    )

})

const loanFunded = asyncHandler(async (req, res)=> {
    const userId = req.params;
    if(!userId) throw new ApiError(404, "userId not found")
    
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User doesn't exist")
    }

    const lenderEthAddress = user.ethAddress;
    
})


export {createLoan}