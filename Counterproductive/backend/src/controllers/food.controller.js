import {asyncHandler} from '../utils/asyncHandler.js';
import {Food} from '../models/food.model.js';
import {FoodListing} from '../models/FoodListing.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const createFoodListing = asyncHandler(async (req, res) => {
  const { foodId, description, expiryDate, quantity, originalPrice, discountedPrice, photo } = req.body;
  const providerId = req.user._id;

  if ([foodId, description, expiryDate, quantity, originalPrice, photo].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill in all required fields");
  }

  const food = await Food.findById(foodId);
  if (!food) {
    throw new ApiError(404, "Food not found");
  }

  const foodListing = new FoodListing({
    providerId,
    food: foodId,
    description,
    expiryDate,
    quantity,
    originalPrice,
    discountedPrice,
    photo,
    availabilityStatus: 'available'
  });

  await foodListing.save();

  res.status(201).json(new ApiResponse(201, foodListing, "Food listing created successfully"));
});

const updateFoodListing = asyncHandler(async (req, res) => {
  const { foodListingId } = req.params;
  const { description, expiryDate, quantity, originalPrice, discountedPrice, photo } = req.body;

  const foodListing = await FoodListing.findById(foodListingId);

  if (!foodListing) {
    throw new ApiError(404, 'Food listing not found');
  }

  foodListing.description = description || foodListing.description;
  foodListing.expiryDate = expiryDate || foodListing.expiryDate;
  foodListing.quantity = quantity || foodListing.quantity;
  foodListing.originalPrice = originalPrice || foodListing.originalPrice;
  foodListing.discountedPrice = discountedPrice || foodListing.discountedPrice;
  foodListing.photo = photo || foodListing.photo;

  await foodListing.save();

  res.status(200).json(new ApiResponse(200, foodListing, "Food listing updated successfully"));
});

const deleteFoodListing = asyncHandler(async (req, res) => {
  const { foodListingId } = req.params;

  const foodListing = await FoodListing.findById(foodListingId);

  if (!foodListing) {
    throw new ApiError(404, 'Food listing not found');
  }

  await foodListing.remove();

  res.status(200).json(new ApiResponse(200, null, "Food listing deleted successfully"));
});

const getFoodListings = asyncHandler(async (req, res) => {
  const foodListings = await FoodListing.find().populate('food');

  res.status(200).json(new ApiResponse(200, foodListings, "Food listings retrieved successfully"));
});



export {
    createFoodListing,
    updateFoodListing,
    deleteFoodListing,
    getFoodListings
}