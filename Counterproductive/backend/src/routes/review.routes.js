import { Router } from 'express';
import { 
    createReview, 
    updateReview, 
    deleteReview, 
    getReviews 
} from '../controllers/review.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/reviews').post(verifyJWT, createReview);

router.route('/reviews/:reviewId').put(verifyJWT, updateReview);

router.route('/reviews/:reviewId').delete(verifyJWT, deleteReview);

router.route('/reviews').get(getReviews);

export default router;