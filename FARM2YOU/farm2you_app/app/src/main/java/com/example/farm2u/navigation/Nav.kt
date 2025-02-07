package com.example.farm2u.navigation




import Login
import SignUp
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import androidx.navigation.navigation
import com.example.farm2u.R
import com.example.farm2u.view.AboutUs
import com.example.farm2u.view.Additems
import com.example.farm2u.view.ChatPage
import com.example.farm2u.view.ChatScreen
import com.example.farm2u.view.Crop
import com.example.farm2u.view.CropDetailScreen
import com.example.farm2u.view.Farm
import com.example.farm2u.view.FarmerAdd
import com.example.farm2u.view.FarmerDetailsScreen
import com.example.farm2u.view.FarmerNegotiate
import com.example.farm2u.view.FarmerOrders
import com.example.farm2u.view.FarmerProfile
import com.example.farm2u.view.FarmerScaffold
import com.example.farm2u.view.Favourites
import com.example.farm2u.view.ForgotPassword
import com.example.farm2u.view.GridScreen
import com.example.farm2u.view.History
import com.example.farm2u.view.Home
import com.example.farm2u.view.Inventory
import com.example.farm2u.view.LandingPage
import com.example.farm2u.view.NegotiatePriceScreen
import com.example.farm2u.view.OrderDetailScreen
import com.example.farm2u.view.OrderSummaryScreen
import com.example.farm2u.view.PaymentScreen
import com.example.farm2u.view.ProductDetailScreen
import com.example.farm2u.view.ProfileScreen
import com.example.farm2u.view.ScaffoldScreen
import com.example.farm2u.view.ShoppingCart
import com.example.farm2u.view.TrackOrderScreen
import com.example.farm2u.view.VerificationPage


