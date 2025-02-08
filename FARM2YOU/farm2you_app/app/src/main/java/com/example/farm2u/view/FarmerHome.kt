package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.model.GridItem
import com.example.farm2u.navigation.Screens
import com.example.farm2u.viewModel.FarmerHomeViewModel

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun FarmerHome(navController: NavController, viewModel: FarmerHomeViewModel = viewModel()) {
    val temperature by viewModel.temperature.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState() // Collect loading state

    Box(modifier = Modifier.fillMaxSize()) {
        // Background Image (fixed behind everything)
        Image(
            painter = painterResource(id = R.drawable.img_3), // Replace with your background image
            contentDescription = "Background Image",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )

        // Scaffold for content on top of background
        Scaffold(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 20.dp, start = 10.dp, end = 10.dp, bottom = 15.dp),
            containerColor = Color.Transparent // Set transparent background so the background image is visible
        ) {
            // LazyColumn to allow scrolling
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(8.dp),
                verticalArrangement = Arrangement.Top,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Header Section
                item {
                    Text(
                        text = "Farm2U",
                        fontSize = 30.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(bottom = 12.dp)
                    )
                }

                // Cloud Image Section (Displayed properly below header)
                item {
                    Image(
                        painter = painterResource(R.drawable.img_8), // Replace with your cloud image
                        contentDescription = "Weather",
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(250.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .padding(bottom = 8.dp) // Space between cloud and other content
                    )
                    HorizontalDivider(
                        color = Color.White,
                        thickness = 1.dp,
                        modifier = Modifier.padding(10.dp)
                    )
                }

                // Display temperature or loading indicator
                item {
                    if (isLoading) {
                        // Show loading indicator while the API call is in progress
                        CircularProgressIndicator(modifier = Modifier.padding(16.dp))
                    } else {
                        // Show the temperature after it's loaded
                        Text(
                            text = "Temperature: $temperature°C",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.Black
                        )
                    }
                }

                // Grid Section
                item {
                    GridScreen(navController = navController)
                }
            }
        }
    }
}

@Composable
fun GridScreen(viewModel: FarmerHomeViewModel = viewModel(), navController: NavController) {
    val items = viewModel.gridItems

    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.height(600.dp) // Fixed height for scrolling
    ) {
        items(items) { item ->
            GridCell(item, navController)
        }
    }
}

@Composable
fun GridCell(item: GridItem, navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)
                .clickable {
                    when (item.id) {
                        1 -> navController.navigate(Screens.Farm.route)
                        2 -> navController.navigate(Screens.History.route)
                        3 -> navController.navigate(Screens.Inventory.route)
                        4 -> navController.navigate(Screens.Crop.route)
                    }
                },
            shape = RoundedCornerShape(12.dp),
            elevation = CardDefaults.cardElevation(8.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Image(
                    painter = painterResource(id = item.imageRes),
                    contentDescription = item.name,
                    modifier = Modifier
                        .size(100.dp)
                        .padding(8.dp),
                    contentScale = ContentScale.Crop
                )
                Text(
                    text = item.name,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black
                )
            }
        }

        Text(
            text = when (item.id) {
                1 -> "Manage and monitor your farm details."
                2 -> "View your activity history."
                3 -> "Update your inventory."
                4 -> "Check and Crop Details."
                else -> "Explore more options."
            },
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier
                .padding(top = 8.dp)
                .fillMaxWidth(),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
    }
}
