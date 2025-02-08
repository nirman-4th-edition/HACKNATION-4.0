import { Router } from 'express';
import { createNotification, getNotifications, markNotificationAsRead } from '../controllers/notification.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/notifications').post(verifyJWT, createNotification);

router.route('/notification').get(verifyJWT, getNotifications);

router.route('/notifications-read').put(verifyJWT, markNotificationAsRead);

export default router;