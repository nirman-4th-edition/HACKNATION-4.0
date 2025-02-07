package com.example.farm2u.view

import android.annotation.SuppressLint
import android.net.Uri
import android.provider.MediaStore
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.farm2u.R
import com.example.farm2u.viewModel.AddItemViewModel
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.isGranted
import com.google.accompanist.permissions.rememberPermissionState

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun Additems(navController: NavController, viewModel: AddItemViewModel = viewModel()) {
    val storagePermissionState =
        rememberPermissionState(android.Manifest.permission.READ_EXTERNAL_STORAGE)

    LaunchedEffect(storagePermissionState.status) {
        if (!storagePermissionState.status.isGranted) {
            storagePermissionState.launchPermissionRequest()
        }
    }

    Scaffold(
        topBar = { TopBar(navController) },
        modifier = Modifier.fillMaxSize()
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background Image Placeholder
            Image(
                painter = painterResource(id = R.drawable.img_10),
                contentDescription = "Background Image",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // Transparent Smaller Box for Input Fields
            Box(
                modifier = Modifier
                    .size(width = 350.dp, height = 520.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.5f))
                    .align(Alignment.Center)
            ) {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    item {
                        Text(
                            text = "Product Name",
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )
                        OutlinedTextField(
                            value = viewModel.name.value,
                            onValueChange = { viewModel.name.value = it },
                            label = { Text("Product Name") },
                            placeholder = { Text("E.g. Tomatoes") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    item {
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "Crop Type",
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )
                        OutlinedTextField(
                            value = viewModel.cropType.value,
                            onValueChange = { viewModel.cropType.value = it },
                            label = { Text("Crop Type") },
                            placeholder = { Text("E.g. Vegetable") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }

                    item {
                        Spacer(modifier = Modifier.height(10.dp))
                        Quantity(viewModel)
                    }

                    item {
                        Spacer(modifier = Modifier.height(10.dp))
                        ImagePicker(viewModel)
                    }

                    item {
                        Spacer(modifier = Modifier.height(20.dp))
                        Buttons(navController, viewModel)
                    }
                }
            }
        }
    }
}

// Top Bar
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopBar(navController: NavController) {
    TopAppBar(
        navigationIcon = {
            IconButton(onClick = { navController.popBackStack() }) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back"
                )
            }
        },
        title = { Text(text = "Add Item") }
    )
}

// Action Buttons
@Composable
fun Buttons(navController: NavController, viewModel: AddItemViewModel) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Button(
            modifier = Modifier
                .weight(1f)
                .padding(end = 5.dp),
            onClick = {
                viewModel.addProduct()
                navController.navigate("farmer_add")
            }
        ) {
            Text("Add Item")
        }
        Button(
            modifier = Modifier
                .weight(1f)
                .padding(start = 5.dp),
            onClick = {
                navController.popBackStack()
            }
        ) {
            Text("Cancel")
        }
    }
}

// Quantity and Price Fields
@Composable
fun Quantity(viewModel: AddItemViewModel) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column(
            modifier = Modifier
                .weight(1f)
                .padding(end = 5.dp)
        ) {
            Text("Quantity", fontWeight = FontWeight.Bold)
            OutlinedTextField(
                value = viewModel.quantity.value,
                onValueChange = { viewModel.quantity.value = it },
                label = { Text("Quantity(e.g 10Kg)") },
                placeholder = { Text("Price e.g.10 Kg") }
            )
        }

        Column(
            modifier = Modifier
                .weight(1f)
                .padding(start = 5.dp)
        ) {
            Text("Price", fontWeight = FontWeight.Bold)
            OutlinedTextField(
                value = viewModel.price.value,
                onValueChange = { viewModel.price.value = it },
                label = { Text("Price (Price per Kg)") },
                placeholder = { Text("Price e.g. 100") }
            )
        }
    }
}

// Image Picker
@Composable
fun ImagePicker(viewModel: AddItemViewModel) {
    val context = LocalContext.current
    val imagePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        viewModel.imageUri.value = uri
    }

    Button(
        onClick = { imagePickerLauncher.launch("image/*") },
        modifier = Modifier.fillMaxWidth()
    ) {
        Text("Upload Photo")
    }

    viewModel.imageUri.value?.let { uri ->
        val bitmap = MediaStore.Images.Media.getBitmap(context.contentResolver, uri)
        Image(
            bitmap = bitmap.asImageBitmap(),
            contentDescription = "Selected Image",
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
                .padding(top = 10.dp)
        )
    }
}
