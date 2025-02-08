package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OrderSummaryScreen(
    navController: NavController,
    productName: String,
    productImage: Int,
    productPrice: String,
    selectedQuantity: String
) {
    val totalPrice = productPrice.toDoubleOrNull()?.times(selectedQuantity.toIntOrNull() ?: 1) ?: 0.0

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Order Summary") },
                colors = TopAppBarDefaults.mediumTopAppBarColors(containerColor = Color.White)
            )
        },
        bottomBar = {
            BottomAppBar(containerColor = Color.White) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            "Total Payment ₹%.2f".format(totalPrice),
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold ,

                        )
                        Text(
                            "You'll save ₹50 on this order!",
                            fontSize = 14.sp,
                            color = Color(0xFF138a3d) // Using the specified hex color
                        )

                    }
                    Button(
                        onClick = {
                            navController.navigate("payment_screen/${totalPrice}")
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFFC107))
                    ) {
                        Text("CONTINUE")
                    }
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            // Delivery Information
            Text(
                text = "Deliver to:",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Chhayakant Dash",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Pandara street, Mentu square old berhampur,\nAndhapashara road Radhakanta street old berhampur,\nBERHAMPUR 760009",
                fontSize = 12.sp,
                color = Color.Gray
            )
            Text(
                text = "9861378752",
                fontSize = 12.sp,
                color = Color.Gray
            )
            Spacer(modifier = Modifier.height(16.dp))

            // Product Details (Dynamic)
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                shape = RoundedCornerShape(8.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.Start,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = productImage),
                        contentDescription = "Product Image",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier
                            .size(80.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color.LightGray)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = productName,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Weight: $selectedQuantity KG",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                        Text(
                            text = "₹%.2f".format(totalPrice),
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF138a3d)
                        )
                        Text(
                            text = "Delivery by Jan 10, Fri - FREE",
                            fontSize = 12.sp,
                            color = Color.Gray
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
            Divider()

            // Open Box Delivery Information
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Rest assured with Open Box Delivery",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.weight(1f)
                )
                Text(
                    text = "Delivery agent will open the package so you can check the freshness.",
                    fontSize = 12.sp,
                    color = Color.Gray
                )
            }
        }
    }
}
