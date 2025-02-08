package com.example.farm2u.viewModel

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.farm2u.model.NavItem

class ScaffoldViewModel: ViewModel() {
    val selectedIndex = mutableStateOf(0)

    val expanded = mutableStateOf(false)

    val navItemList = listOf(
        NavItem("Home", Icons.Default.Home),
        NavItem("Favourites", Icons.Filled.Favorite ),
        NavItem("Cart", Icons.Default.ShoppingCart),
        NavItem("Profile", Icons.Default.Person),
    )

    val farmerItemList = listOf(
        NavItem("Home", Icons.Default.Home),
        NavItem("Add", Icons.Default.AddCircle ),
        NavItem("Orders", Icons.AutoMirrored.Filled.List),
        NavItem("Negotiate", Icons.Default.Email),
    )
}