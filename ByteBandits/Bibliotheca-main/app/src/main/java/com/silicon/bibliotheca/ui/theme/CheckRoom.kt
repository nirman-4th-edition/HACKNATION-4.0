// File: CheckRoom.kt
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
fun CheckRoomScreen(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Room Availability", color = Color.White) },
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
            Text(text = "Available Discussion Rooms:", fontSize = 20.sp)
            Spacer(modifier = Modifier.height(16.dp))
            // Sample room items
            RoomItem(roomName = "Room 101", available = true)
            RoomItem(roomName = "Room 102", available = false)
        }
    }
}

@Composable
fun RoomItem(roomName: String, available: Boolean) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = roomName, fontSize = 16.sp)
            Text(
                text = if (available) "Available" else "Occupied",
                fontSize = 14.sp,
                color = if (available) Color(0xFF388E3C) else Color(0xFFD32F2F)
            )
        }
    }
}
