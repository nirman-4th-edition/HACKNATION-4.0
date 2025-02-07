package com.example.farm2u.view

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.farm2u.viewModel.ForgotPasswordViewModel

@Composable
fun ForgotPassword(navController: NavHostController, viewModel: ForgotPasswordViewModel = viewModel()) {
    val email = viewModel.email.collectAsState().value
    val message = viewModel.message.collectAsState().value

    Column(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Forgot Password?",
            fontSize = 24.sp,
            color = Color.Black
        )

        Spacer(modifier = Modifier.size(16.dp))
        Text(
            text = "Enter your registered email to receive a password reset link.",
            fontSize = 16.sp,
            color = Color.Gray
        )

        Spacer(modifier = Modifier.size(16.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { viewModel.onEmailChange(it) },
            label = { Text("Email Address") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.size(16.dp))

        Button(
            onClick = {
                viewModel.sendResetLink()
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = "Send Reset Link")
        }
        Spacer(modifier = Modifier.size(16.dp))
        Text(
            text = message,
            fontSize = 14.sp,
            color = if (message.startsWith("Password")) Color.Green else Color.Red
        )
        Spacer(modifier = Modifier.size(32.dp))
        Button(
            onClick = {
                viewModel.resetMessage()
                navController.navigate("login / buy") // Navigate back to login
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = "Back to Login")
        }
    }
}