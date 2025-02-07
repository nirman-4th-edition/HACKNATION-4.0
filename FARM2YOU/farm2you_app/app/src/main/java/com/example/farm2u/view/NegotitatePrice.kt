package com.example.farm2u.view

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun NegotiatePriceScreen(navController: NavController) {
    var offerPrice by remember { mutableStateOf("") }  // User input for offer price
    val contractDetails = "Tomato, 10 kg, 400 per kg, rs (Initial Price)" // Mock contract details
    val counterOffer = "340" // Mock counter offer value

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Title
        Text(
            text = "Negotiate Price",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Contract Details Section
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF7F7F7))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Contract Details", style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(8.dp))
                Text(contractDetails, style = MaterialTheme.typography.bodyMedium)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Offer Price Input
        OutlinedTextField(
            value = offerPrice,
            onValueChange = { offerPrice = it },
            label = { Text("Enter Your Offer Price") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Counter Offer Display
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF7F7F7))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Counter Offer", style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(8.dp))
                Text("The seller has countered with $$counterOffer", style = MaterialTheme.typography.bodyMedium)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Accept/Reject Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(onClick = { /* Handle Accept Action */ }) {
                Text("Accept")
            }
            Button(onClick = { /* Handle Reject Action */ }) {
                Text("Reject")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Negotiation History (Placeholder for future use)
        Text(
            text = "Negotiation History (Placeholder)",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(top = 16.dp)
        )

        // Placeholder for negotiation messages
        Card(
            modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFF0F0F0))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Farmer: Initial offer was 400 for 100 kg tomato", style = MaterialTheme.typography.bodyMedium)
                Spacer(modifier = Modifier.height(8.dp))
                Text("You: Your offer was 340 for 100 kg tomato", style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}
