package com.example.allinone.Screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.navigation.NavController
import com.example.allinone.AuthViewModel
import com.example.allinone.R
import kotlinx.coroutines.delay

@Composable
fun SplashPage(
    navController: NavController,
    authViewModel: AuthViewModel
) {
    LaunchedEffect(Unit) {
        delay(1500)
        navController.navigate("login") {
            popUpTo("Splash") { inclusive = true }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize() // Fullscreen modifier
    ) {
        // Fullscreen splash image
        Image(
            painter = painterResource(id = R.drawable.splash),
            contentDescription = "Splash Image",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop  // Ensures the image fills the entire screen without distortion
        )

        // Centered CircularProgressIndicator on top of the image
        CircularProgressIndicator(
            modifier = Modifier.align(Alignment.Center)
        )
    }
}
