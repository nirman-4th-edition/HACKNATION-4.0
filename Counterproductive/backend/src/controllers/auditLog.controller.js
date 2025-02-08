import {asyncHandler} from '../utils/asyncHandler.js';
import { AuditLog } from '../models/auditLog.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createAuditLog = asyncHandler(async (req, res) => {
  const { action, details } = req.body;
  const userId = req.user._id;

  if (!action || !details) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const auditLog = new AuditLog({
    user: userId,
    action,
    details
  });

  await auditLog.save();

  res.status(201).json(new ApiResponse(201, auditLog, "Audit log created successfully"));
});

const getAuditLogs = asyncHandler(async (req, res) => {
  const auditLogs = await AuditLog.find().populate('user');

  res.status(200).json(new ApiResponse(200, auditLogs, "Audit logs retrieved successfully"));
});

export {
  createAuditLog,
  getAuditLogs
};