package com.example.farm2u.viewModel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.farm2u.R
import com.example.farm2u.model.CategoryItems
import com.example.farm2u.model.ProductItem
import kotlin.random.Random

class HomeViewModel : ViewModel() {
    val searchText = mutableStateOf("")
    val selectedCategory = mutableStateOf("All") // Default to all products

    val categoryItems = listOf(
        CategoryItems("All", R.drawable.basket),
        CategoryItems("Fruits", R.drawable.fruits),
        CategoryItems("Vegetables", R.drawable.vegetable),
        CategoryItems("Grains", R.drawable.grains),
    )

    val productItems = listOf(
        ProductItem(1, "Tomato", "Ramu's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.tomato, 50.0),
        ProductItem(2, "Potato", "Kalia's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.potato, 30.0),
        ProductItem(3, "Apple", "Ramesh's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.apple, 100.0),
        ProductItem(4, "Banana", "Suresh's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.banana, 40.0),
        ProductItem(5, "Carrot", "Raju's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.carrot, 60.0),
        ProductItem(6, "Wheat", "Jaya's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.wheat, 25.0),
        ProductItem(7, "Rice", "Sai's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.rice, 35.0),
        ProductItem(8, "Jowar", "Rabi's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.jowar, 45.0),
        ProductItem(9, "Onion", "Titu's Farm", "${Random.nextInt(1, 100)} KG", R.drawable.onion, 55.0),
    )
}
