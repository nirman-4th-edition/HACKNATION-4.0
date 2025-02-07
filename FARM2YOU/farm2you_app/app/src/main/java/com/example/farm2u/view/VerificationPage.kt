package com.example.farm2u.view

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat
import androidx.navigation.NavHostController
import com.example.farm2u.R
import com.example.farm2u.navigation.Screens
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun <T> VerificationPage(navController: NavHostController) {
    val pdfUri = remember { mutableStateOf<Uri?>(null) }
    val isUploading = remember { mutableStateOf(false) }
    val isVerified = remember { mutableStateOf(false) }

    val context = LocalContext.current
    val locationPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            FarmerHome(navController, context)
        } else {
            Toast.makeText(
                context,
                "Location permission is required to proceed.",
                Toast.LENGTH_SHORT
            ).show()
        }
    }

    // File picker for PDF
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? -> pdfUri.value = uri }

    // Background with Placeholder
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        // Background Image with Placeholder
        Image(
            painter = painterResource(id = R.drawable.img_6),
            contentDescription = "Background Placeholder",
            contentScale = ContentScale.FillHeight,
            modifier = Modifier
                .fillMaxSize()
                .background(Color.LightGray) // Placeholder color if image fails
        )

        // Main Content Layer
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Image(
                painter = painterResource(id = R.drawable.no_bg_logo_2),
                contentDescription = "Logo",
                modifier = Modifier.size(180.dp).padding(bottom = 15.dp),
                contentScale = ContentScale.FillHeight
            )

            if (!isVerified.value) {
                Text(
                    "Upload Authorization Certificate",
                    fontSize = 20.sp,
                    color = Color.White
                )
                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = { launcher.launch("application/pdf") },
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text("Choose File")
                }

                pdfUri.value?.let {
                    Text(
                        text = "Selected File: ${it.lastPathSegment}",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        modifier = Modifier.padding(8.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = {
                        if (pdfUri.value != null) {
                            isUploading.value = true
                            simulateVerification {
                                isUploading.value = false
                                isVerified.value = true
                            }
                        }
                    },
                    enabled = pdfUri.value != null && !isUploading.value
                ) {
                    Text("Submit for Verification")
                }

                if (isUploading.value) {
                    CircularProgressIndicator(modifier = Modifier.padding(16.dp))
                }
            } else {
                Image(
                    painter = painterResource(id = R.drawable.check_mark2),
                    contentDescription = "Verified",
                    modifier = Modifier.size(100.dp)
                )
                Text(
                    "Verified Successfully",
                    fontSize = 20.sp,
                    modifier = Modifier.padding(16.dp),
                    color = Color.Green
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = {
                        locationPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
                        navController.navigate(Screens.FarmerScaffold.route)
                    }
                ) {
                    Text("Proceed")
                }
            }
        }
    }
}

fun FarmerHome(navController: NavHostController, context: Context) {
    val fusedLocationClient: FusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(context)

    // Check if location permission is granted before accessing location
    if (ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED) {

        // If permissions are not granted, request permissions
        ActivityCompat.requestPermissions(
            context as Activity,
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
            1
        )
        return
    }

    // Fetch the last known location
    fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
        if (location != null) {
            // If location is available, navigate to the homepage
            navController.navigate(Screens.FarmerScaffold.route)
        } else {
            // If location is not available, show a message to enable location
            Toast.makeText(context, "Please enable your location", Toast.LENGTH_SHORT).show()
        }
    }.addOnFailureListener {
        // Handle failure to get location
        Toast.makeText(context, "Failed to get location. Please try again.", Toast.LENGTH_SHORT).show()
    }
}

private fun simulateVerification(onComplete: () -> Unit) {
    CoroutineScope(Dispatchers.Main).launch {
        delay((2000..4000).random().toLong()) // Simulate a random delay between 2-4 seconds
        onComplete()
    }
}
