import express from 'express';
import { createCharity, updateCharity, deleteCharity, getCharities } from '../controllers/charity.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const router = express.Router();


router.post('/charities', verifyJWT, asyncHandler(createCharity));


router.put('/charities/:charityId', verifyJWT, asyncHandler(updateCharity));


router.delete('/charities/:charityId', verifyJWT, asyncHandler(deleteCharity));


router.get('/charities', asyncHandler(getCharities));

export default router;