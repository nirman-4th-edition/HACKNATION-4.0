package com.example.uday.login

import ApiService
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.uday.R
import com.example.uday.database.DataRequest
import com.example.uday.start_pages.Connector_frag
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.content.Intent

class signup : AppCompatActivity() {

    private lateinit var name: EditText
    private lateinit var contact: EditText
    private lateinit var aadhar: EditText
    private lateinit var email: EditText
    private lateinit var city: EditText
    private lateinit var signupButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.signup_page)
        init()

        signupButton.setOnClickListener {
            val nameText = name.text.toString().trim()
            val contactText = contact.text.toString().trim()
            val aadharText = aadhar.text.toString().trim()
            val emailText = email.text.toString().trim()
            val cityText = city.text.toString().trim()

            // Validate input
            if (nameText.isEmpty() || contactText.isEmpty() || aadharText.isEmpty() ||
                emailText.isEmpty() || cityText.isEmpty()) {
                Toast.makeText(this, "All fields are required!", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!contactText.matches("\\d+".toRegex())) {
                Toast.makeText(this, "Contact must contain only numbers", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!aadharText.matches("\\d{12}".toRegex())) {
                Toast.makeText(this, "Aadhar must be a 12-digit number", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Proceed with API call
            val apiService = RetrofitClient.instance.create(ApiService::class.java)
            val data = mapOf(
                "name" to nameText,
                "contact" to contactText,
                "aadhar" to aadharText,
                "email" to emailText,
                "city" to cityText,
            )
            val request = DataRequest(table = "userData", data = data)
            sendDataToServer(apiService, request)
        }
    }

    private fun sendDataToServer(apiService: ApiService, request: DataRequest) {
        signupButton.isEnabled = false
        apiService.sendData(request).enqueue(object : Callback<Map<String, Any>> {
            override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                signupButton.isEnabled = true
                if (response.isSuccessful) {
                    Toast.makeText(this@signup, "Signup Successful!", Toast.LENGTH_LONG).show()
                    val intent = Intent(this@signup, Connector_frag::class.java)
                    startActivity(intent)
                } else {
                    Toast.makeText(this@signup, "Failed: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                signupButton.isEnabled = true
                Toast.makeText(this@signup, "Error: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun init() {
        name = findViewById(R.id.name)
        contact = findViewById(R.id.contact)
        aadhar = findViewById(R.id.aadhar)
        email = findViewById(R.id.email)
        city = findViewById(R.id.city)
        signupButton = findViewById(R.id.signupbutt)
    }
}
