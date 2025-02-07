package com.silicon.bibliotheca

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavHostController

@Composable
fun LoginScreen(navController: NavHostController) {
    Scaffold(
        modifier = Modifier.fillMaxSize()
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF1A237E), //  Midnight Blue
                            Color(0xFFD1C4E9)  // Lavender Gradient
                        )
                    )
                )
                .padding(paddingValues)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Logo
                Icon(
                    painter = painterResource(id = R.drawable.quiblib_logo),
                    contentDescription = "Library Logo",
                    modifier = Modifier.size(80.dp),
                    tint = Color.White
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Heading
                Text(
                    text = "Welcome to the Library Queuing System",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(32.dp))

                // ID Input
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Enter Your ID") },
                    placeholder = { Text("Faculty ID/Student Roll Number") },
                    leadingIcon = {
                        Icon(Icons.Default.Person, contentDescription = "User Icon")
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.White, shape = RoundedCornerShape(8.dp))
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Password Input
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Password") },
                    placeholder = { Text("Enter Password") },
                    leadingIcon = {
                        Icon(Icons.Default.Lock, contentDescription = "password")
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.White, shape = RoundedCornerShape(8.dp))
                )

                Spacer(modifier = Modifier.height(16.dp))
                // Forget Password Text
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable {
                            navController.navigate("forgot_password") // Navigate to ForgotPasswordScreen
                        },
                    horizontalArrangement = Arrangement.End
                ) {
                    Text(
                        text = "Forget ",
                        color = Color(0xFF283593), // Midnight Blue
                        fontSize = 14.sp
                    )
                    Text(
                        text = "Password?",
                        color = Color(0xFF6A1B9A), //Purple
                        fontSize = 14.sp,
                        textDecoration = TextDecoration.Underline
                    )
                }


                Spacer(modifier = Modifier.height(48.dp))

                // Log-In Button
                Button(
                    onClick = { navController.navigate("home") },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF283593) //Midnight Blue
                    ),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = "Log In",
                        color = Color.White,
                        fontSize = 16.sp
                    )
                }


                Spacer(modifier = Modifier.height(16.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "Do not have an account? ",
                        color = Color(0xFF283593), //Midnight Blue
                        fontSize = 14.sp
                    )
                    Text(
                        text = "Signup",
                        color = Color(0xFF6A1B9A), //Purple
                        fontSize = 14.sp,
                        textDecoration = TextDecoration.Underline,
                        modifier = Modifier.clickable {
                            navController.navigate("signup")
                        }
                    )
                }

                Spacer(modifier = Modifier.height(40.dp))

                // Footer Text
                Text(
                    text = "Empowering knowledge, one click at a time!",
                    fontStyle = FontStyle.Italic,
                    color = Color(0xFF283593),
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SignupScreen(navController: NavHostController) {
    Scaffold(
        modifier = Modifier.fillMaxSize()
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF1A237E), //  Midnight Blue
                            Color(0xFFD1C4E9)  // Lavender Gradient
                        )
                    )
                )
                .padding(paddingValues)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Icon
                Icon(
                    painter = painterResource(id = R.drawable.quiblib_logo),
                    contentDescription = "Library Logo",
                    modifier = Modifier.size(80.dp),
                    tint = Color.White
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Heading
                Text(
                    text = "Sign Up for the Library Queuing System",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(32.dp))

                // Profession Dropdown
                var expandedProfession by remember { mutableStateOf(false) }
                var profession by remember { mutableStateOf("") }

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .wrapContentSize(Alignment.TopStart)
                ) {
                    OutlinedTextField(
                        value = profession,
                        onValueChange = {},
                        label = { Text("Select Your Profession") },
                        readOnly = true,
                        trailingIcon = {
                            Icon(
                                imageVector = Icons.Default.ArrowDropDown,
                                contentDescription = null,
                                modifier = Modifier.clickable { expandedProfession = !expandedProfession }
                            )
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { expandedProfession = true }
                    )

                    DropdownMenu(
                        expanded = expandedProfession,
                        onDismissRequest = { expandedProfession = false },
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color(0xFFF3E5F5)) // Light Lavender
                    ) {
                        listOf("Faculty", "Student").forEach { item ->
                            DropdownMenuItem(
                                onClick = {
                                    profession = item
                                    expandedProfession = false
                                },
                                text = { Text(text = item) }
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // ID Input Field
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Enter Your ID") },
                    placeholder = { Text("Faculty ID/Student Roll Number") },
                    leadingIcon = {
                        Icon(Icons.Default.Person, contentDescription = "User Icon")
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        containerColor = Color.White,
                        unfocusedBorderColor = Color.Gray,
                        focusedBorderColor = Color.White
                    )
                )

                Spacer(modifier = Modifier.height(16.dp))

                // College/Institute Dropdown
                var expandedCollege by remember { mutableStateOf(false) }
                var college by remember { mutableStateOf("") }

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .wrapContentSize(Alignment.TopStart)
                ) {
                    OutlinedTextField(
                        value = college,
                        onValueChange = {},
                        label = { Text("Select Your College/Institute") },
                        readOnly = true,
                        trailingIcon = {
                            Icon(
                                imageVector = Icons.Default.ArrowDropDown,
                                contentDescription = null,
                                modifier = Modifier.clickable { expandedCollege = !expandedCollege }
                            )
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { expandedCollege = true }
                    )

                    DropdownMenu(
                        expanded = expandedCollege,
                        onDismissRequest = { expandedCollege = false },
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color(0xFFF3E5F5)) // Light Lavender
                    ) {
                        listOf(
                            "Silicon University, Bhubaneswar",
                            "Silicon Institute of Technology, Sambalpur",
                            "Trident Academy of Technology, Bhubaneswar"
                        ).forEach { item ->
                            DropdownMenuItem(
                                onClick = {
                                    college = item
                                    expandedCollege = false
                                },
                                text = { Text(text = item) }
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Default Password Input Field
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("Enter Default Password") },
                    placeholder = { Text("Password") },
                    leadingIcon = {
                        Icon(Icons.Default.Lock, contentDescription = "Password Icon")
                    },
                    visualTransformation = PasswordVisualTransformation(),
                    modifier = Modifier.fillMaxWidth(),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        containerColor = Color.White,
                        unfocusedBorderColor = Color.Gray,
                        focusedBorderColor = Color.White
                    )
                )

                Spacer(modifier = Modifier.height(32.dp))

                // Sign-Up Button
                Button(
                    onClick = { navController.navigate("login") },// Navigate to Login screen
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF283593) //Midnight Blue
                    ),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = "Sign Up",
                        color = Color.White,
                        fontSize = 16.sp
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Footer Text
                Text(
                    text = "Empowering knowledge, one click at a time!",
                    fontStyle = FontStyle.Italic,
                    color = Color(0xFF283593),//Purple
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Composable
fun ForgotPasswordScreen(navController: NavHostController) {}
