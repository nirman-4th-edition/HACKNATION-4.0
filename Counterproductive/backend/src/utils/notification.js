import Notification from '../models/notification.model.js';
import ApiError from './ApiError.js';



export const createNotification = async (userId, message, type) => {
  try {
    const notification = new Notification({
      user: userId,
      message,
      type
    });

    await notification.save();
    return notification;
  } catch (error) {
    throw new ApiError(500, 'Error creating notification');
  }
};



export const getNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    if (!notifications) {
      throw new ApiError(404, 'Notifications not found');
    }

    return notifications;
  } catch (error) {
    throw new ApiError(500, 'Error retrieving notifications');
  }
};



export const markNotificationAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    notification.isRead = true;
    await notification.save();

    return notification;
  } catch (error) {
    throw new ApiError(500, 'Error marking notification as read');
  }
};