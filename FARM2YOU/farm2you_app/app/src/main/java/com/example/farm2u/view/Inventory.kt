package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.farm2u.R

// Data class for inventory items
data class InventoryItem(
    val cropName: String,
    var quantity: Int,
    val imageRes: Int
)

// Sample inventory data with image references
val sampleInventory = listOf(
    InventoryItem("Tomato", 50, R.drawable.tomato),
    InventoryItem("Potato", 80, R.drawable.potato),
    InventoryItem("Onion", 60, R.drawable.onion)
)

@Composable
fun Inventory(navController: NavHostController) {
    var inventoryItems by remember { mutableStateOf(sampleInventory) }

    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        // Background Image
        Image(
            painter = painterResource(id = R.drawable.img_6),
            contentDescription = "Background Placeholder",
            contentScale = ContentScale.FillHeight,
            modifier = Modifier.matchParentSize()
        )

        // Foreground Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.5f)) // Slight overlay for readability
                .padding(16.dp),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.Start
        ) {
            // Back Button with Icon Only
            IconButton(
                onClick = { navController.navigateUp() },
                modifier = Modifier.padding(bottom = 16.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = Color.White
                )
            }

            // Title
            Text(
                text = "Inventory Management",
                style = MaterialTheme.typography.headlineSmall,
                modifier = Modifier.padding(bottom = 8.dp),
                color = Color.White
            )

            // Display inventory list
            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(inventoryItems) { item ->
                    InventoryCard(item) { updatedQuantity ->
                        inventoryItems = inventoryItems.map {
                            if (it.cropName == item.cropName) it.copy(quantity = updatedQuantity) else it
                        }
                    }
                }
            }
        }
    }
}

// Composable for each inventory item
@Composable
fun InventoryCard(item: InventoryItem, onUpdate: (Int) -> Unit) {
    var updatedQuantity by remember { mutableStateOf(item.quantity.toString()) }
    var inputError by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(1.1f)
            .padding(4.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp)
                .background(Color(0xFF2C3E50)),
            verticalArrangement = Arrangement.SpaceBetween,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Crop Image
            Image(
                painter = painterResource(id = item.imageRes),
                contentDescription = item.cropName,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(100.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color.Gray)
            )

            // Crop Name
            Text(
                text = item.cropName,
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White,
                modifier = Modifier.padding(top = 8.dp)
            )

            // Quantity
            Text(
                text = "${item.quantity} KG",
                style = MaterialTheme.typography.bodyMedium,
                color = Color.White
            )

            // Quantity Update Field
            OutlinedTextField(
                value = updatedQuantity,
                onValueChange = { updatedQuantity = it },
                label = { Text("Update Quantity", color = Color.White) },
                isError = inputError,
                modifier = Modifier
                    .width(230.dp)
                    .padding(top = 4.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = Color(0xFF2C3E50),
                    unfocusedContainerColor = Color(0xFF2C3E50),
                    focusedTextColor = Color.White,
                    unfocusedTextColor = Color.White,
                    focusedBorderColor = Color.White,
                    unfocusedBorderColor = Color.Gray,
                    cursorColor = Color.White
                )
            )

            if (inputError) {
                Text(
                    text = "Invalid quantity!",
                    color = Color.Red,
                    style = MaterialTheme.typography.bodySmall
                )
            }

            // Update Button
            Button(
                onClick = {
                    val quantity = updatedQuantity.toIntOrNull()
                    if (quantity != null && quantity >= 0) {
                        onUpdate(quantity)
                        inputError = false
                    } else {
                        inputError = true
                    }
                },
                modifier = Modifier.padding(top = 4.dp)
            ) {
                Text("Update")
            }
        }
    }
}