@RequiresApi(Build.VERSION_CODES.VANILLA_ICE_CREAM)
@Composable
fun Nav() {
    val navCtrl = rememberNavController()
    NavHost(navController = navCtrl, startDestination = Screens.Auth.route) {

        navigation(startDestination = Screens.LandingPage.route, route = Screens.Auth.route) {

            composable(Screens.LandingPage.route) {
                LandingPage(navController = navCtrl)
            }

            composable(Screens.AboutUs.route) {
                AboutUs()
            }

            composable("login / {usertype}") { backStackEntry ->
                val usertype = backStackEntry.arguments?.getString("usertype") ?: "buy"
                Login(navController = navCtrl, usertype = usertype)
            }

            composable(Screens.SignUp.route) {
                SignUp(navController = navCtrl)
            }

            composable(Screens.ForgotPassword.route) {
                ForgotPassword(navController = navCtrl)
            }
            composable("verification") {
                VerificationPage<Any>(navController = navCtrl)
            }
            composable("profile") {
                ProfileScreen(navController = navCtrl)
            }
            composable(Screens.FarmerScaffold.route) {
                FarmerScaffold(navController = navCtrl, viewModel = viewModel())
            }
            composable(Screens.Profile.route) {
                ProfileScreen(navController = navCtrl)
            }
            composable("negotiate price") {
                NegotiatePriceScreen(navController = navCtrl)
            }

            composable("crop_detail/{cropName}") { backStackEntry ->
                val cropName = backStackEntry.arguments?.getString("cropName") ?: ""
                CropDetailScreen(navController = navCtrl, cropName = cropName)
            }
            composable("landing") {
                LandingPage(navController = navCtrl)
            }
            composable("about_us") {
                AboutUs()
            }
            composable(Screens.History.route) {
                History(navController = navCtrl)
            }


        }


        ///////////////////////* Farmer's Screen*/////////////////////////////

        navigation(startDestination = Screens.Scaffold.route, route = Screens.Sell.route) {
            composable(Screens.Scaffold.route) {
                ScaffoldScreen(navController = navCtrl, viewModel = viewModel())
            }

            composable(Screens.Home.route) {
                Home(navController = navCtrl)
            }

            composable(Screens.Favourites.route) {
                Favourites(navController =  navCtrl)
            }

            composable(Screens.FarmerProfile.route) {
                FarmerProfile(navController = navCtrl)
            }
            composable(Screens.Chatbot.route) {
                ChatPage(navController = navCtrl, viewModel = viewModel())
            }

            composable(Screens.Profile.route) {
                ProfileScreen(navController = navCtrl)
            }

            composable("product_detail/{productName}") { backStackEntry ->
                val productName = backStackEntry.arguments?.getString("productName") ?: ""
                ProductDetailScreen(navController = navCtrl, productName = productName)
            }

            composable(Screens.ShoppingCart.route) {
                ShoppingCart(navController = navCtrl)
            }

            composable(
                route = "${Screens.OrderSummaryScreen.route}/{productName}/{productImage}/{productPrice}/{selectedQuantity}",
                arguments = listOf(
                    navArgument("productName") { type = NavType.StringType },
                    navArgument("productImage") { type = NavType.IntType }, // Assuming image is a drawable resource ID
                    navArgument("productPrice") { type = NavType.StringType },
                    navArgument("selectedQuantity") { type = NavType.StringType }
                )
            ) { backStackEntry ->
                val productName = backStackEntry.arguments?.getString("productName") ?: ""
                val productImage = backStackEntry.arguments?.getInt("productImage") ?: R.drawable.placeholder
                val productPrice = backStackEntry.arguments?.getString("productPrice") ?: "0"
                val selectedQuantity = backStackEntry.arguments?.getString("selectedQuantity") ?: "1"

                OrderSummaryScreen(
                    navController = navCtrl,
                    productName = productName,
                    productImage = productImage,
                    productPrice = productPrice,
                    selectedQuantity = selectedQuantity
                )
            }

            // Add this new route for Payment Screen
            composable(
                route = "payment_screen/{totalPrice}",
                arguments = listOf(navArgument("totalPrice") { type = NavType.StringType })
            ) { backStackEntry ->
                val totalPrice = backStackEntry.arguments?.getString("totalPrice")?.toDoubleOrNull() ?: 0.0
                PaymentScreen(navController = navCtrl, totalPrice)
            }

            composable(
                route = "farmer_details/{farmerName}/{description}/{previousDeals}",
                arguments = listOf(
                    navArgument("farmerName") { type = NavType.StringType },
                    navArgument("description") { type = NavType.StringType },
                    navArgument("previousDeals") { type = NavType.StringType }
                )
            ) { backStackEntry ->
                val farmerName = backStackEntry.arguments?.getString("farmerName") ?: ""
                val description = backStackEntry.arguments?.getString("description") ?: ""
                val previousDeals = backStackEntry.arguments?.getString("previousDeals") ?: ""
                FarmerDetailsScreen(navController = navCtrl, farmerName, description, previousDeals)
            }





        }

        ///////////////////* Buyer's Screen */////////////////////////////////
        navigation(startDestination = Screens.FarmerScaffold.route, route = Screens.Buy.route) {

            composable(Screens.FarmerScaffold.route) {
                FarmerScaffold(navController = navCtrl, viewModel = viewModel())
            }




            composable(Screens.GridScreen.route) {
                GridScreen(navController = navCtrl)
            }

            composable(Screens.Farm.route) {
                Farm(navController = navCtrl)
            }

            composable(Screens.Inventory.route) {
                Inventory(navController = navCtrl)
            }

            composable(Screens.History.route) {
                History(navController = navCtrl)
            }

            composable(Screens.Crop.route) {
                Crop(navController = navCtrl)
            }

            composable(Screens.AddItems.route) {
                Additems(navController = navCtrl)
            }

            composable(Screens.ChatScreen.route) { backStackEntry ->
                val userName = backStackEntry.arguments?.getString("userName")
                userName?.let {
                    ChatScreen(navController=navCtrl, userName)
                }
            }
            composable("order_detail/{productName}") { backStackEntry ->
                val productName = backStackEntry.arguments?.getString(Screens.OrderDetailScreen.route) ?: ""
                OrderDetailScreen(navController = navCtrl, productName = productName)
            }

            composable("track_order/{productName}") { backStackEntry ->
                val productName = backStackEntry.arguments?.getString("productName") ?: ""
                TrackOrderScreen(navController = navCtrl, productName = productName)
            }

            composable(Screens.AddItems.route) {
                Additems(navController = navCtrl, viewModel = viewModel())
            }

            composable("farmerAdd") {
                FarmerAdd(navController = navCtrl,)
            }

            composable(Screens.FarmerOrders.route) { FarmerOrders(navCtrl) } // Must exist
            composable(Screens.FarmerNegotitate.route) { FarmerNegotiate(navCtrl) } // Must exist
        }
    }
}


