// File: HomeScreen.kt
package com.silicon.bibliotheca

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import androidx.navigation.NavHostController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavHostController) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val coroutineScope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(text = "User: John Doe", fontWeight = FontWeight.Bold)
                Text(text = "Email: johndoe@example.com")
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { /* Handle Logout */ }) {
                    Text("Logout")
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text(
                            text = "Bibliotheca Library",
                            modifier = Modifier.fillMaxWidth(),
                            textAlign = TextAlign.Center
                        )
                    },
                    navigationIcon = {
                        IconButton(onClick = {
                            coroutineScope.launch {
                                drawerState.open()
                            }
                        }) {
                            Icon(Icons.Default.Menu, contentDescription = "Menu")
                        }
                    },
                    actions = {
                        IconButton(onClick = { /* Handle Notifications if needed */ }) {
                            Icon(Icons.Default.Notifications, contentDescription = "Notifications")
                        }
                    },
                    colors = TopAppBarDefaults.mediumTopAppBarColors(containerColor = Color(0xFF1A237E))
                )
            }
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(Color(0xFF1A237E), Color(0xFFD1C4E9))
                        )
                    )
                    .padding(paddingValues),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Book Issue Navigation Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .background(Color(0xFF6A1B9A), shape = RoundedCornerShape(12.dp))
                        .clickable { navController.navigate("book_issue") },
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = "Book Issue", color = Color.White, fontSize = 18.sp)
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Discussion Room (Check Room) Navigation Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .background(Color(0xFF1976D2), shape = RoundedCornerShape(12.dp))
                        .clickable { navController.navigate("check_room") },
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = "Room Availability", color = Color.White, fontSize = 18.sp)
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Pending Returns Navigation Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .background(Color(0xFFD32F2F), shape = RoundedCornerShape(12.dp))
                        .clickable { navController.navigate("notify") },
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = "Pending Returns", color = Color.White, fontSize = 18.sp)
                }
            }
        }
    }
}
