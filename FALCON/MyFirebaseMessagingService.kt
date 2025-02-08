package com.example.allinone

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.allinone.R
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    companion object {
        const val CHANNEL_ID = "alert_channel"
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        // Check if the message contains notification payload
        remoteMessage.notification?.let {
            // Send notification
            sendNotification(it.body)
        }
    }

    private fun sendNotification(messageBody: String?) {
        // Create notification channel for devices running Android 8.0 or higher
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "Alert Notifications"
            val descriptionText = "Notifications for field alerts"
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }
            val notificationManager: NotificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }

        // Create notification
        val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.baseline_notifications) // Replace with your own icon
            .setContentTitle("Field Alert")
            .setContentText(messageBody)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)

        // Send notification
//        val notificationManager = NotificationManagerCompat.from(this)
//        notificationManager.notify(0, notificationBuilder.build())
    }
}


