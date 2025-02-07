import express from 'express';
import { createAuditLog, getAuditLogs } from '../controllers/auditLog.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const router = express.Router();


router.post('/audit-logs', verifyJWT, asyncHandler(createAuditLog));


router.get('/audit-logs', verifyJWT, asyncHandler(getAuditLogs));

export default router;