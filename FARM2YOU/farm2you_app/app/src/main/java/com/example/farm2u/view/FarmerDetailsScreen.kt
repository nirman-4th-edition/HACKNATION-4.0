package com.example.farm2u.view

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
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
fun FarmerDetailsScreen(navController: NavController, farmerName: String, description: String, previousDeals: String) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = "Farmer Details") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(painter = painterResource(id = R.drawable.back), contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->  // Use paddingValues here for Scaffold content padding
        Box(
            modifier = Modifier
                .fillMaxSize()  // Fill the entire screen with the Box
                .padding(paddingValues)  // Ensure content doesn't go under the top bar
        ) {
            // Background image - make sure it fills the entire screen
            Image(
                painter = painterResource(id = R.drawable.img_3), // Replace with your actual background image resource
                contentDescription = "Background Image",
                modifier = Modifier
                    .fillMaxSize()  // Make the image fill the entire screen
                    .align(Alignment.Center),
                contentScale = androidx.compose.ui.layout.ContentScale.Crop
            )

            // Larger square Card for all content
            Card(
                modifier = Modifier
                    .size(310.dp)  // Increased size of the square card
                    .align(Alignment.Center),
                shape = RoundedCornerShape(16.dp),
                elevation = CardDefaults.cardElevation(8.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()  // Let the column take up all available space
                        .padding(16.dp),  // Padding inside the card
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center // Centering content vertically
                ) {
                    // Farmer Image
                    Image(
                        painter = painterResource(id = R.drawable.farmer), // Replace with actual farmer image
                        contentDescription = "Farmer Image",
                        modifier = Modifier
                            .size(120.dp)  // Adjusted image size
                            .clip(RoundedCornerShape(12.dp))
                            .align(Alignment.CenterHorizontally)
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Farmer Name
                    Text(
                        text = farmerName,
                        fontSize = 18.sp,  // Font size adjusted
                        fontWeight = FontWeight.Bold,
                        color = Color.Black
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    // Description
                    Text(
                        text = description,
                        fontSize = 14.sp,  // Font size adjusted
                        color = Color.Gray
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Previous Deals Section
                    Text(
                        text = "Previous Deals",
                        fontSize = 16.sp,  // Font size adjusted
                        fontWeight = FontWeight.Bold,
                        color = Color.Black
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    // Previous Deals Text
                    Text(
                        text = previousDeals,
                        fontSize = 12.sp,  // Font size adjusted
                        color = Color.DarkGray
                    )
                }
            }
        }
    }
}
