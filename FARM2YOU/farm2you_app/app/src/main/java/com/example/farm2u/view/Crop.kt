package com.example.farm2u.view

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color

import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController

// Data class for Crop Analysis
data class CropAnalysis(
    val cropName: String,
    val harvestedQuantity: Double,
    val marketDemand: Double,
    val pricePerKg: Double
)

// Sample Crop Data
val cropData = listOf(
    CropAnalysis("Tomato", 500.0, 800.0, 50.0),
    CropAnalysis("Potato", 700.0, 600.0, 40.0),
    CropAnalysis("Carrot", 400.0, 900.0, 60.0),
    CropAnalysis("Onion", 650.0, 850.0, 35.0)
)

// Crop Screen
@OptIn(ExperimentalMaterial3Api::class)

@Composable
fun Crop(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Crop Analysis") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            androidx.compose.material.icons.Icons.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(8.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Title Section
            item {
                Text(
                    text = "Farmer's Crop Dashboard",
                    style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Bold),
                    color = Color(0xFF4CAF50),
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }

            // Overview Section
            item {
                CropOverviewSection()
            }

            // Graph Section
            item {
                Text(
                    text = "Graphical Analysis",
                    style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
                    modifier = Modifier.padding(vertical = 8.dp)
                )
                CropBarChart(cropData)
            }

            // Crop Details Section
            item {
                Text(
                    text = "Crop Details and Market Demand Analysis",
                    style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
                    modifier = Modifier.padding(vertical = 8.dp)
                )
            }

            // Product List Section
            items(cropData) { crop ->
                CropCard(crop)
            }
        }
    }
}


// Crop Overview Section
@Composable

fun CropOverviewSection() {
    val totalHarvested = cropData.sumOf { it.harvestedQuantity }
    val totalDemand = cropData.sumOf { it.marketDemand }
    val totalProfitLossPercentage = if (totalDemand != 0.0) {
        ((totalDemand - totalHarvested) / totalDemand) * 100
    } else {
        0.0
    }

    val profitLossText = if (totalProfitLossPercentage > 0) {
        "Profit: +${"%.2f".format(totalProfitLossPercentage)}%"
    } else if (totalProfitLossPercentage < 0) {
        "Loss: ${"%.2f".format(totalProfitLossPercentage)}%"
    } else {
        "No Profit, No Loss"
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = "Total Crops Harvested: ${totalHarvested} KG",
                style = MaterialTheme.typography.bodyLarge
            )
            Text(
                text = "Total Market Demand: ${totalDemand} KG",
                style = MaterialTheme.typography.bodyLarge
            )
            Text(
                text = "Average Price per KG: ₹${cropData.map { it.pricePerKg }.average()}",
                style = MaterialTheme.typography.bodyLarge
            )
            Divider(color = Color.Gray, thickness = 1.dp)
            Text(
                text = profitLossText,
                style = MaterialTheme.typography.bodyLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = if (totalProfitLossPercentage >= 0) Color(0xFF4CAF50) else Color.Red
                )
            )
        }
    }
}


// Individual Crop Card
@Composable
fun CropCard(crop: CropAnalysis) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp),
        shape = MaterialTheme.shapes.medium,
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(12.dp)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = "Crop: ${crop.cropName}",
                style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold)
            )
            Text(
                text = "Harvested Quantity: ${crop.harvestedQuantity} KG",
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "Market Demand: ${crop.marketDemand} KG",
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "Price per KG: ₹${crop.pricePerKg}",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

// Enhanced Crop Bar Chart
@Composable
fun CropBarChart(crops: List<CropAnalysis>) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(350.dp)
            .padding(4.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val barWidth = size.width / (crops.size * 3)
            val maxQuantity = crops.maxOf { maxOf(it.harvestedQuantity, it.marketDemand) }
            val yAxisStep = size.height / 5

            // Draw Axes
            drawLine(Color.Black, Offset(50f, 0f), Offset(50f, size.height - 50f), strokeWidth = 3f) // Y-Axis
            drawLine(Color.Black, Offset(50f, size.height - 50f), Offset(size.width, size.height - 50f), strokeWidth = 3f) // X-Axis

            // Y-Axis Label
            drawContext.canvas.nativeCanvas.drawText(
                "Quantities (KG)",
                10f,
                size.height / 2,
                android.graphics.Paint().apply { textSize = 30f; textAlign = android.graphics.Paint.Align.LEFT }
            )

            // X-Axis Label
            drawContext.canvas.nativeCanvas.drawText(
                "Crop Names",
                size.width / 2,
                size.height - 10f,
                android.graphics.Paint().apply { textSize = 30f; textAlign = android.graphics.Paint.Align.CENTER }
            )

            crops.forEachIndexed { index, crop ->
                val harvestedHeight = (crop.harvestedQuantity / maxQuantity) * (size.height - 100)
                val demandHeight = (crop.marketDemand / maxQuantity) * (size.height - 100)

                val startX = 60f + index * 3 * barWidth

                // Draw Harvested Bar
                drawRect(
                    color = Color(0xFF4CAF50),
                    topLeft = Offset(startX, (size.height - 50f - harvestedHeight).toFloat()),
                    size = androidx.compose.ui.geometry.Size(barWidth, harvestedHeight.toFloat())
                )
                // Draw Harvested Value Label
                drawContext.canvas.nativeCanvas.drawText(
                    "${crop.harvestedQuantity}",
                    startX + barWidth / 2,
                    (size.height - 55f - harvestedHeight).toFloat(),
                    android.graphics.Paint().apply { textSize = 24f; textAlign = android.graphics.Paint.Align.CENTER }
                )

                // Draw Demand Bar
                drawRect(
                    color = Color(0xFFFFC107),
                    topLeft = Offset(startX + barWidth,
                        (size.height - 50f - demandHeight).toFloat()
                    ),
                    size = androidx.compose.ui.geometry.Size(barWidth, demandHeight.toFloat())
                )
                // Draw Demand Value Label
                drawContext.canvas.nativeCanvas.drawText(
                    "${crop.marketDemand}",
                    startX + 1.5f * barWidth,
                    (size.height - 55f - demandHeight).toFloat(),
                    android.graphics.Paint().apply { textSize = 24f; textAlign = android.graphics.Paint.Align.CENTER }
                )

                // Draw Crop Name (X-Axis)
                drawContext.canvas.nativeCanvas.drawText(
                    crop.cropName,
                    startX + barWidth / 2,
                    size.height - 20f,
                    android.graphics.Paint().apply { textSize = 20f; textAlign = android.graphics.Paint.Align.CENTER }
                )
            }
        }

        // Legend Section
        Row(
            modifier = Modifier
                .padding(8.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(16.dp)
                        .background(Color(0xFF4CAF50))
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text("Harvested Quantity", fontSize = 14.sp)
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(16.dp)
                        .background(Color(0xFFFFC107))
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text("Market Demand", fontSize = 14.sp)
            }
        }
    }
}

