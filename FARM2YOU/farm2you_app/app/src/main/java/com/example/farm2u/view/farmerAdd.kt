package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.model.Product

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun FarmerAdd(navController: NavController) {
    // Sample data for the list
    val products = listOf(
        Product(R.drawable.tomato, "Tomatoes", "₹50/kg", "Available: 100 kg"),
        Product(R.drawable.potato, "Potatoes", "₹40/kg", "Available: 200 kg"),
        Product(R.drawable.carrot, "Carrots", "₹60/kg", "Available: 80 kg"),
    )

    // Scaffold with background image
    Scaffold(

        modifier = Modifier.fillMaxSize()
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background Image
            Image(
                painter = painterResource(id = R.drawable.img_10), // Add your placeholder image here
                contentDescription = "Background Image",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // Content over the background
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 100.dp, start = 10.dp, end = 10.dp),
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.Top
            ) {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.Start,
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(products.size) { index ->
                        ProductCard(product = products[index])
                    }
                }
            }
        }
    }
}

@Composable
fun ProductCard(product: Product) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(8.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.9f))
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Start
        ) {
            Image(
                painter = painterResource(id = product.imageRes),
                contentDescription = "Product Image",
                modifier = Modifier
                    .size(64.dp)
                    .padding(end = 16.dp),
                contentScale = ContentScale.Crop
            )
            Column(
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.Start
            ) {
                Text(
                    text = product.name,
                    style = MaterialTheme.typography.titleMedium.copy(fontSize = 18.sp),
                    color = Color.Black
                )
                Text(
                    text = product.pricePerKg,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.Gray
                )
                Text(
                    text = product.quantity,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.Gray
                )
            }
        }
    }
}
