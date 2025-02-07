package com.example.farm2u.navigation

sealed class Screens(val route: String) {

    object LandingPage : Screens(route = "landingPage")
    object AboutUs : Screens(route = "about us")
    object Login : Screens(route = "login")
    object SignUp : Screens(route = "signup")
    object ForgotPassword : Screens(route = "forgot")

    object Scaffold : Screens(route = "scaffold")
    object Home : Screens(route = "home")
    object Favourites : Screens(route = "favourites")
    object Chatbot : Screens(route = "chatbot")
    object Profile : Screens(route = "profile")
    object ShoppingCart : Screens(route = "shopping_cart")
    object OrderSummaryScreen : Screens(route = "order_summary")

    object FarmerScaffold : Screens(route = "farmer scaffold")
    object GridScreen : Screens(route = "grid screen")
    object Farm : Screens(route = "farm")
    object Inventory : Screens(route = "inventory")
    object History : Screens(route = "history")
    object Crop : Screens(route = "crop")
    object AddItems : Screens(route = "add items")
    object FarmerProfile : Screens(route = "farmer profile")
    object FarmerOrder : Screens(route = "farmer order")
    object FarmerNegotitate : Screens(route = "farmer order")
    object ChatScreen: Screens(route = "chat screen/{userName}")

    object Auth : Screens(route = "auth")
    object Sell : Screens(route = "sell")
    object Buy : Screens(route = "buy")
    object FarmerOrders : Screens("farmer_orders")
    object OrderDetailScreen : Screens("order_detail")
    object TrackOrderScreen : Screens("track_order")
}

