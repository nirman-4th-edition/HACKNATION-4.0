package com.example.farm2u.viewModel

import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.farm2u.R
import com.example.farm2u.model.GridItem
import com.example.farm2u.view.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException

class FarmerHomeViewModel: ViewModel() {
    var gridItems = mutableStateListOf<GridItem>()
        private set

    init {
        // Populate the grid with data
        loadGridItems()
    }

    private fun loadGridItems() {
        gridItems.addAll(
            listOf(
                GridItem(1,"Farm", R.drawable.farm),
                GridItem(2,"History", R.drawable.history),
                GridItem(3,"Inventory", R.drawable.inventory),
                GridItem(4,"Crops", R.drawable.crops)
            )
        )
    }

    private val _temperature = MutableStateFlow("--")
    val temperature: StateFlow<String> = _temperature

    private val _isLoading = MutableStateFlow(true) // This tracks loading state
    val isLoading: StateFlow<Boolean> = _isLoading // Expose it as a StateFlow

    private val apiKey = "39732392571c8a811ed0c4c065217c7f" // Replace with your actual API key

    init {
        fetchTemperature("Brahmapur") // Replace with your desired city
    }

    private fun fetchTemperature(city: String) {
        viewModelScope.launch {
            try {
                _isLoading.value = true // Set loading to true before the API call
                val response = RetrofitClient.retrofitService.getWeather(city, apiKey)

                if (response.isSuccessful) {
                    response.body()?.let {
                        // Update the temperature when the response is successful
                        _temperature.value = it.main.temp.toString()
                    }
                } else {
                    _temperature.value = "Error: ${response.code()}"
                }
            } catch (e: HttpException) {
                _temperature.value = "HTTP Error: ${e.message}"
            } catch (e: IOException) {
                _temperature.value = "Network Error"
            } finally {
                _isLoading.value = false // Set loading to false when the request completes
            }
        }
    }
}