package com.example.farm2u.viewModel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class signUpViewModel: ViewModel() {
    val name = mutableStateOf("")
    val eemail = mutableStateOf("")
    val newpassword = mutableStateOf("")
    val confirmpassword = mutableStateOf("")

    private val _username = MutableStateFlow("")
    val username: StateFlow<String> = _username

    private val _email = MutableStateFlow("")
    val email: StateFlow<String> = _email

    private val _phoneNumber = MutableStateFlow("")
    val phoneNumber: StateFlow<String> = _phoneNumber

    private val _password = MutableStateFlow("")
    val password: StateFlow<String> = _password

    // Update methods for states
    fun onUsernameChanged(value: String) { _username.value = value }
    fun onEmailChanged(value: String) { _email.value = value }
    fun onPhoneNumberChanged(value: String) { _phoneNumber.value = value }
    fun onPasswordChanged(value: String) { _password.value = value }

    // Functionality like form validation or submission can be added here

}
