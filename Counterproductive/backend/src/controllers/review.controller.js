import {asyncHandler} from '../utils/asyncHandler.js';
import { Review } from '../models/review.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const createReview = asyncHandler(async (req, res) => {
  const { foodListingId, rating, comment } = req.body;
  const userId = req.user._id;

  if (!foodListingId || !rating) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const review = new Review({
    user: userId,
    foodListing: foodListingId,
    rating,
    comment
  });

  await review.save();

  res.status(201).json(new ApiResponse(201, review, "Review created successfully"));
});


const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();

  res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
});


const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await review.remove();

  res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});


const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('user').populate('foodListing');

  res.status(200).json(new ApiResponse(200, reviews, "Reviews retrieved successfully"));
});

export {
  createReview,
  updateReview,
  deleteReview,
  getReviews
};