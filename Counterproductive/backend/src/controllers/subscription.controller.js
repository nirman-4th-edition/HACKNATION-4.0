import {asyncHandler} from '../utils/asyncHandler.js';
import { Subscription } from '../models/subscription.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const createSubscription = asyncHandler(async (req, res) => {
  const { businessId, planType } = req.body;

  if (!businessId || !planType) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const subscription = new Subscription({
    business: businessId,
    planType,
    startDate: Date.now(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Example: 30 days from now
  });

  await subscription.save();

  res.status(201).json(new ApiResponse(201, subscription, "Subscription created successfully"));
});


const updateSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId } = req.params;
  const { planType, endDate } = req.body;

  const subscription = await Subscription.findById(subscriptionId);

  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }

  subscription.planType = planType || subscription.planType;
  subscription.endDate = endDate || subscription.endDate;

  await subscription.save();

  res.status(200).json(new ApiResponse(200, subscription, "Subscription updated successfully"));
});


const deleteSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId } = req.params;

  const subscription = await Subscription.findById(subscriptionId);

  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }

  await subscription.remove();

  res.status(200).json(new ApiResponse(200, null, "Subscription deleted successfully"));
});


const getSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find();

  res.status(200).json(new ApiResponse(200, subscriptions, "Subscriptions retrieved successfully"));
});

export {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptions
};