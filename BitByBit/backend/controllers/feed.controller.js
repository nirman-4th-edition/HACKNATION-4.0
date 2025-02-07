import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Loan } from "../models/loan.models.js";
import { nanoid } from "nanoid"
import { Feed } from "../models/feed.models.js";

const generateNanoId = () => {
    return nanoid(12); // Generates a short, unique ID (12 characters)
};

function calculateInterestRate(principal, durationInYears, creditScore) {
    let baseRate;

   
    if (creditScore >= 750) baseRate = 4;  // 4% for high credit score
    else if (creditScore >= 650) baseRate = 6;  // 6% for medium score
    else baseRate = 10;  // 10% for low score

    // Extra interest for long-term loans (> 1 year)
    let extraInterest = durationInYears > 1 ? (2 * (durationInYears - 1)) : 0;

    let finalRate = baseRate + extraInterest;

    return finalRate;
}


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
    const uniId = generateNanoId();

    const newLoan = await Loan.create({
        uniqueId: uniId,
        borrowerEthAddress: user.ethAddress,
        loanAmount: amount,
        time: time
    })

    if(!newLoan){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, newLoan, "Loan request created successfully")
    )

})



const loanFunded = asyncHandler(async (req, res)=> {
    const userId = req.params;
    const {uniId} = req.body
    if(!userId) throw new ApiError(404, "userId not found");
    if(!uniId) throw new ApiError(404, "uniId not found");

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User doesn't exist")
    }
    
    const lenderEthAddress = user.ethAddress;

    const findUniId = Loan.findOne({
        uniqueId:uniId
    })

    if(!findUniId) throw new ApiError(404, "uniqueId not found");

    const brwEthAdd = findUniId.borrowerEthAddress;
    const credit = await User.findOne({
        ethAddress: brwEthAdd
    })
    if(!credit) throw new ApiError(404, "not found")
    
    const creditScore = credit.creditScore;


    const interestRate = calculateInterestRate(findUniId.amount, findUniId.time, creditScore);

    const newFeed = await Feed.create({
        borrowerAddress: findUniId.borrowerEthAddress,
        lenderAddress: lenderEthAddress,
        loanId: findUniId._id,
        amount: findUniId.amount,
        time: findUniId.time,
        interest: interestRate,
        isFunded: true,
        isRepaid: false,
    
    })

    if(!newFeed){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, "Loan funded successfully!")
    )

})

const loanRepaid = asyncHandler(async (req, res)=>{

    try {
        const {loanId} = req.body;

        if(!loanId) throw new ApiError(404, "loanId not found")
        
        const findLoanId = await Loan.findById()


        const tx = await contract.repayLoan(loanId, { value: ethers.parseEther(amount.toString()) });

        await tx.wait();
        res.json({ message: "Loan Repaid Successfully", transaction: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.reason || error.message});
    }
})


export {createLoan, loanFunded}