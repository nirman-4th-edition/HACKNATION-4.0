package com.silicon.bibliotheca

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BookIssue(navController: NavHostController) {
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("Bibliotheca", color = Color.White) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF1A237E))
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Brush.verticalGradient( // EDITED: Changed inner background to vertical gradient
                    colors = listOf(Color(0xFF1A237E), Color(0xFFD1C4E9))
                ))
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Text(
                text = "Book Issue",
                fontSize = 20.sp,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(16.dp))
            // Sample book items (replace with dynamic data as needed)
            BookItem(title = "Effective Java", shelfLocation = "Shelf C2")
            BookItem(title = "Clean Code", shelfLocation = "Shelf C3")
            BookItem(title = "Design Patterns", shelfLocation = "Shelf C4")
            BookItem(title = "Refactoring", shelfLocation = "Shelf C5")
            BookItem(title = "The Pragmatic Programmer", shelfLocation = "Shelf C6")

            Spacer(modifier = Modifier.height(300.dp))
            // Footer Text
            Text(
                text = "Empowering knowledge, one click at a time!",
                fontStyle = FontStyle.Italic,
                color = Color(0xFF283593),
                textAlign = TextAlign.Center,
                fontSize = 20.sp
            )
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