package com.example.allinone

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ktx.getValue

class AnimalDetectionViewModel(application: Application) : AndroidViewModel(application) {
    private val _animalDetected = MutableLiveData<Boolean>()
    val animalDetected: LiveData<Boolean> get() = _animalDetected

    private val database: FirebaseDatabase = FirebaseDatabase.getInstance()
    private val motionRef: DatabaseReference = database.getReference("Motion")

    init {
        fetchMotionData()
    }

    private fun fetchMotionData() {
        motionRef.get().addOnSuccessListener { snapshot ->
            val motionValue = snapshot.getValue(Boolean::class.java)
            _animalDetected.postValue(motionValue ?: false)
        }
    }
}
