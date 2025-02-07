import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodListing: {
    type: Schema.Types.ObjectId,
    ref: 'FoodListing',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export const Review = mongoose.model('Review', reviewSchema);
