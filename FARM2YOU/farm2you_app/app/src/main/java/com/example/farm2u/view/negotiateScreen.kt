package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun Negotiate(navController: NavController) {
    val customers = listOf("Customer A", "Customer B", "Customer C")

    Scaffold(
        modifier = Modifier.fillMaxSize()
            .padding(top = 100.dp, start = 10.dp, end = 10.dp, bottom = 15.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(text = "Customers", style = MaterialTheme.typography.headlineSmall)
            Spacer(modifier = Modifier.height(16.dp))
            customers.forEach { customer ->
                Button(
                    onClick = { navController.navigate("chat/$customer") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(text = customer)
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}
//fssai