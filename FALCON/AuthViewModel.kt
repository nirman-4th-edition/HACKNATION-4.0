package com.example.allinone

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseAuth

class AuthViewModel : ViewModel() {

    private val auth: FirebaseAuth = FirebaseAuth.getInstance()

    // LiveData to observe authentication state
    private val _authState = MutableLiveData<AuthState>()
    val authState: LiveData<AuthState> = _authState

    init {
        checkAuthState()  // Check authentication state on initialization
    }

    // Check if the user is authenticated
    fun checkAuthState() {
        if (auth.currentUser == null) {
            _authState.value = AuthState.UnAuthenticated
        } else {
            _authState.value = AuthState.Authenticated
        }
    }

    // Login method with success and error handling
    fun login(email: String, password: String, onResult: (Boolean, String?) -> Unit) {
        if (email.isBlank() || password.isBlank()) {
            onResult(false, "Email or password can't be empty")
            return
        }

        _authState.value = AuthState.Loading

        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    _authState.value = AuthState.Authenticated
                    onResult(true, null)  // Successful login
                } else {
                    val exception = task.exception
                    val errorMessage = exception?.localizedMessage ?: "Login failed"
                    _authState.value = AuthState.Error(errorMessage)
                    onResult(false, errorMessage)  // Failed login with error message
                }
            }
            .addOnFailureListener { exception ->
                // If there’s a failure during the sign-in
                _authState.value = AuthState.Error(exception.localizedMessage ?: "Login failed")
                onResult(false, exception.localizedMessage ?: "Login failed")
            }
    }


    // Sign-up method with basic validation and callback handling
    fun signUp(email: String, password: String, onResult: (Boolean, String?) -> Unit) {
        if (email.isBlank() || password.isBlank()) {
            _authState.value = AuthState.Error("Email or password can't be empty")
            onResult(false, "Email or password can't be empty")
            return
        }

        _authState.value = AuthState.Loading
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    _authState.value = AuthState.Authenticated
                    onResult(true, null)  // Successful sign-up
                } else {
                    val errorMessage = task.exception?.localizedMessage ?: "Sign-up failed"
                    _authState.value = AuthState.Error(errorMessage)
                    onResult(false, errorMessage)  // Failed sign-up with error message
                }
            }
    }
    fun logOut() {
        auth.signOut()
        _authState.value = AuthState.UnAuthenticated  // Update auth state after sign-out
    }
    // Other methods...
}

// Sealed class representing different authentication states
sealed class AuthState {
    object Authenticated : AuthState()
    object UnAuthenticated : AuthState()
    object Loading : AuthState()
    object PasswordUpdated : AuthState() // New state for successful password update
    data class Error(val message: String) : AuthState()
}
