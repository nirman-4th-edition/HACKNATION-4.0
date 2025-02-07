package com.example.farm2u.viewModel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel

class BuyLoginViewModel: ViewModel() {
   val email = mutableStateOf("")
   val password = mutableStateOf("")

   fun checkValidity(email: String, password: String): Boolean {
      return !(email.isNotBlank() && password.isNotBlank())
   }

   fun checkPerson() {

   }
}