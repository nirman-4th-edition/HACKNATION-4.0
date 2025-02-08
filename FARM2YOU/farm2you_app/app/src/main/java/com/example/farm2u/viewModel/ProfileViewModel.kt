package com.example.farm2u.viewmodel

import android.net.Uri
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel

class ProfileViewModel : ViewModel() {
    var farmerName = mutableStateOf("John Doe")
    var farmerPhone = mutableStateOf("+91 9876543210")
    var farmerLocation = mutableStateOf("Pune, India")
    var farmerCrops = mutableStateOf("Wheat, Rice")
    var profileImageUri = mutableStateOf<Uri?>(null)

    fun updateProfile(name: String, phone: String, location: String, crops: String, imageUri: Uri?) {
        farmerName.value = name
        farmerPhone.value = phone
        farmerLocation.value = location
        farmerCrops.value = crops
        profileImageUri.value = imageUri
    }
}
