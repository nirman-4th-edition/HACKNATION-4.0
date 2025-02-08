package com.example.farm2u.model

data class ProductItem(
    val id: Int,
    val name: String,
    val farmers: String,
    val quantity: String, // Expected String (e.g., "10 KG")
    val image: Int,
    val price: Double // Add price as a property
)
