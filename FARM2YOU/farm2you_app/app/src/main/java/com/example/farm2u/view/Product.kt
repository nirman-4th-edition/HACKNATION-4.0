package com.example.farm2u.view

import android.net.Uri

data class Product(
    val imageRes: Uri? = null,  // Or use a default image resource ID if you prefer
    val name: String,
    val pricePerKg: String,
    val quantity: String
)
