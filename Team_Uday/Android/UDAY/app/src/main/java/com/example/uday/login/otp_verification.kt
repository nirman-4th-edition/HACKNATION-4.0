package com.example.uday.login

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.uday.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.PhoneAuthCredential
import com.google.firebase.auth.PhoneAuthProvider

class otp_verification : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var verifyButton: Button
    private lateinit var resendOtpTextView: TextView
    private lateinit var phoneNumberTextView: TextView
    private lateinit var inputOtp1: EditText
    private lateinit var inputOtp2: EditText
    private lateinit var inputOtp3: EditText
    private lateinit var inputOtp4: EditText
    private lateinit var inputOtp5: EditText
    private lateinit var inputOtp6: EditText

    private var storedVerificationId: String? = ""
    private var phoneNumber: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_otp_verification)

        // Initialize views and Firebase Auth
        initViews()
        auth = FirebaseAuth.getInstance()

        // Retrieve the phone number and verification ID from Intent
        storedVerificationId = intent.getStringExtra("verificationID")
        phoneNumber = intent.getStringExtra("phone no")

        // Display the phone number to the user (if applicable)
        phoneNumber?.let {
            phoneNumberTextView.text = "Verifying $it"
        }

        // Add text change listeners to OTP fields
        addTextChangeListener()

        // Set up the Verify button click listener
        verifyButton.setOnClickListener {
            val otp = getTypedOtp()
            if (otp.length == 6) {
                verifyPhoneNumberWithCode(storedVerificationId, otp)
            } else {
                Toast.makeText(this, "Please enter a valid 6-digit OTP.", Toast.LENGTH_SHORT).show()
            }
        }

        // Resend OTP click listener
        resendOtpTextView.setOnClickListener {
            Toast.makeText(this, "Resending OTP...", Toast.LENGTH_SHORT).show()
            // Implement resend OTP logic here
        }
    }

    private fun verifyPhoneNumberWithCode(verificationId: String?, code: String) {
        if (verificationId == null) {
            Toast.makeText(this, "Verification ID is null. Please restart the process.", Toast.LENGTH_SHORT).show()
            return
        }
        val credential = PhoneAuthProvider.getCredential(verificationId, code)
        signInWithPhoneAuthCredential(credential)
    }

    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Log.d("success", "signInWithCredential:success")
                    val intent = Intent(this@otp_verification, signup::class.java)
                    startActivity(intent)
                    finish() // Close the current activity to prevent going back
                } else {
                    Log.w("failed", "signInWithCredential:failure", task.exception)
                    if (task.exception is FirebaseAuthInvalidCredentialsException) {
                        Toast.makeText(this, "Invalid OTP. Please try again.", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this, "Failed to verify OTP. Please try again later.", Toast.LENGTH_SHORT).show()
                    }
                }
            }
    }

    private fun addTextChangeListener() {
        inputOtp1.addTextChangedListener(EditTextWatcher(inputOtp1, inputOtp2))
        inputOtp2.addTextChangedListener(EditTextWatcher(inputOtp2, inputOtp3, inputOtp1))
        inputOtp3.addTextChangedListener(EditTextWatcher(inputOtp3, inputOtp4, inputOtp2))
        inputOtp4.addTextChangedListener(EditTextWatcher(inputOtp4, inputOtp5, inputOtp3))
        inputOtp5.addTextChangedListener(EditTextWatcher(inputOtp5, inputOtp6, inputOtp4))
        inputOtp6.addTextChangedListener(EditTextWatcher(inputOtp6, null, inputOtp5))
    }

    private fun initViews() {
        verifyButton = findViewById(R.id.submitotp)
        resendOtpTextView = findViewById(R.id.resendotp)
        phoneNumberTextView = findViewById(R.id.mobilenumber)
        inputOtp1 = findViewById(R.id.ic1)
        inputOtp2 = findViewById(R.id.ic2)
        inputOtp3 = findViewById(R.id.ic3)
        inputOtp4 = findViewById(R.id.ic4)
        inputOtp5 = findViewById(R.id.ic5)
        inputOtp6 = findViewById(R.id.ic6)
    }

    private fun getTypedOtp(): String {
        return inputOtp1.text.toString().trim() +
                inputOtp2.text.toString().trim() +
                inputOtp3.text.toString().trim() +
                inputOtp4.text.toString().trim() +
                inputOtp5.text.toString().trim() +
                inputOtp6.text.toString().trim()
    }

    inner class EditTextWatcher(
        private val currentView: EditText,
        private val nextView: EditText?,
        private val previousView: EditText? = null
    ) : TextWatcher {

        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}

        override fun afterTextChanged(s: Editable?) {
            val text = s.toString()
            when {
                text.length == 1 && nextView != null -> nextView.requestFocus()
                text.isEmpty() && previousView != null -> previousView.requestFocus()
            }
        }
    }
}
