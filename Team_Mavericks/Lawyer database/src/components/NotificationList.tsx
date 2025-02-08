import React from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export function NotificationList({ 
  notifications, 
  onNotificationRead, 
  onApprove, 
  onDeny 
}: NotificationListProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border ${
            notification.isRead ? 'bg-white' : 'bg-blue-50'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{notification.userName}</p>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
              {notification.status && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                  notification.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!notification.status && (
                <>
                  <button
                    onClick={() => onApprove(notification.id)}
                    className="p-2 text-green-600 hover:text-green-800 transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeny(notification.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    title="Deny"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </>
              )}
              {!notification.isRead && (
                <button
                  onClick={() => onNotificationRead(notification.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}