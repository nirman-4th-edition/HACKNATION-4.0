package com.example.farm2u.view

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Gray
import androidx.compose.ui.graphics.Color.Companion.Green
import androidx.navigation.NavHostController

data class FarmerProductHistory(
    val productName: String,
    val quantity: Double,
    val price: Double,
    val completionDate: String? = null,
    val status: String,
    val rating: Int? = null
)

val farmerCompletedHistoryData = listOf(
    FarmerProductHistory("Tomato", 20.0, 50.0, "2024-06-01", "Completed", 4),
    FarmerProductHistory("Cucumber", 15.0, 40.0, "2024-07-15", "Completed", 5),
    FarmerProductHistory("Potato", 25.0, 55.0, "2024-05-10", "Completed", 3),
    FarmerProductHistory("Wheat", 30.0, 70.0, "2024-03-20", "Completed", 4),
    FarmerProductHistory("Onion", 18.0, 45.0, "2024-02-10", "Completed", 5)
)

val farmerPendingHistoryData = listOf(
    FarmerProductHistory("Carrot", 10.0, 30.0, null, "Pending"),
    FarmerProductHistory("Spinach", 8.0, 22.0, null, "Pending"),
    FarmerProductHistory("Lettuce", 12.0, 18.0, null, "Pending"),
    FarmerProductHistory("Radish", 14.0, 28.0, null, "Pending"),
    FarmerProductHistory("Garlic", 20.0, 50.0, null, "Pending")
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun History(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("History") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            Icons.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(8.dp)
        ) {
            // Completed Transactions Section
            Text(
                text = "Completed Transactions",
                style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Bold),
                color = Green,
                modifier = Modifier.padding(vertical = 8.dp)
            )

            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(farmerCompletedHistoryData) { product ->
                    FarmerHistoryCard(product = product, navController = navController)
                }
            }

            // Pending Transactions Section
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Pending Transactions",
                style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Bold),
                color = Color(0xFFFF5722),
                modifier = Modifier.padding(vertical = 8.dp)
            )

            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(farmerPendingHistoryData) { product ->
                    FarmerHistoryCard(product = product, navController = navController)
                }
            }
        }
    }
}

@Composable
fun FarmerHistoryCard(product: FarmerProductHistory, navController: NavHostController) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp)
            .clickable {
                if (product.status == "Completed") {
                    // Navigate to Track Order Screen
                    navController.navigate("track_order/${product.productName}")
                }
            },
        shape = MaterialTheme.shapes.medium,
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(12.dp)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = "Product: ${product.productName}",
                style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold)
            )
            Text(
                text = "Quantity: ${product.quantity} KG",
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "Price: ₹${product.price}",
                style = MaterialTheme.typography.bodyMedium
            )
            if (product.status == "Completed") {
                Text(
                    text = "Completed On: ${product.completionDate}",
                    style = MaterialTheme.typography.bodySmall,
                    color = Gray
                )
                product.rating?.let {
                    RatingStars(it)
                }
            } else {
                Text(
                    text = "Status: ${product.status}",
                    style = MaterialTheme.typography.bodySmall,
                    color = Gray
                )
            }
        }
    }
}

@Composable
fun RatingStars(rating: Int) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        for (i in 1..5) {
            Icon(
                imageVector = if (i <= rating) Icons.Filled.Star else Icons.Default.Star,
                contentDescription = "Star",
                tint = if (i <= rating) Color(0xFF138a3d) else Color.LightGray
            )
        }
    }
}
