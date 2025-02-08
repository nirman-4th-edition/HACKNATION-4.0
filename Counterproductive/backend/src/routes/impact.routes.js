import { Router } from 'express';
import { trackSustainabilityMetrics, getImpactData } from '../controllers/impact.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/impact').post(verifyJWT, trackSustainabilityMetrics);

router.route('/impact/:userId').get(verifyJWT, getImpactData);

export default router;