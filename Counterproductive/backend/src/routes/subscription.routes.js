import { Router } from 'express';
import { 
    createSubscription, 
    updateSubscription, 
    deleteSubscription, 
    getSubscriptions 
} from '../controllers/subscription.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const router = Router();

router.route('/subscriptions').post(verifyJWT, asyncHandler(createSubscription));

router.route('/subscriptions/:subscriptionId').put(verifyJWT, asyncHandler(updateSubscription));

router.route('/subscriptions/:subscriptionId').delete(verifyJWT, asyncHandler(deleteSubscription));

router.route('/subscriptions').get(verifyJWT, asyncHandler(getSubscriptions));

export default router;