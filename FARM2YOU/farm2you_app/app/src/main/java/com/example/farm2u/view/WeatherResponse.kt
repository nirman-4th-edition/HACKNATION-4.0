package com.example.farm2u.view

data class WeatherResponse(
    val main: Main,
    val weather: List<Weather>
)

data class Main(
    val temp: Double // Temperature value in Celsius
)

data class Weather(
    val description: String // Weather condition description (optional)
)
