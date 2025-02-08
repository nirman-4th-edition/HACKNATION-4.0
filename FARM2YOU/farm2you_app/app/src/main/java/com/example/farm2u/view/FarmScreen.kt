package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.font.FontWeight
import androidx.navigation.NavHostController
import com.example.farm2u.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Farm(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Farm Management") },
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
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Background Image
            Image(
                painter = painterResource(id = R.drawable.img_3), // Use your background image here
                contentDescription = "Background Image",
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Scrollable Product List
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 8.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item { ProductStatusBox("Tomatoes", "200 kg", R.drawable.tomato) }
                item { ProductStatusBox("Potatoes", "500 kg", R.drawable.potato) }
                item { ProductStatusBox("Carrots", "300 kg", R.drawable.carrot) }
            }
        }
    }
}

@Composable
fun ProductStatusBox(productName: String, quantity: String, imageRes: Int) {
    var shelfLife by remember { mutableStateOf("") }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp), // Slight reduction in padding
        colors = CardDefaults.cardColors(containerColor = Color(0x80000000)), // Semi-transparent background
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Product Image in Square Format
            Box(
                modifier = Modifier
                    .size(150.dp) // Fixed size for square image
                    .clip(RoundedCornerShape(8.dp))
            ) {
                Image(
                    painter = painterResource(id = imageRes),
                    contentDescription = "Product Image",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            }

            // Product Details
            Text(
                text = "🛒 Product: $productName",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
            Text(
                text = "📦 Quantity: $quantity",
                fontSize = 18.sp,
                color = Color.White
            )

            // Shelf Life Input
            OutlinedTextField(
                value = shelfLife,
                onValueChange = { shelfLife = it },
                label = { Text("Shelf Life (days)") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            Button(
                onClick = { /* Logic to set shelf life */ },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Set Shelf Life")
            }
        }
    }
}
