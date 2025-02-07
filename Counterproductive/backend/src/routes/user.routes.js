import { Router } from 'express';
import { 
    registerBusinessOrConsumer,
    registerDelivery, 
    loginUser,
    logoutUser, 
    updateAccountDetails, 
    changeCurrentPassword, 
    refreshAccessToken, 
    businessOnboarding, 
    consumerOnboarding, 
    sendNotification, 
    trackSustainabilityMetrics, 
    handleTransactionFees, 
    handleSubscriptionPlans 
  } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';


const router = Router();


router.route('/register').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
]),registerBusinessOrConsumer);


router.route('/register-delivery').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ]),registerDelivery);

router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT,logoutUser);

router.route('/account').put(verifyJWT,updateAccountDetails);

router.route('/change-password').put(verifyJWT,changeCurrentPassword);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/business-onboarding').post(verifyJWT,businessOnboarding);

router.route('/consumer-onboarding').post(verifyJWT,consumerOnboarding);

router.route('/notification').post(verifyJWT,sendNotification);

router.route('/sustainability-metrices').get(verifyJWT,trackSustainabilityMetrics);

router.route('/transaction-fee').post(verifyJWT,handleTransactionFees);

router.route('/subscription-plans').post(verifyJWT,handleSubscriptionPlans);

export default router;