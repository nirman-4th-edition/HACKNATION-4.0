package com.example.allinone.Screens


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.allinone.AnimalDetectionViewModel
import com.example.allinone.AuthState
import com.example.allinone.AuthViewModel
import com.example.allinone.DashboardViewModel
import com.example.allinone.MotorStatusViewModel
import com.example.allinone.R
import com.example.allinone.WeatherData
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import kotlinx.coroutines.tasks.await

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(navController: NavController, authViewModel: AuthViewModel) {
    val authState by authViewModel.authState.observeAsState()
    var animalDetected by remember { mutableStateOf(false) }


    LaunchedEffect(authState) {
        if (authState is AuthState.UnAuthenticated) {
            navController.navigate("login") {
                popUpTo("DashBoard") { inclusive = true }
            }
        }
    }

    Scaffold(
        topBar = {
            SmallTopAppBar(
                title = {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp)
                            .background(Color(0xFF37474F), shape = MaterialTheme.shapes.medium),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Agri-Tech",
                            color = Color.White,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(vertical = 8.dp)
                        )
                    }
                },
                navigationIcon = {
                    Icon(
                        imageVector = Icons.Default.Person,
                        contentDescription = "User Icon",
                        tint = Color.White,
                        modifier = Modifier.size(32.dp)
                    )
                },
                actions = {
                    Button(
                        onClick = {
                            authViewModel.logOut()
                            navController.navigate("login") {
                                popUpTo("DashBoard") { inclusive = true }
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF006400))
                    ) {
                        Text(text = "Sign Out", color = Color.White)
                    }
                },
                colors = TopAppBarDefaults.smallTopAppBarColors(containerColor = Color(0xFF263238))
            )
        },
        content = { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .background(Color(0xFF121212)),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Add Scrollable content using LazyColumn
                LazyColumn(modifier = Modifier.fillMaxHeight()) {
                    item {
                        FieldDataSection(dashboardViewModel = DashboardViewModel())
                    }
                    item {
                        SoilCombinationSection()
                    }
                    item {
                        AnimalDetectionBuzzer()
                    }
                    item {
                        MotorStatusCard()
                    }
                }
            }
        }
    )
}

@Composable
fun FieldDataSection(dashboardViewModel: DashboardViewModel) {
    val weatherData by dashboardViewModel.weatherData.observeAsState(WeatherData(0.0, 0, 0.0))  // Default values

    // Check if the data is fetched and ready
    Column(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxWidth()
    ) {
        Text(
            text = "Field Data",
            style = TextStyle(
                fontFamily = FontFamily.Serif,
                fontWeight = FontWeight.Bold,
                fontSize = 24.sp,
                letterSpacing = 0.sp,
                color = Color.White
            ),
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Field data card with temperature, humidity, and pressure
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF263238), shape = RoundedCornerShape(16.dp)),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(16.dp)
            ) {
                // Temperature Data
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_thermometer),
                        contentDescription = "Temperature",
                        tint = Color.Yellow,
                        modifier = Modifier.size(32.dp)
                    )
                    Text(text = "Temperature: ${weatherData.temperature}°C", color = Color.White)
                    CircularProgressBar(value = weatherData.temperature.toFloat().coerceIn(0f, 100f)) // Convert to Float
                }

                // Humidity Data
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_humidity),
                        contentDescription = "Humidity",
                        tint = Color.Cyan,
                        modifier = Modifier.size(32.dp)
                    )
                    Text(text = "Humidity: ${weatherData.humidity}%", color = Color.White)
                    CircularProgressBar(value = weatherData.humidity.toFloat().coerceIn(0f, 100f)) // Convert to Float
                }

                // Pressure Data
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_pressure),
                        contentDescription = "Pressure",
                        tint = Color.Magenta,
                        modifier = Modifier.size(32.dp)
                    )
                    Text(text = "Pressure: ${weatherData.pressure} hPa", color = Color.White)
                    CircularProgressBar(value = weatherData.pressure.toFloat().coerceIn(0f, 1200f)) // Convert to Float
                }
            }
        }
    }
}

