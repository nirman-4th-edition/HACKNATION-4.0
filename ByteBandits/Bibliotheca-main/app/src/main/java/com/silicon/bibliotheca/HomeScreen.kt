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
import androidx.compose.ui.text.font.FontStyle
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

    // UPDATED: Drawer now shows a custom layout with an upper and lower section.
    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            Column(
                modifier = Modifier
                    .fillMaxHeight()            // Full height of the drawer
                    .fillMaxWidth(0.5f)           // Half screen width
            ) {
                // Upper part (40% height): Midnight blue background with centered Student ID text.
                Box(
                    modifier = Modifier
                        .weight(0.4f)
                        .fillMaxWidth()
                        .background(Color(0xFF1A237E)),  // Midnight Blue
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Student ID: 22BEEF71", // Replace with dynamic ID if needed
                        color = Color.White,
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )
                }
                // Lower part (60% height): Light grey background with three text fields.
                Column(
                    modifier = Modifier
                        .weight(0.6f)
                        .fillMaxWidth()
                        .background(Color.LightGray)
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    OutlinedTextField(
                        value = "Ayush Patra",
                        onValueChange = { /* Handle name change */ },
                        label = { Text("Name") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = "22BEEF71",
                        onValueChange = { /* Handle branch change */ },
                        label = { Text("SIC") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = "EEE",
                        onValueChange = { /* Handle branch change */ },
                        label = { Text("BRANCH") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = "Semester 6",
                        onValueChange = { /* Handle semester change */ },
                        label = { Text("Semester") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Column(
                        modifier = Modifier
                            .weight(0.6f)
                            .fillMaxWidth()
                            .background(Color.LightGray)
                            .padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Button(
                            onClick = { /* Handle Edit action */ },
                            modifier = Modifier.fillMaxWidth(0.7f)
                        ) {
                            Text(text = "Edit")
                        }
                        Button(
                            onClick = { navController.navigate("login")  },
                            modifier = Modifier.fillMaxWidth(0.7f)
                        ) {
                            Text(text = "Log Out")
                        }
                    }
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text(
                            text = "Bibliotheca",
                            modifier = Modifier.fillMaxWidth(),
                            textAlign = TextAlign.Center,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                    },
                    navigationIcon = {
                        IconButton(onClick = {
                            coroutineScope.launch { drawerState.open() }
                        }) {
                            Icon(Icons.Default.Menu, contentDescription = "Menu")
                        }
                    },
                    actions = {
                        IconButton(onClick = { /* Handle Notifications */ }) {
                            Icon(Icons.Default.Notifications, contentDescription = "Notifications")
                        }
                    },
                    colors = TopAppBarDefaults.mediumTopAppBarColors(
                        containerColor = Color(0xFF1A237E)
                    )
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
                // Books Card
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFF1A237E)
                    ),
                    shape = RoundedCornerShape(12.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .clickable { navController.navigate("book_issue") }
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "Books", color = Color.White, fontSize = 18.sp)
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Discussion Rooms Card
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFF1A237E)
                    ),
                    shape = RoundedCornerShape(12.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .background(Color(0xFF1976D2), shape = RoundedCornerShape(12.dp))
                        .clickable { navController.navigate("room_booking") }
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "Discussion Rooms", color = Color.White, fontSize = 18.sp)
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Notify Card
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFF1A237E)
                    ),
                    shape = RoundedCornerShape(12.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth(0.8f)
                        .height(100.dp)
                        .background(Color(0xFF1976D2), shape = RoundedCornerShape(12.dp))
                        .clickable { navController.navigate("notify") }
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "Notify", color = Color.White, fontSize = 18.sp)
                    }
                }

                Spacer(modifier = Modifier.height(220.dp))

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
}