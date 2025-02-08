package com.example.allinone

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await

class DashboardViewModel : ViewModel() {
    // Set the custom URL for your Firebase Realtime Database
    private val database: DatabaseReference = FirebaseDatabase
        .getInstance("https://falcon-9bb9e-default-rtdb.asia-southeast1.firebasedatabase.app/")
        .getReference("Weather")

    val weatherData = liveData {
        try {
            // Fetch the data from Firebase
            val weatherSnapshot = database.get().await()

            // Log the entire snapshot to see what is returned
            Log.d("FirebaseData", "Fetched data: ${weatherSnapshot.value}")

            // Extract the values for temperature, humidity, and pressure from the snapshot
            val temperature = weatherSnapshot.child("Temperature").value as? Double ?: 0.0
            val humidity = (weatherSnapshot.child("Humidity").value as? Long)?.toInt() ?: 0
            val pressure = weatherSnapshot.child("pressure").value as? Double ?: 0.0

            // Emit the data to be observed
            emit(WeatherData(temperature, humidity, pressure))
        } catch (e: Exception) {
            Log.e("FirebaseData", "Error fetching data", e)
            // Emit default values or handle the error as needed
            emit(WeatherData(0.0, 0, 0.0))
        }
    }
}

data class WeatherData(val temperature: Double, val humidity: Int, val pressure: Double)