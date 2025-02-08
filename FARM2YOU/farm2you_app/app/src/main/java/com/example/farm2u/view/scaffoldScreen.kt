package com.example.farm2u.view

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.farm2u.R
import com.example.farm2u.navigation.Screens
import com.example.farm2u.viewModel.ScaffoldViewModel

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun ScaffoldScreen(navController: NavController, viewModel: ScaffoldViewModel) {
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            Topbar(navController = navController, viewModel = viewModel)
        },
        bottomBar = {
            BottomNavigation(viewModel = viewModel)
        },
        floatingActionButton = {
            if (viewModel.selectedIndex.value == 0) {
                Fab(navController)
            }
        }
    ) {
        ContentScreen(navController = navController, viewModel = viewModel)
    }
}

@Composable
fun ContentScreen(navController: NavController, viewModel: ScaffoldViewModel) {
    when (viewModel.selectedIndex.value) {
        0 -> Home(navController)
        1 -> Favourites(navController)
        2 -> ShoppingCart(navController)
        3 -> ProfileScreen(navController)
    }
}

@Composable
fun Fab(navController: NavController) {
    FloatingActionButton(onClick = {
        navController.navigate("chatbot")
    }) {
        Image(
            painter = painterResource(R.drawable.chatbot),
            contentDescription = "chatbot",
            modifier = Modifier.size(35.dp)
        )
    }
}

@Composable
fun BottomNavigation(viewModel: ScaffoldViewModel) {
    NavigationBar {
        viewModel.navItemList.forEachIndexed { index, item ->
            NavigationBarItem(
                selected = viewModel.selectedIndex.value == index,
                onClick = { viewModel.selectedIndex.value = index },
                icon = { Icon(item.icon, contentDescription = item.label) },
                label = { Text(text = item.label) }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Topbar(navController: NavController, viewModel: ScaffoldViewModel) {
    TopAppBar(
        navigationIcon = {
            Image(
                painter = painterResource(R.drawable.no_bg_logo_2),
                contentDescription = "logo",
                modifier = Modifier.size(30.dp).padding(5.dp),
            )
        },
        title = {
            when (viewModel.selectedIndex.value) {
                0 -> Text("Farm2U")
                1 -> Text("Favourites")
                2 -> Text("Shopping Cart")
                3 -> Text("Profile")
            }
        },
        actions = {
            IconButton(onClick = { viewModel.expanded.value = true }) {
                Icon(Icons.Default.MoreVert, contentDescription = "More options")
            }
            DropdownMenu(
                expanded = viewModel.expanded.value,
                onDismissRequest = { viewModel.expanded.value = false },
                modifier = Modifier.width(150.dp)
            ) {
                DropdownMenuItem(
                    text = { Text("Profile") },
                    onClick = {
                        navController.navigate(Screens.Profile.route)
                        viewModel.expanded.value = false
                    }
                )
            }
        }
    )
}
