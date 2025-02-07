package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.model.Order

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun FarmerOrders(navController: NavController) {
    // Sample list of orders
    val orders = listOf(
        Order("Tomato", "Berhampur", 10, R.drawable.tomato),
        Order("Potato", "Digapahandi", 20, R.drawable.potato),
        Order("Carrot", "Kukudakhandi", 15, R.drawable.carrot),
        Order("Tomato", "Berhampur", 10, R.drawable.tomato),
        Order("Potato", "Digapahandi", 20, R.drawable.potato),
        Order("Carrot", "Kukudakhandi", 15, R.drawable.carrot)
    )

    Scaffold(modifier = Modifier.fillMaxSize()) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background Image
            Image(
                painter = painterResource(id = R.drawable.img_10), // Replace with your background image
                contentDescription = "Background Image",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.FillHeight
            )

            // Content Overlay
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Orders",
                    modifier = Modifier.padding(16.dp),
                    color = Color.White // Ensures text is visible over the background
                )
                Spacer(modifier = Modifier.height(32.dp))

                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(orders.size) { index ->
                        OrderItem(order = orders[index], navController = navController)
                    }
                }
            }
        }
    }
}

@Composable
fun OrderItem(order: Order, navController: NavController) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(modifier = Modifier.padding(20.dp)) {
            // Product Image
            Image(
                painter = painterResource(id = order.productImage),
                contentDescription = "Product Image",
                modifier = Modifier.size(50.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))

            // Product Details
            Column(modifier = Modifier.weight(1f)) {
                Text(text = order.productName)
                Text(text = "Location: ${order.location}")
                Text(text = "Quantity: ${order.quantity}kg") // Added 'kg' to quantity
            }

            // View Details Button
            Button(onClick = { navController.navigate("order_detail/${order.productName}") }) {
                Text("View Details")
            }
        }
    }
}
