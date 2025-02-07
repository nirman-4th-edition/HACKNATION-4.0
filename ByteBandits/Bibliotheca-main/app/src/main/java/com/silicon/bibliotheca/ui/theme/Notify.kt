@file:OptIn(ExperimentalMaterial3Api::class)

package com.silicon.bibliotheca

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController

@Composable
fun NotifyScreen(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Pending Book Returns", color = Color.White) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF1A237E))
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF3E5F5))
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Text(text = "Pending Book Returns:", fontSize = 20.sp)
            Spacer(modifier = Modifier.height(16.dp))
            NotificationItem(message = "Return 'Kotlin Programming' by 2025-02-10")
            NotificationItem(message = "Return 'Jetpack Compose Essentials' by 2025-02-15")
        }
    }
}

@Composable
fun NotificationItem(message: String) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(modifier = Modifier.padding(16.dp)) {
            Text(text = message, fontSize = 16.sp)
        }
    }
}
