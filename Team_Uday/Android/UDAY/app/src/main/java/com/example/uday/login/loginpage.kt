package com.example.uday.login

import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.uday.R
import com.example.uday.global.phone
import com.google.firebase.FirebaseException
import com.google.firebase.FirebaseTooManyRequestsException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthMissingActivityForRecaptchaException
import com.google.firebase.auth.PhoneAuthCredential
import com.google.firebase.auth.PhoneAuthOptions
import com.google.firebase.auth.PhoneAuthProvider
import com.google.firebase.auth.PhoneAuthProvider.OnVerificationStateChangedCallbacks
import java.util.concurrent.TimeUnit

class loginpage : AppCompatActivity() {

    private lateinit var sendOTPBtn: Button
    private lateinit var phoneNumberET: EditText
    private lateinit var auth: FirebaseAuth

    private var storedVerificationId: String? = ""
    private lateinit var resendToken: PhoneAuthProvider.ForceResendingToken
    private lateinit var callbacks: OnVerificationStateChangedCallbacks

    companion object {
        private const val TAG = "PhoneAuthActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_otp_login)

        // Initialize views and FirebaseAuth
        sendOTPBtn = findViewById(R.id.submit)
        phoneNumberET = findViewById(R.id.phno)
        auth = FirebaseAuth.getInstance()

        // Set up the button click listener
        sendOTPBtn.setOnClickListener {
            val phoneNumber = phoneNumberET.text.toString().trim()

            if (phoneNumber.isEmpty()) {
                Toast.makeText(this, "Please enter a valid phone number", Toast.LENGTH_SHORT).show()
            } else if (!isNetworkAvailable()) {
                Toast.makeText(this, "No internet connection", Toast.LENGTH_SHORT).show()
            } else {
                startPhoneNumberVerification(phoneNumber)
            }
        }

        // Set up callbacks for Firebase Phone Authentication
        callbacks = object : OnVerificationStateChangedCallbacks() {
            override fun onVerificationCompleted(credential: PhoneAuthCredential) {
                // Automatic verification or instant verification
                Log.d(TAG, "onVerificationCompleted:$credential")
                signInWithPhoneAuthCredential(credential)
            }

            override fun onVerificationFailed(e: FirebaseException) {
                // Verification failed for various reasons
                Log.e(TAG, "Verification failed", e)
                when (e) {
                    is FirebaseAuthInvalidCredentialsException -> {
                        Log.e(TAG, "Invalid phone number format: ${e.message}")
                        Toast.makeText(this@loginpage, "Invalid phone number format", Toast.LENGTH_SHORT).show()
                    }
                    is FirebaseTooManyRequestsException -> {
                        Log.e(TAG, "SMS quota exceeded: ${e.message}")
                        Toast.makeText(this@loginpage, "SMS quota exceeded. Try again later.", Toast.LENGTH_SHORT).show()
                    }
                    is FirebaseAuthMissingActivityForRecaptchaException -> {
                        Log.e(TAG, "Missing reCAPTCHA activity: ${e.message}")
                        Toast.makeText(this@loginpage, "reCAPTCHA verification failed.", Toast.LENGTH_SHORT).show()
                    }
                    else -> {
                        Log.e(TAG, "Unknown error: ${e.message}")
                        Toast.makeText(this@loginpage, "Verification failed. Try again.", Toast.LENGTH_SHORT).show()
                    }
                }
            }

            override fun onCodeSent(verificationId: String, token: PhoneAuthProvider.ForceResendingToken) {
                // Code has been sent successfully
                Log.d(TAG, "onCodeSent: $verificationId")
                storedVerificationId = verificationId
                resendToken = token

                // Redirect to OTP verification screen
                val intent = Intent(this@loginpage, otp_verification::class.java)
                intent.putExtra("verificationID", storedVerificationId)
                intent.putExtra("phone no", phoneNumberET.text.toString().trim())
                startActivity(intent)
            }
        }
    }

    private fun startPhoneNumberVerification(phoneNumber: String) {
        // Append country code and start verification
        val fullPhoneNumber = "+91$phoneNumber"
        Log.d(TAG, "Starting verification for: $fullPhoneNumber")

        val options = PhoneAuthOptions.newBuilder(auth)
            .setPhoneNumber(fullPhoneNumber) // Phone number to verify
            .setTimeout(60L, TimeUnit.SECONDS) // Timeout and unit
            .setActivity(this) // Activity (for callback binding)
            .setCallbacks(callbacks) // OnVerificationStateChangedCallbacks
            .build()
        PhoneAuthProvider.verifyPhoneNumber(options)
    }

    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        // Sign in with the credential
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Log.d(TAG, "signInWithCredential:success")
                    val user = task.result?.user

                    // Redirect to the signup screen
                    val intent = Intent(this@loginpage, signup::class.java)
                    startActivity(intent)
                } else {
                    Log.w(TAG, "signInWithCredential:failure", task.exception)
                    if (task.exception is FirebaseAuthInvalidCredentialsException) {
                        Toast.makeText(this, "Invalid verification code", Toast.LENGTH_SHORT).show()
                    }
                }
            }
    }

    private fun isNetworkAvailable(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNetwork = connectivityManager.activeNetworkInfo
        return activeNetwork != null && activeNetwork.isConnected
    }
}
