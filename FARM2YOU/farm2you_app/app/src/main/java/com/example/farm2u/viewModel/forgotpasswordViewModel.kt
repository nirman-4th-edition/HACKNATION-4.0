package com.example.farm2u.viewModel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class ForgotPasswordViewModel : ViewModel() {

    private val _email = MutableStateFlow("")
    val email = _email.asStateFlow()

    private val _message = MutableStateFlow("")
    val message = _message.asStateFlow()

    fun onEmailChange(newEmail: String) {
        _email.value = newEmail
    }

    fun sendResetLink() {
        if (_email.value.isNotEmpty() && android.util.Patterns.EMAIL_ADDRESS.matcher(_email.value).matches()) {
            _message.value = "Password reset link sent to ${_email.value}"
        } else {
            _message.value = "Please enter a valid email address."
        }
    }

    fun resetMessage() {
        _message.value = ""
    }
}