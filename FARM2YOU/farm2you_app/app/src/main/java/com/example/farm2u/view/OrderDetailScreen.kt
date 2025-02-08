package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.draw.clip
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.model.Order
import com.example.farm2u.navigation.Screens

@OptIn(ExperimentalMaterial3Api::class)
@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun OrderDetailScreen(navController: NavController, productName: String) {
    // Sample list of orders (replace with actual data)
    val orders = listOf(
        Order("Tomato", "Andhapashara Road", 10, R.drawable.tomato),
        Order("Tomato", "Kalinga Nagar", 20, R.drawable.tomato),
        Order("Tomato", "Bustand", 15, R.drawable.tomato),
        Order("Tomato", "Ganesh Nagar", 10, R.drawable.tomato),
        Order("Tomato", "Tulasi Nagar", 20, R.drawable.tomato),
        Order("Tomato", "Khodasingi", 15, R.drawable.tomato)
    )

    // State to control the visibility of "Track Order" button
    var isOrderConfirmed by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Order Details") },
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
        // Background with a placeholder image
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Background Image Placeholder
            Image(
                painter = painterResource(id = R.drawable.img_10), // Replace with your background image
                contentDescription = "Background",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // Content Overlay
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 8.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Spacer(modifier = Modifier.height(170.dp)) // Gap below TopAppBar

                // Horizontal scrollable square cards
                LazyRow(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(350.dp)
                        .padding(horizontal = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(orders) { order ->
                        Box(
                            modifier = Modifier
                                .size(300.dp) // Ensures a square box
                                .clip(RoundedCornerShape(12.dp))
                                .background(Color.White.copy(alpha = 0.8f)) // Transparent background
                                .padding(8.dp)
                        ) {
                            Column(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .padding(8.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = order.productName,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Image(
                                    painter = painterResource(id = order.productImage),
                                    contentDescription = "Product Image",
                                    modifier = Modifier
                                        .size(100.dp)
                                        .padding(8.dp)
                                )
                                Text(
                                    text = "Location: ${order.location}",
                                    fontSize = 14.sp
                                )
                                Text(
                                    text = "Quantity: ${order.quantity}",
                                    fontSize = 14.sp
                                )

                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(top = 8.dp),
                                    horizontalArrangement = Arrangement.SpaceAround
                                ) {
                                    Button(
                                        onClick = { navController.navigate(Screens.ChatScreen.route) },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                                    ) {
                                        Text("Negotiate")
                                    }

                                    Button(
                                        onClick = { isOrderConfirmed = true },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE91E63))
                                    ) {
                                        Text("Confirm")
                                    }
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                if (isOrderConfirmed) {
                    Text(
                        text = "Order Confirmed!",
                        color = Color.Green,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp
                    )
                }
            }
        }
    }
}
