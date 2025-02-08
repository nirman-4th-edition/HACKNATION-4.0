import {asyncHandler} from '../utils/asyncHandler.js';
import {Transaction} from '../models/transaction.model.js';
import {FoodListing} from '../models/FoodListing.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { sendNotification,handleTransactionFees } from './user.controller.js';


const createTransaction = asyncHandler(async (req, res) => {
    const { foodListingId, transactionType, amount, charityId } = req.body;
    const userId = req.user._id;

    if (!foodListingId || !transactionType || !amount) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const foodListing = await FoodListing.findById(foodListingId);
    if (!foodListing) {
        throw new ApiError(404, "Food listing not found");
    }

    if (transactionType === 'donation' && !charityId) {
        throw new ApiError(400, "Please provide charity ID for donation");
    }

    const transaction = new Transaction({
        consumerId: userId,
        providerId: foodListing.providerId,
        foodListingId,
        transactionType,
        amount,
        status: 'pending'
    });

    if (transactionType === 'purchase') {
        const fee = await handleTransactionFees(transaction);
        transaction.fee = fee;
    }

    await transaction.save();

    foodListing.availabilityStatus = 'unavailable';
    await foodListing.save();

    await sendNotification(foodListing.providerId, `Your food listing has been ${transactionType === 'purchase' ? 'purchased' : 'donated'}`, 'transaction');
    if (transactionType === 'donation') {
        await sendNotification(charityId, `You have received a donation`, 'transaction');
    }

    return res.status(201).json(
        new ApiResponse(201, transaction, "Transaction created successfully")
    );
});



const getTransactions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { type } = req.query;

    const query = { $or: [{ consumerId: userId }, { providerId: userId }] };
    if (type) {
        query.transactionType = type;
    }

    const transactions = await Transaction.find(query).populate('foodListingId').populate('providerId').populate('consumerId');

    return res.status(200).json(
        new ApiResponse(200, transactions, "Transactions retrieved successfully")
    );
});



const updateTransactionStatus = asyncHandler(async (req, res) => {
    const { transactionId, status } = req.body;

    if (!transactionId || !status) {
        throw new ApiError(400, "Please provide transaction ID and status");
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    transaction.status = status;
    await transaction.save();

    return res.status(200).json(
        new ApiResponse(200, transaction, "Transaction status updated successfully")
    );
});

export {
    createTransaction,
    getTransactions,
    updateTransactionStatus
};