package com.example.farm2u.view


import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
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
fun FarmerScaffold(navController: NavController, viewModel : ScaffoldViewModel) {
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            FarmerTopbar(navController)
        },
        bottomBar = {
            FarmerBottomNavigation(navController)
        },
        floatingActionButton = {
            when (viewModel.selectedIndex.value) {  // Use selectedIndex directly here
                0 -> FarmerFab(navController)
                1 -> FarmerAddButton(navController)
            }
        }
    ) {
        FarmerContentScreen(navController, viewModel) // Pass viewModel to FarmerContentScreen
    }
}


@Composable
fun FarmerContentScreen(navController: NavController, viewModel: ScaffoldViewModel) {
    when(viewModel.selectedIndex.value) {
        0 -> FarmerHome(navController)
        1 -> FarmerAdd(navController)
        2 -> FarmerOrders(navController)
        3 -> FarmerNegotiate(navController)
    }

}


@Composable
fun FarmerBottomNavigation(navController: NavController, viewModel: ScaffoldViewModel = viewModel()) {
    NavigationBar {
        viewModel.farmerItemList.forEachIndexed { index, item ->
            NavigationBarItem(
                selected = viewModel.selectedIndex.value == index,
                icon = { Icon(imageVector = item.icon, contentDescription = item.label) },
                label = { Text(text = item.label) },
                onClick = {viewModel.selectedIndex.value = index}
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FarmerTopbar(navController: NavController, viewModel: ScaffoldViewModel = viewModel()) {
    TopAppBar(
        navigationIcon = {
            Image(
                painterResource(R.drawable.no_bg_logo_2),
                contentDescription = "logo",
                modifier = Modifier.size(30.dp).padding(5.dp)
            )
        },
        title = {
            when(viewModel.selectedIndex.value) {
                0 -> Text("Farm2U")
                1 -> Text("Add")
                2 -> Text("Orders")
                3 -> Text("Negotiation")
            }
        },
        actions = {
            // Dropdown Menu
            IconButton(onClick = { viewModel.expanded.value = true }) {
                Icon(
                    imageVector = Icons.Default.MoreVert,
                    contentDescription = "More options"
                )
            }
            DropdownMenu(
                modifier = Modifier.width(150.dp),
                expanded = viewModel.expanded.value,
                onDismissRequest = { viewModel.expanded.value = false }
            ) {
                DropdownMenuItem(
                    text = { Text("Profile") },
                    onClick = {
                        // Navigate to the Profile screen
                        navController.navigate(Screens.FarmerProfile.route)
                        viewModel.expanded.value = false
                    }
                )

                DropdownMenuItem(
                    text = { Text("Logout") },
                    onClick = {
                        viewModel.expanded.value = false
                    }
                )
            }
        }
    )
}


@Composable
fun FarmerFab(navController: NavController) {
    FloatingActionButton(onClick = {
        navController.navigate("chatbot")
    }) {
        Image(
            painterResource(R.drawable.chatbot),
            contentDescription = "chatbot",
            modifier = Modifier.size(35.dp)
        )
    }
}

@Composable
fun FarmerAddButton(navController: NavController) {
    FloatingActionButton(onClick = {
        navController.navigate(Screens.AddItems.route)
    }) {
        Icon(
            imageVector = Icons.Default.Add,
            contentDescription = "Add"
        )
    }
}
