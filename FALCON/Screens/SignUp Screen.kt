package com.example.allinone.Screens

import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.allinone.AuthState
import com.example.allinone.AuthViewModel
import com.example.allinone.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SignUpPage(
    modifier: Modifier = Modifier,
    navController: NavController,
    authViewModel: AuthViewModel
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    val authState = authViewModel.authState.observeAsState()
    val context = LocalContext.current
    // Custom h5 text style
    val h5 = TextStyle(fontSize = 32.sp, color = Color.White)

    LaunchedEffect(authState.value) {
        when (authState.value) {
            is AuthState.Authenticated -> navController.navigate("dashboard") // Replace with your desired screen route
            is AuthState.Error -> Toast.makeText(context, (authState.value as AuthState.Error).message, Toast.LENGTH_SHORT).show()
            else -> Unit
        }
    }

    Image(
        painter = painterResource(id = R.drawable.loginbackground),  // Ensure background.jpg is placed in res/drawable
        contentDescription = "Background Image",
        modifier = Modifier.fillMaxSize(),
        contentScale = ContentScale.Crop
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Background image (background.jpg)
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(text = "Sign Up", style = h5)

            Spacer(modifier = Modifier.height(20.dp))

            // Input fields with background color and no borders
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)
                    .background(Color(0xFFf5f5f5), RoundedCornerShape(12.dp))
            ) {
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text("Email") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true,
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        containerColor = Color.Transparent, // No border
                        focusedBorderColor = Color.Transparent, // No border
                        unfocusedBorderColor = Color.Transparent, // No border
                        focusedLabelColor = Color.Black, // Label color when focused
                        unfocusedLabelColor = Color.Black, // Label color when not focused
                        cursorColor = Color.Black, // Cursor color
                    )
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)
                    .background(Color(0xFFf5f5f5), RoundedCornerShape(12.dp))
            ) {
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = { Text("Password") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true,
                    visualTransformation = PasswordVisualTransformation(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        containerColor = Color.Transparent, // No border
                        focusedBorderColor = Color.Transparent, // No border
                        unfocusedBorderColor = Color.Transparent, // No border
                        focusedLabelColor = Color.Black, // Label color when focused
                        unfocusedLabelColor = Color.Black, // Label color when not focused
                        cursorColor = Color.Black, // Cursor color
                    )
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Button(
                onClick = {
                    authViewModel.signUp(email, password) { success, errorMessage ->
                        if (success) {
                            navController.navigate("login") {
                                popUpTo("SignUp") { inclusive = true }
                            }
                        } else {
                            Toast.makeText(context, errorMessage ?: "Sign-up failed", Toast.LENGTH_SHORT).show()
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFFFF9800) // Dark green button color
                ),
                contentPadding = PaddingValues(16.dp)
            ) {
                Text("Sign Up", color = Color.White)
            }

            Spacer(modifier = Modifier.height(16.dp))

            TextButton(onClick = { navController.navigate("login") }) {
                Text(text = "Have an account? Log In", style = MaterialTheme.typography.bodyLarge)
            }
        }
    }
}
