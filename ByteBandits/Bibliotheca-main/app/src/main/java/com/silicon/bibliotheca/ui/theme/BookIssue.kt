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
fun BookIssueScreen(navController: NavHostController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Book Issue", color = Color.White) },
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
            Text(text = "Select a Book to Issue:", fontSize = 20.sp, color = Color.Black)
            Spacer(modifier = Modifier.height(16.dp))
            // Sample book items (replace with dynamic data as needed)
            BookItem(title = "Effective Java", shelfLocation = "Shelf C2")
            BookItem(title = "Clean Code", shelfLocation = "Shelf C3")
        }
    }
}

@Composable
fun BookItem(title: String, shelfLocation: String) {
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
            Text(text = title, fontSize = 16.sp)
            Text(text = shelfLocation, fontSize = 14.sp, color = Color.Gray)
        }
    }
}