@Composable
fun CircularProgressBar(value: Float) {
    Box(
        modifier = Modifier
            .size(60.dp)
            .background(
                color = Color.Gray.copy(alpha = 0.3f),
                shape = CircleShape
            ),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator(
            progress = value/100f,
            color = Color.Green,
            strokeWidth = 8.dp
        )
    }
}

@Composable
fun SoilCombinationSection() {
    val customH6Style = TextStyle(
        fontFamily = FontFamily.Serif,
        fontWeight = FontWeight.Bold,
        fontSize = 24.sp,
        letterSpacing = 0.sp,
        color = Color.White
    )

    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Soil Combination",
            style = customH6Style,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        SoilComponentCard(
            label = "Soil Component 1: Sand",
            progress = 60f,
            color = Color.Magenta
        )

        SoilComponentCard(
            label = "Soil Component 2: Silt",
            progress = 50f,
            color = Color.Blue
        )

        SoilComponentCard(
            label = "Soil Component 3: Clay",
            progress = 70f,
            color = Color.Red
        )

        SoilComponentCard(
            label = "Soil Component 4: Organic Content",
            progress = 60f,
            color = Color.Yellow
        )

        SoilComponentCard(
            label = "Soil Component 5: Moisture Content",
            progress = 60f,
            color = Color.White
        )
    }
}

@Composable
fun SoilComponentCard(label: String, progress: Float, color: Color) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .background(Color(0xFF263238), shape = RoundedCornerShape(16.dp)),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = label,
                    color = Color.White,
                    modifier = Modifier.weight(1f)
                )
                Column(
                    horizontalAlignment = Alignment.End
                ) {
                    LinearProgressIndicator(
                        progress = progress / 100f,
                        modifier = Modifier
                            .width(200.dp)
                            .padding(start = 8.dp),
                        color = color
                    )
                    Text(
                        text = "${progress.toInt()}%",
                        color = Color.White,
                        modifier = Modifier.padding(start = 8.dp, top = 4.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun AnimalDetectionBuzzer() {
    // Get the ViewModel instance using the viewModel() function
    val viewModel: AnimalDetectionViewModel = viewModel()

    // Observe LiveData from the ViewModel
    val animalDetected = viewModel.animalDetected.observeAsState(false).value

    // Set the buzzer color and text based on animalDetected
    val buzzerColor = if (animalDetected) Color.Red else Color.Green
    val text = if (animalDetected) "ALERT!" else "SAFE"

    // UI Layout
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Title Text for the Buzzer
        Text(
            text = "Animal Detection Buzzer",
            color = Color.White,
            style = TextStyle(
                fontFamily = FontFamily.Serif,
                fontWeight = FontWeight.Bold,
                fontSize = 24.sp
            ),
            modifier = Modifier.padding(bottom = 24.dp) // Space between title and buzzer
        )

        // Animal Detection Circle with the text inside
        Box(
            modifier = Modifier
                .size(200.dp) // Circle size
                .background(buzzerColor, shape = CircleShape) // Background color changes based on detection
                .padding(32.dp), // Padding inside the circle
            contentAlignment = Alignment.Center
        ) {
            // Display the text inside the circle
            Text(
                text = text,
                color = Color.White,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun MotorStatusCard(viewModel: MotorStatusViewModel = viewModel()) {
    val motorOn = viewModel.motorOn.observeAsState(false).value

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF06EAD3)),
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Motor Status",
                color = Color.White,
                style = TextStyle(
                    fontSize = 25.sp,
                    fontWeight = FontWeight.Bold
                ),
                modifier = Modifier.padding(bottom = 16.dp)
            )

            Text(
                text = if (motorOn) "Motor is ON" else "Motor is OFF",
                color = Color.White,
                style = TextStyle(fontSize = 20.sp),
                modifier = Modifier.padding(bottom = 16.dp)
            )

            Button(
                onClick = { viewModel.setMotorStatus(!motorOn) },
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (motorOn) Color.Red else Color.Green
                )
            ) {
                Text(
                    text = if (motorOn) "Turn OFF" else "Turn ON",
                    color = Color.White
                )
            }
        }
    }
}
