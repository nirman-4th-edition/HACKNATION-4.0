package com.example.allinone

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.allinone.Screens.DashboardScreen
import com.example.allinone.Screens.SignUpPage
import com.example.allinone.Screens.SplashPage
import com.example.allinone.Screens.logInPage



@Composable
fun AppNav(
    modifier: Modifier = Modifier,
    authViewModel: AuthViewModel,
    dashboardViewModel: DashboardViewModel = viewModel() // Use viewModel() here
) {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "Splash") {
        composable("Splash") {
            SplashPage(navController, authViewModel)
        }
        composable("login") {
            logInPage(modifier, navController, authViewModel)
            // Observe authState to navigate to Dashboard if the login is successful
            val authState = authViewModel.authState.value
            LaunchedEffect(authState) {
                if (authState is AuthState.Authenticated) {
                    navController.navigate("DashBoard") {
                        popUpTo("login") { inclusive = true }
                    }
                }
            }
        }
        composable("SignUp") {
            SignUpPage(modifier, navController, authViewModel)
        }
        composable("DashBoard") { backStackEntry ->
            // Here, get the DashboardViewModel using viewModel() or pass it as a parameter if needed
            DashboardScreen(
                navController = navController,
                authViewModel = authViewModel,
               )
        }
    }
}
