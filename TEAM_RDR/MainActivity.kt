package com.example.animalwonders

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.rememberNavController
import com.example.animalwonders.room.AnimalDatabase
import com.example.animalwonders.room.AnimalRepository
import com.example.animalwonders.ui.theme.AnimalWondersTheme
import com.example.animalwonders.viewmodel.AnimalViewModel


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val animalViewModel = AnimalViewModel(application)
        setContent {
            AnimalWondersTheme {
                // Initialize the NavController
                val navController = rememberNavController()
                NavigationGraph(navController = navController, animalViewModel)
            }
        }
    }
}

