package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.viewModel.HomeViewModel

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun Home(navController: NavController, viewModel: HomeViewModel = viewModel()) {
    // Background with Placeholder
    Box(modifier = Modifier.fillMaxSize()) {
        // Background Image as Placeholder
        Image(
            painter = painterResource(id = R.drawable.img_3), // Replace with your actual background image
            contentDescription = "Background Image",
            contentScale = ContentScale.FillHeight,
            modifier = Modifier.fillMaxSize()
        )

        // Main Content Over the Background
        Scaffold(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 100.dp, start = 10.dp, end = 10.dp, bottom = 15.dp),
            containerColor = Color.Transparent // Make Scaffold background transparent
        ) { contentPadding ->
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.Top
            ) {
                OutlinedTextField(
                    value = viewModel.searchText.value,
                    onValueChange = { viewModel.searchText.value = it },
                    label = { Text("Search") },
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 20.dp),
                    shape = RoundedCornerShape(50.dp)
                )
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "Categories",
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(10.dp),
                    color = Color.Black
                )
                CategorySection(navController = navController) // Pass navController
                HorizontalDivider(
                    color = Color.LightGray,
                    thickness = 1.dp,
                    modifier = Modifier.padding(vertical = 10.dp)
                )
                ProductList(navController = navController) // Pass navController
            }
        }
    }
}

@Composable
fun ProductList(navController: NavController, viewModel: HomeViewModel = viewModel()) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(2), // 2 items per row
        verticalArrangement = Arrangement.spacedBy(8.dp), // Spacing between rows
        horizontalArrangement = Arrangement.spacedBy(8.dp), // Spacing between columns
        modifier = Modifier.padding(bottom = 100.dp)
    ) {
        items(viewModel.productItems.size) { index -> // Use index to access items
            ProductsCard(index, viewModel, navController) // Pass navController here
        }
    }
}

@Composable
fun ProductsCard(index: Int, viewModel: HomeViewModel, navController: NavController) {
    val item = viewModel.productItems[index] // Get the product item by index
    Card(
        modifier = Modifier
            .padding(8.dp) // Slightly more padding for better separation
            .fillMaxWidth() // Make card fill the available width
            .clickable { // Add clickable modifier for navigation
                navController.navigate("product_detail/${item.name}") // Navigate to product detail
            },
        elevation = CardDefaults.cardElevation(4.dp), // Increase elevation for a subtle shadow
        shape = RoundedCornerShape(12.dp), // Softer corner radius
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(
            modifier = Modifier.padding(10.dp), // Increased padding inside the card
            verticalArrangement = Arrangement.spacedBy(10.dp) // Adds consistent spacing between elements
        ) {
            Image(
                painter = painterResource(id = item.image),
                contentDescription = item.name,
                modifier = Modifier
                    .size(100.dp) // Slightly larger image
                    .clip(RoundedCornerShape(8.dp)) // Add rounded corners to the image
                    .background(Color.Gray.copy(alpha = 0.1f)) // Subtle background for the image
                    .align(Alignment.CenterHorizontally)
            )
            Text(
                text = item.name,
                style = MaterialTheme.typography.headlineLarge, // Use headline typography for the name
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
            Text(
                text = item.farmers,
                style = MaterialTheme.typography.bodySmall.copy(color = Color.Gray), // Subtle text color for secondary info
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp), // Add vertical padding for breathing room
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically // Center-align content vertically
            ) {
                Column {
                    Text(
                        text = "Farmers: ",
                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold) // Bold label
                    )
                    Text(
                        text = item.farmers,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
                Text(
                    text = "${item.price} ₹ / KG",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        color = Color(0xFF4CAF50), // Green color for the price
                        fontWeight = FontWeight.Bold
                    ),
                    modifier = Modifier.padding(end = 5.dp) // Padding to separate price from edge
                )
            }
        }
    }
}

@Composable
fun CategorySection(navController: NavController, viewModel: HomeViewModel = viewModel()) {
    LazyRow(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(viewModel.categoryItems.size) { index ->
            val categoryItem = viewModel.categoryItems[index]
            Card(
                modifier = Modifier
                    .padding(5.dp)
                    .height(80.dp)
                    .width(80.dp)
                    .shadow(elevation = 5.dp, shape = RoundedCornerShape(10.dp))
                    .clickable {
                        navController.navigate("product_detail/${categoryItem.name}")
                    },
                shape = RoundedCornerShape(10.dp),
                elevation = CardDefaults.cardElevation(),
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(5.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Image(
                        painter = painterResource(id = categoryItem.image),
                        contentDescription = categoryItem.name,
                        modifier = Modifier.size(50.dp)
                    )
                }
            }
        }
    }
}
