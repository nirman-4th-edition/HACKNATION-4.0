package com.example.farm2u.view



import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CropDetailScreen(navController: NavHostController, cropName: String) {
    // Find the crop data from the list based on cropName
    val crop = cropData.find { it.cropName == cropName }

    crop?.let {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Crop Details") },
                    navigationIcon = {
                        IconButton(onClick = { navController.popBackStack() }) {
                            Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                        }
                    }
                )
            }
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .padding(16.dp)
            ) {
                Text(
                    text = "Crop: ${it.cropName}",
                    style = MaterialTheme.typography.headlineMedium
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Harvested Quantity: ${it.harvestedQuantity} KG",
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    text = "Market Demand: ${it.marketDemand} KG",
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    text = "Price per KG: ₹${it.pricePerKg}",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }
    }
}
