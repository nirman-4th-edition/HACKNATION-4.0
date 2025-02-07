package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.farm2u.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Favourites(navController: NavController) {
    // Sample farmer list
    val farmers = listOf(
        Triple("Ramesh", "Experienced organic farmer from Texas", "Sold 500g of wheat"),
        Triple("Suresh", "Specialist in rice and maize farming", "Supplied 1kg of maize"),
        Triple("Mahesh", "Expert in organic vegetable farming", "Supplied 3kg of fresh veggies"),
        Triple("Khuresh", "Experienced organic farmer from Texas", "Sold 5kg of wheat"),
        Triple("Syama", "Specialist in rice and maize farming", "Supplied 1kg of maize"),
        Triple("Rahul", "Expert in organic vegetable farming", "Supplied 3kg of fresh veggies"),
        Triple("Debadatta", "Experienced organic farmer from Texas", "Sold 5kg of wheat"),
        Triple("Rabi", "Specialist in rice and maize farming", "Supplied 1kg of maize"),
        Triple("Mahi", "Expert in organic vegetable farming", "Supplied 3kg of fresh veggies")
    )

    Box(modifier = Modifier.fillMaxSize()) {
        // Background image
        Image(
            painter = painterResource(id = R.drawable.img_3), // Replace with your actual background image resource
            contentDescription = "Background Image",
            modifier = Modifier
                .fillMaxSize()
                .align(Alignment.Center) // Ensure the background image fills the entire screen
        )

        // Main content over the background
        Column(modifier = Modifier.fillMaxSize()) {
            // Top Navbar
            TopAppBar(
                title = { Text(text = "Favourites") },

            )

            // LazyColumn to make the content scrollable
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp, vertical = 8.dp)

            ) {
                item {
                    // Search bar
                    TextField(
                        value = "",
                        onValueChange = {},
                        modifier = Modifier.fillMaxWidth(),
                        placeholder = { Text(text = "Search farmers...") },
                        colors = TextFieldDefaults.textFieldColors(containerColor = Color.White)
                    )
                    Spacer(modifier = Modifier.height(16.dp))  // Spacer for better UI
                }

                // Display farmers
                items(farmers) { (name, description, previousDeals) ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 10.dp)
                            .clickable {
                                navController.navigate("farmer_details/$name/$description/$previousDeals")
                            },
                        shape = RoundedCornerShape(12.dp),
                        elevation = CardDefaults.cardElevation(6.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White)
                    ) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            Image(
                                painter = painterResource(id = R.drawable.farmer), // Replace with actual farmer image
                                contentDescription = "Farmer Image",
                                modifier = Modifier
                                    .size(80.dp)
                                    .clip(RoundedCornerShape(8.dp))
                            )

                            Column {
                                Text(text = name, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.Black)
                                Text(text = description, fontSize = 14.sp, color = Color.Gray)
                            }
                        }
                    }
                }
            }
        }
    }
}
