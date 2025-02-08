package com.example.allinone

import androidx.lifecycle.ViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import android.util.Log

class MotorStatusViewModel : ViewModel() {

    private val _motorOn = MutableLiveData(false)
    val motorOn: LiveData<Boolean> get() = _motorOn

    private val database = FirebaseDatabase.getInstance("https://falcon-9bb9e-default-rtdb.asia-southeast1.firebasedatabase.app/")
        .reference.child("Motor")

    init {
        // Real-time listener to fetch and update motor status
        database.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val status = snapshot.value?.toString() ?: "Off"
                _motorOn.value = status.equals("On", ignoreCase = true)
            }

            override fun onCancelled(error: DatabaseError) {
                Log.e("MotorStatusViewModel", "Failed to read motor status", error.toException())
            }
        })
    }

    fun setMotorStatus(turnOn: Boolean) {
        val newStatus = if (turnOn) "On" else "Off"
        database.setValue(newStatus)
            .addOnSuccessListener {
                Log.d("MotorStatusViewModel", "Motor status updated to $newStatus")
            }
            .addOnFailureListener {
                Log.e("MotorStatusViewModel", "Failed to update motor status", it)
            }
    }
}


