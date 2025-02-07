import {asyncHandler} from '../utils/asyncHandler.js';
import {Notification} from '../models/notification.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';



const createNotification = asyncHandler(async (userId, message, type) => {
    const { id, msg, group } = req.body;
    const notification = new Notification({
        id,
        msg,
        group
    });

    await notification.save();
    res.status(201).json(notification);
});



const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notifications, "Notifications retrieved successfully")
    );
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.body;

    if (!notificationId) {
        throw new ApiError(400, "Please provide notification ID");
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json(
        new ApiResponse(200, notification, "Notification marked as read successfully")
    );
});


export{
    createNotification,
    getNotifications,
    markNotificationAsRead
}