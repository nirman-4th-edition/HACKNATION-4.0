package com.example.farm2u.viewModel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel

class favouritesViewModel: ViewModel() {

    val searchText = mutableStateOf("")
}