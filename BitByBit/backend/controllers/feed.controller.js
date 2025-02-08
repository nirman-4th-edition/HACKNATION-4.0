import { User } from "../models/user.models.js";
import { Loan } from "../models/loan.models.js";
import { Feed } from "../models/feed.models.js";
import { nanoid } from "nanoid";
import { ethers } from "ethers";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Correct way to import JSON in ESM
import contractABI from "./contractABI.json" assert { type: "json" };

// Blockchain Setup
const mnemonicPhrase = process.env.MNEMONIC;
if (!mnemonicPhrase) {
  throw new Error("MNEMONIC is not defined in the .env file");
}

const mnemonic = ethers.Mnemonic.fromPhrase(mnemonicPhrase);
const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const signer = wallet.connect(provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  signer
);

console.log("Wallet Address:", signer.address);

// Generate unique Loan ID
const generateNanoId = () => nanoid(12);

// Function to calculate interest dynamically
function calculateInterestRate(principal, durationInYears, creditScore) {
  let baseRate = creditScore >= 750 ? 4 : creditScore >= 650 ? 6 : 10;
  let extraInterest = durationInYears > 1 ? 2 * (durationInYears - 1) : 0;
  return baseRate + extraInterest;
}

// 1️⃣ CREATE LOAN (Borrower requests a loan)
const createLoan = asyncHandler(async (req, res) => {
  const { amount, duration, ethAddress } = req.body;

  // 🔹 Check if `ethAddress` is provided
  if (!ethAddress) throw new ApiError(400, "Ethereum address is required.");
  console.log(ethAddress);
  // 🔹 Find the user using `ethAddress`
  const user = await User.findOne({ ethAddress });
  if (!user) throw new ApiError(404, "User not found.");
  if (!amount || !duration) throw new ApiError(400, "All fields are required");

  // Create loan on Blockchain
  const tx = await contract.requestLoan(
    ethers.parseEther(amount.toString()),
    calculateInterestRate(amount, duration / 365, user.creditScore),
    duration
  );
  await tx.wait();

  const loanId = await contract.loanCounter(); // Fetch latest Loan ID from blockchain

  // Store loan details in MongoDB
  const newLoan = await Loan.create({
    uniqueId: generateNanoId(),
    loanId: loanId.toString(),
    borrowerEthAddress: user.ethAddress,
    loanAmount: amount,
    time: duration,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newLoan, "Loan request created successfully"));
});

// 2️⃣ FUND LOAN (Lender funds a loan)
const loanFunded = asyncHandler(async (req, res) => {
  const { loanId, amount } = req.body;
  const userId = req._id;

  const lender = await User.findById(userId);
  if (!lender) throw new ApiError(404, "Lender not found");

  const loan = await Loan.findOne({ loanId });
  if (!loan) throw new ApiError(404, "Loan not found");

  // Fund loan on Blockchain
  const tx = await contract.fundLoan(loanId, {
    value: ethers.parseEther(amount.toString()),
  });
  await tx.wait();

  // Store funding details in MongoDB
  await Feed.create({
    borrowerAddress: loan.borrowerEthAddress,
    lenderAddress: lender.ethAddress,
    loanId: loanId,
    amount: loan.loanAmount,
    time: loan.time,
    isFunded: true,
    isRepaid: false,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, "Loan funded successfully!"));
});

// 3️⃣ REPAY LOAN (Borrower repays the loan)
const loanRepaid = asyncHandler(async (req, res) => {
  const { loanId, amount } = req.body;
  const userId = req._id;

  const borrower = await User.findById(userId);
  if (!borrower) throw new ApiError(404, "Borrower not found");

  const loan = await Loan.findOne({ loanId });
  if (!loan) throw new ApiError(404, "Loan not found");

  // Repay loan on Blockchain
  const tx = await contract.repayLoan(loanId, {
    value: ethers.parseEther(amount.toString()),
  });
  await tx.wait();

  // Update MongoDB to reflect repayment
  loan.isRepaid = true;
  await loan.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Loan repaid successfully!"));
});

// 4️⃣ GET LOAN DETAILS
const getLoanDetails = asyncHandler(async (req, res) => {
  const { loanId } = req.params;
  const loan = await contract.loans(loanId);

  if (!loan) throw new ApiError(404, "Loan not found");

  res.json({
    borrower: loan.borrower,
    lender: loan.lender,
    amount: ethers.formatEther(loan.amount),
    interestRate: loan.interestRate,
    duration: loan.duration,
    isFunded: loan.isFunded,
    isRepaid: loan.isRepaid,
    isDefaulted: loan.isDefaulted,
  });
});

// 5️⃣ GET ALL LOANS
const getAllLoans = asyncHandler(async (req, res) => {
  try {
    const loans = await Loan.find(
      {},
      "loanId loanAmount time borrowerEthAddress"
    );

    if (!loans.length) throw new ApiError(404, "No loans found");

    // Fetch borrower's credit score from User DB
    const formattedLoans = await Promise.all(
      loans.map(async (loan) => {
        const user = await User.findOne(
          { ethAddress: loan.borrowerEthAddress },
          "creditScore"
        );
        return {
          loanId: loan.loanId,
          loanAmount: loan.loanAmount,
          time: loan.time,
          creditScore: user ? user.creditScore : "Not Available",
        };
      })
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, formattedLoans, "All loans retrieved successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

export { createLoan, loanFunded, loanRepaid, getLoanDetails, getAllLoans };
