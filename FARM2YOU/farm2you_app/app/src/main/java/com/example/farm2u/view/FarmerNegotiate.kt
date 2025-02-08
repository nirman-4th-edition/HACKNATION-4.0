package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun FarmerNegotiate(navController: NavController) {
    // Sample negotiation offers
    val buyerOffers = listOf(
        NegotiationOffer("Buyer A", "Tomatoes", 50, 45),
        NegotiationOffer("Buyer B", "Potatoes", 70, 65),
        NegotiationOffer("Buyer C", "Carrots", 30, 28)
    )

    // State for Dialog Management
    var selectedOffer by remember { mutableStateOf<NegotiationOffer?>(null) }
    var showAcceptDialog by remember { mutableStateOf(false) }
    var showRejectDialog by remember { mutableStateOf(false) }

    Scaffold(
        modifier = Modifier
            .fillMaxSize()
            .padding(10.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Text(
                text = "Negotiation Offers for Farmer",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(60.dp))

            // Making the Negotiation Cards Scrollable
            LazyColumn(
                modifier = Modifier.fillMaxSize()
            ) {
                items(buyerOffers) { offer ->
                    NegotiationCard(
                        offer = offer,
                        onAccept = {
                            selectedOffer = offer
                            showAcceptDialog = true
                        },
                        onReject = {
                            selectedOffer = offer
                            showRejectDialog = true
                        }
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                }
            }
        }
    }

    // Accept Confirmation Dialog
    if (showAcceptDialog && selectedOffer != null) {
        ConfirmationDialog(
            title = "Accept Offer",
            message = "Are you sure you want to accept the offer from ${selectedOffer!!.buyerName} for ₹${selectedOffer!!.offeredPrice} per Kg?",
            onConfirm = {
                showAcceptDialog = false
                println("Accepted offer from ${selectedOffer!!.buyerName}")
            },
            onDismiss = {
                showAcceptDialog = false
            }
        )
    }

    // Reject Confirmation Dialog
    if (showRejectDialog && selectedOffer != null) {
        ConfirmationDialog(
            title = "Reject Offer",
            message = "Are you sure you want to reject the offer from ${selectedOffer!!.buyerName}?",
            onConfirm = {
                showRejectDialog = false
                println("Rejected offer from ${selectedOffer!!.buyerName}")
            },
            onDismiss = {
                showRejectDialog = false
            }
        )
    }
}

// Data Class for Offers
data class NegotiationOffer(
    val buyerName: String,
    val productName: String,
    val requestedQuantity: Int,
    val offeredPrice: Int
)

// Negotiation Card Composable
@Composable
fun NegotiationCard(
    offer: NegotiationOffer,
    onAccept: () -> Unit,
    onReject: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White)
            .padding(4.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
        ) {
            Text(
                text = "${offer.buyerName} - ${offer.productName}",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Requested Quantity: ${offer.requestedQuantity} Kg",
                fontSize = 14.sp
            )
            Text(
                text = "Offered Price: ₹${offer.offeredPrice} per Kg",
                fontSize = 14.sp
            )
            Spacer(modifier = Modifier.height(12.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Button(
                    onClick = onAccept,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                ) {
                    Text("Accept")
                }
                Button(
                    onClick = onReject,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF44336))
                ) {
                    Text("Reject")
                }
            }
        }
    }
}

// Confirmation Dialog
@Composable
fun ConfirmationDialog(
    title: String,
    message: String,
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = title,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp
            )
        },
        text = {
            Text(
                text = message,
                fontSize = 14.sp
            )
        },
        confirmButton = {
            Button(
                onClick = onConfirm,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
            ) {
                Text("Confirm")
            }
        },
        dismissButton = {
            Button(
                onClick = onDismiss,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF44336))
            ) {
                Text("Cancel")
            }
        }
    )
}
