import express from 'express';
import { createCategory, updateCategory, deleteCategory, getCategories } from '../controllers/category.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const router = express.Router();


router.post('/categories', verifyJWT, asyncHandler(createCategory));


router.put('/categories/:categoryId', verifyJWT, asyncHandler(updateCategory));


router.delete('/categories/:categoryId', verifyJWT, asyncHandler(deleteCategory));

router.get('/categories', asyncHandler(getCategories));

export default router;