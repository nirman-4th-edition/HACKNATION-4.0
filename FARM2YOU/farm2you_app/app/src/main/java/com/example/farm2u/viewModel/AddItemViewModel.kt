package com.example.farm2u.viewModel

import android.net.Uri
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import com.example.farm2u.view.Product

class AddItemViewModel : ViewModel() {




    // Mutable states to hold form values
    val name: MutableState<String> = mutableStateOf("")
    val cropType: MutableState<String> = mutableStateOf("")
    val price: MutableState<String> = mutableStateOf("")
    val quantity: MutableState<String> = mutableStateOf("")
    val imageUri: MutableState<Uri?> = mutableStateOf(null) // Uri for the image
    var selectedIndex by mutableIntStateOf(0)

    // List to hold products
    val productList = mutableStateOf<List<Product>>(emptyList())

    // Add product to the list
    fun addProduct() {
        if (name.value.isNotEmpty() && price.value.isNotEmpty() && quantity.value.isNotEmpty()) {
            val newProduct = Product( // Use Product from com.example.farm2u.view
                imageRes = imageUri.value,  // Set imageUri, it could be null
                name = name.value,
                pricePerKg = "₹${price.value}/kg",
                quantity = "Available: ${quantity.value} Kg"
            )

            // Add the new product to the list
            productList.value = productList.value + newProduct

            // Clear fields after adding the product
            clearFields()
        }
    }

    // Method to reset all fields (optional)
    fun clearFields() {
        name.value = ""
        cropType.value = ""
        price.value = ""
        quantity.value = ""
        imageUri.value = null
    }
}
