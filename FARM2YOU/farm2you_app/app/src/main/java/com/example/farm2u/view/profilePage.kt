package com.example.farm2u.view

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import coil3.compose.rememberAsyncImagePainter
import com.example.farm2u.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(navController: NavController) {
    var profileImageUri by remember { mutableStateOf<Uri?>(null) }
    var farmerName by remember { mutableStateOf("John Doe") }
    var phoneNumber by remember { mutableStateOf("+91 9876543210") }
    var location by remember { mutableStateOf("Pune, India") }
    var preferredCrops by remember { mutableStateOf("Wheat, Rice") }
    var showEditDialog by remember { mutableStateOf(false) }

    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? -> profileImageUri = uri }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = { Text("Profile", fontSize = 22.sp, fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier.size(150.dp),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    painter = profileImageUri?.let { rememberAsyncImagePainter(it) }
                        ?: painterResource(R.drawable.farmer),
                    contentDescription = "Profile Picture",
                    modifier = Modifier
                        .size(120.dp)
                        .clip(CircleShape)
                        .border(3.dp, Color.Gray, CircleShape)
                        .background(Color.LightGray)
                        .clickable { imagePickerLauncher.launch("image/*") },
                    contentScale = ContentScale.Crop
                )
            }

            Text("Farmer Name: $farmerName", fontSize = 18.sp, fontWeight = FontWeight.Medium)
            Text("Phone: $phoneNumber", fontSize = 18.sp, fontWeight = FontWeight.Medium)
            Text("Location: $location", fontSize = 18.sp, fontWeight = FontWeight.Medium)
            Text("Preferred Crops: $preferredCrops", fontSize = 18.sp, fontWeight = FontWeight.Medium)

            Button(
                onClick = { showEditDialog = true },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                shape = MaterialTheme.shapes.large
            ) {
                Text("Edit Profile", fontSize = 18.sp, fontWeight = FontWeight.Bold)
            }
        }
    }

    if (showEditDialog) {
        EditProfileDialog(
            currentName = farmerName,
            currentPhone = phoneNumber,
            currentLocation = location,
            currentCrops = preferredCrops,
            onDismiss = { showEditDialog = false },
            onSave = { name, phone, loc, crops ->
                farmerName = name
                phoneNumber = phone
                location = loc
                preferredCrops = crops
                showEditDialog = false
            }
        )
    }
}

@Composable
fun EditProfileDialog(
    currentName: String,
    currentPhone: String,
    currentLocation: String,
    currentCrops: String,
    onDismiss: () -> Unit,
    onSave: (String, String, String, String) -> Unit
) {
    var name by remember { mutableStateOf(currentName) }
    var phone by remember { mutableStateOf(currentPhone) }
    var location by remember { mutableStateOf(currentLocation) }
    var crops by remember { mutableStateOf(currentCrops) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Edit Profile", fontSize = 20.sp, fontWeight = FontWeight.Bold) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Farmer Name") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = phone,
                    onValueChange = { phone = it },
                    label = { Text("Phone Number") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = location,
                    onValueChange = { location = it },
                    label = { Text("Location") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = crops,
                    onValueChange = { crops = it },
                    label = { Text("Preferred Crops") },
                    singleLine = true
                )
            }
        },
        confirmButton = {
            Button(onClick = { onSave(name, phone, location, crops) }) {
                Text("Save")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Preview(showBackground = true)
@Composable
fun Preview() {
    ProfileScreen(navController = rememberNavController())
}