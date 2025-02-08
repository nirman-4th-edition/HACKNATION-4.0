package com.example.uday.Chat

import ApiService
import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.uday.R
import com.example.uday.database.UserListdata
import com.example.uday.global.phone
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class chat_list_fragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var userListAdapter: User_list_Adapter
    private val userList = mutableListOf<UserListdata>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_chat_fragment, container, false)
        recyclerView = view.findViewById(R.id.userListrecycle)

        setupRecyclerView()
        loadChatListFromPrefs()
        fetchAllUsersFromDatabase()
        val addChatButton: FloatingActionButton = view.findViewById(R.id.addpeople)
        addChatButton.setOnClickListener { showAddChatDialog() }

        return view
    }

    private fun setupRecyclerView() {
        userListAdapter = User_list_Adapter(userList)
        recyclerView.layoutManager = LinearLayoutManager(context)
        recyclerView.adapter = userListAdapter
    }

    private fun showAddChatDialog() {
        val dialogBuilder = AlertDialog.Builder(requireContext())
        dialogBuilder.setTitle("Enter Phone Number")

        val input = EditText(requireContext())
        input.hint = "Phone Number"
        dialogBuilder.setView(input)

        dialogBuilder.setPositiveButton("Search") { _, _ ->
            val phoneNumber = input.text.toString().trim()
            if (phoneNumber.isNotEmpty()) {

            } else {
                Toast.makeText(context, "Please enter a phone number", Toast.LENGTH_SHORT).show()
            }
        }
        dialogBuilder.setNegativeButton("Cancel") { dialog, _ -> dialog.dismiss() }

        dialogBuilder.create().show()
    }

    private fun fetchUserFromDatabase(phoneNumber: String) {
        val apiService = RetrofitClient.instance.create(ApiService::class.java)

        // Check if the phone number matches the global phone number
        if (phoneNumber == phone.userNumber) {
            Toast.makeText(context, "You cannot add yourself to the chat list.", Toast.LENGTH_SHORT).show()
            return
        }

        // Fetch the user entered by the user
        apiService.getUserByPhone(phoneNumber).enqueue(object : Callback<UserListdata> {
            override fun onResponse(call: Call<UserListdata>, response: Response<UserListdata>) {
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!

                    // Check if the user is already in the list
                    val isUserAlreadyAdded = userList.any { it.contact == user.contact }
                    if (!isUserAlreadyAdded) {
                        userList.add(user)
                        userListAdapter.notifyItemInserted(userList.size - 1)
                    }

                    saveChatListToPrefs()
                    Toast.makeText(context, "${user.name} added to chat list", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(context, "User not found", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<UserListdata>, t: Throwable) {
                Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
/*
    // Fetch Uday from the database every time
    private fun fetchUdayFromDatabase() {
        val apiService = RetrofitClient.instance.create(ApiService::class.java)

        apiService.getUserByPhone("0").enqueue(object : Callback<UserListdata> {
            override fun onResponse(call: Call<UserListdata>, response: Response<UserListdata>) {
                if (response.isSuccessful && response.body() != null) {
                    val udayUser = response.body()!!

                    // Ensure Uday is not duplicated
                    val isUdayAlreadyAdded = userList.any { it.contact == udayUser.contact }
                    if (!isUdayAlreadyAdded) {
                        userList.add(udayUser)
                        userListAdapter.notifyItemInserted(userList.size - 1)
                        saveChatListToPrefs()
                    }
                }
            }

            override fun onFailure(call: Call<UserListdata>, t: Throwable) {
                // Handle failure silently or log it
            }
        })
    }

  */

    private fun fetchAllUsersFromDatabase() {
        val apiService = RetrofitClient.instance.create(ApiService::class.java)

        apiService.getAllUsers().enqueue(object : Callback<List<UserListdata>> {
            override fun onResponse(call: Call<List<UserListdata>>, response: Response<List<UserListdata>>) {
                if (response.isSuccessful && response.body() != null) {
                    val users = response.body()!!

                    userList.clear() // Clear existing list to prevent duplication
                    userList.addAll(users)
                    userListAdapter.notifyDataSetChanged() // Update UI

                    saveChatListToPrefs()
                } else {
                    Toast.makeText(context, "No users found", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<UserListdata>>, t: Throwable) {
                Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun saveChatListToPrefs() {
        val sharedPreferences = requireContext().getSharedPreferences("chat_prefs", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        val jsonString = Gson().toJson(userList)
        editor.putString("chat_list", jsonString)
        editor.apply()
    }

    private fun loadChatListFromPrefs() {
        val sharedPreferences = requireContext().getSharedPreferences("chat_prefs", Context.MODE_PRIVATE)
        val jsonString = sharedPreferences.getString("chat_list", null)
        if (!jsonString.isNullOrEmpty()) {
            val type = object : TypeToken<List<UserListdata>>() {}.type
            val savedList: List<UserListdata> = Gson().fromJson(jsonString, type)
            userList.clear()
            userList.addAll(savedList)
            userListAdapter.notifyDataSetChanged()
        }
    }

}
