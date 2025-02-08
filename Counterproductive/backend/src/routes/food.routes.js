import express from 'express';
import { createFoodListing, updateFoodListing, deleteFoodListing, getFoodListings } from '../controllers/food.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const router = express.Router();


router.post('/food', verifyJWT, asyncHandler(createFoodListing));


router.put('/food/:foodListingId', verifyJWT, asyncHandler(updateFoodListing));


router.delete('/food/:foodListingId', verifyJWT, asyncHandler(deleteFoodListing));


router.get('/food', asyncHandler(getFoodListings));

export default router;