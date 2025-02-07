// File: MainActivity.kt
package com.silicon.bibliotheca

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
// Import your existing screens (adjust package names as needed)
import com.silicon.bibliotheca.LoginScreen
import com.silicon.bibliotheca.SignupScreen
import com.silicon.bibliotheca.ForgotPasswordScreen
import com.silicon.bibliotheca.HomeScreen
// Import your new screens
import com.silicon.bibliotheca.BookIssueScreen
import com.silicon.bibliotheca.CheckRoomScreen
import com.silicon.bibliotheca.NotifyScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MainApp()
        }
    }
}

@Composable
fun MainApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "login") {
        // Existing routes
        composable("login") { LoginScreen(navController = navController) }
        composable("signup") { SignupScreen(navController = navController) }
        composable("forgot_password") { ForgotPasswordScreen(navController = navController) }
        composable("home") { HomeScreen(navController = navController) }
        // New routes
        composable("book_issue") { BookIssueScreen(navController = navController) }
        composable("check_room") { CheckRoomScreen(navController = navController) }
        composable("notify") { NotifyScreen(navController = navController) }
    }
}
