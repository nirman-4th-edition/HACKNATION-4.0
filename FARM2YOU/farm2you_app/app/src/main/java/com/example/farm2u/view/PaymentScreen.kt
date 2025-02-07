package com.example.farm2u.view

import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.compose.ui.platform.LocalContext

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentScreen(navController: NavController, totalPrice: Double?) {
    val context = LocalContext.current // For displaying the toast
    var paymentMethod by remember { mutableStateOf<String>("") }
    var isPaymentComplete by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Payment") },
                colors = TopAppBarDefaults.mediumTopAppBarColors(containerColor = Color.White)
            )
        },
        bottomBar = {
            BottomAppBar(
                containerColor = Color.White
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.Center
                ) {
                    Button(
                        onClick = {
                            if (paymentMethod.isNotEmpty()) {
                                isPaymentComplete = true
                                // Show the toast message
                                Toast.makeText(context, "Order Confirmed!", Toast.LENGTH_SHORT).show()
                            } else {
                                Toast.makeText(context, "Please select a payment method.", Toast.LENGTH_SHORT).show()
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                    ) {
                        Text("PAY NOW")
                    }
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            // Payment Details
            Text(
                text = "Total Amount: ${totalPrice}",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "Payment Method",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))

            // Credit Card Payment Option
            Button(
                onClick = {
                    paymentMethod = "Credit Card"
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
            ) {
                Text("Pay with Credit Card")
            }
            Spacer(modifier = Modifier.height(8.dp))

            // UPI Payment Option
            Button(
                onClick = {
                    paymentMethod = "UPI"
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
            ) {
                Text("Pay with UPI")
            }
            Spacer(modifier = Modifier.height(8.dp))

            // Cash on Delivery Payment Option
            Button(
                onClick = {
                    paymentMethod = "Cash on Delivery"
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
            ) {
                Text("Cash on Delivery")
            }

            // Display Transaction Slip if Payment is Complete
            if (isPaymentComplete) {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Payment Successful!",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Green
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Transaction Slip:",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text("Total Amount: ${totalPrice}")
                Text("Payment Method: $paymentMethod")
                Text("Transaction Status: Success")
                Spacer(modifier = Modifier.height(8.dp))
                Button(
                    onClick = {
                        navController.popBackStack()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
                ) {
                    Text("Download Transaction Slip")
                }
            }
        }
    }
}
