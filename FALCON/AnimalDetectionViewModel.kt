package com.example.allinone

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.google.firebase.messaging.FirebaseMessaging


class AnimalDetectionViewModel(application: Application) : AndroidViewModel(application) {
    private val _animalDetected = MutableLiveData<Boolean>()
    val animalDetected: LiveData<Boolean> get() = _animalDetected

    private val database: FirebaseDatabase = FirebaseDatabase.getInstance("https://falcon-9bb9e-default-rtdb.asia-southeast1.firebasedatabase.app/")
    private val motionRef: DatabaseReference = database.getReference("Motion")

    init {
        listenForMotionData()
    }

    private fun listenForMotionData() {
        motionRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val motionValue = snapshot.getValue(String::class.java) // Get the value as a string
                // Convert the string value to a Boolean
                val isAnimalDetected = motionValue?.toBoolean() ?: false // Default to false if null or invalid
                _animalDetected.postValue(isAnimalDetected)
            }

            override fun onCancelled(error: DatabaseError) {
                // Handle error, default to false if needed
                _animalDetected.postValue(false)
            }
        })
    }
    private fun sendNotificationToDevice(message: String) {
        // Trigger the notification to the device when motion is detected
        FirebaseMessaging.getInstance().subscribeToTopic("alert_topic") // Subscribing to topic
        // You can call your backend here to send a message via FCM or directly trigger notifications
    }
}
