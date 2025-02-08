package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.farm2u.navigation.Screens
import com.example.farm2u.viewModel.HomeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    navController: NavController,
    productName: String,
    viewModel: HomeViewModel = viewModel()
) {
    val product = viewModel.productItems.find { it.name == productName }

    product?.let {
        var selectedQuantity by remember { mutableStateOf(1) }
        val pricePerKg = product.price
        var totalPrice by remember { mutableStateOf(pricePerKg) }

        // Update total price whenever selectedQuantity changes
        LaunchedEffect(selectedQuantity) {
            totalPrice = selectedQuantity * pricePerKg
        }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(product.name) },
                    navigationIcon = {
                        IconButton(onClick = { navController.popBackStack() }) {
                            Icon(
                                painterResource(id = android.R.drawable.ic_menu_close_clear_cancel),
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
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Product Image
                Image(
                    painter = painterResource(id = product.image),
                    contentDescription = product.name,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(200.dp)
                        .clip(RoundedCornerShape(16.dp))
                )

                // Product Name
                Text(
                    text = product.name,
                    style = MaterialTheme.typography.headlineLarge,
                    fontWeight = FontWeight.Bold
                )

                // Price per KG
                Text(
                    text = "Price: ${product.price} ₹ / KG",
                    style = MaterialTheme.typography.bodyLarge,
                    color = Color(0xFF4CAF50)
                )

                // Available Quantity
                Text(
                    text = "Available Quantity: ${product.quantity} ",
                    style = MaterialTheme.typography.bodyMedium
                )

                // Quantity Selection Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Decrease Quantity Button
                    Button(
                        onClick = {
                            if (selectedQuantity > 1) {
                                selectedQuantity -= 1
                            }
                        },
                        modifier = Modifier.padding(end = 16.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                    ) {
                        Text(
                            text = "-",
                            style = MaterialTheme.typography.headlineLarge.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                    }

                    // Display Selected Quantity
                    Text(
                        text = "$selectedQuantity KG",
                        style = MaterialTheme.typography.bodyLarge,
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )

                    // Increase Quantity Button
                    Button(
                        onClick = {
                            val availableQuantity = product.quantity.toIntOrNull() ?: 0
                            if (selectedQuantity > availableQuantity) {
                                selectedQuantity += 1
                            }
                        },
                        modifier = Modifier.padding(start = 16.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                    ) {
                        Text(
                            text = "+",
                            style = MaterialTheme.typography.headlineLarge.copy(
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        )
                    }
                }

                // Total Price Display
                Text(
                    text = "Total Price: ₹%.2f".format(totalPrice),
                    style = MaterialTheme.typography.bodyLarge.copy(
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF4CAF50)
                    ),
                    modifier = Modifier.padding(vertical = 10.dp)
                )

                Spacer(modifier = Modifier.height(20.dp))

                // Action Buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Button(
                        onClick = { navController.navigate(Screens.ShoppingCart.route) },
                        modifier = Modifier
                            .weight(1f)
                            .padding(end = 8.dp)
                    ) {
                        Text("Add to Cart")
                    }

                    Button(
                        onClick = {
                            navController.navigate(
                                "${Screens.OrderSummaryScreen.route}/${product.name}/${product.image}/${product.price}/$selectedQuantity"
                            )
                        },
                        modifier = Modifier
                            .weight(1f)
                            .padding(start = 8.dp)
                    ) {
                        Text("Buy Now")
                    }
                }
            }
        }
    } ?: run {
        // Product Not Found Fallback
        Box(
            modifier = Modifier
                .fillMaxSize()
                .wrapContentSize(Alignment.Center)
        ) {
            Text(
                text = "Product not found",
                style = MaterialTheme.typography.headlineSmall,
                color = Color.Red
            )
        }
    }
}