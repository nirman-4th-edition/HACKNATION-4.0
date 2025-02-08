package com.example.farm2u

import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.annotation.RequiresApi
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.farm2u.navigation.Nav
import com.example.farm2u.ui.theme.Farm2UTheme
import com.example.farm2u.view.FarmerScaffold


class MainActivity : ComponentActivity() {
    @RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Farm2UTheme {
                Nav()
//                ProfileScreen(navController = rememberNavController())
//                FarmerScaffold(navController = rememberNavController(), viewModel = viewModel())
            }
        }
    }
}

