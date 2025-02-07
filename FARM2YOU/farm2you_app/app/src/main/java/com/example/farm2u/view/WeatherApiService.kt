package com.example.farm2u.view

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApiService {

    @GET("weather")
    suspend fun getWeather(
        @Query("q") city: String, // City name
        @Query("appid") apiKey: String, // Your API Key
        @Query("units") units: String = "metric" // Temperature in Celsius
    ): Response<WeatherResponse>
}
