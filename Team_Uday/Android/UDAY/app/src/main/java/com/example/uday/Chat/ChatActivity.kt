package com.example.uday.Chat

import android.content.Intent
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.uday.R
import com.example.uday.R.id.chatContainer
import com.example.uday.database.ChatMessage
import com.example.uday.global.phone
import kotlinx.coroutines.CoroutineStart
import okhttp3.*
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.io.File
import java.io.IOException

import android.util.Base64
class ChatActivity : AppCompatActivity() {

    private lateinit var username: TextView
    private lateinit var backbtn: ImageView
    private lateinit var recyclerView: RecyclerView
    private lateinit var messageEditText: EditText
    private lateinit var sendButton: ImageView
    private lateinit var chatAdapter: ChatAdapter
    private val chatMessages = mutableListOf<ChatMessage>()
    private lateinit var receiverPhone: String
    private lateinit var userPhone: String
    private lateinit var receiverName: String
    private lateinit var name: TextView
    private lateinit var webSocket: WebSocket
    private lateinit var socketListener: ChatWebSocketListener
    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat_room)

        init()
    //SOS Message
        val receivedSosMessage = intent.getStringExtra("sosMessage")
        val receivedAudioBase64 = intent.getStringExtra("audioBase64")
        if (receivedSosMessage != null) {
            displaySOSMessage(receivedSosMessage, receivedAudioBase64)
        }



        receiverName = intent.getStringExtra("receiverName") ?: "Unknown User"
        receiverPhone = intent.getStringExtra("receiverPhone") ?: ""
        userPhone = phone.userNumber.toString()

        // Set the username in the UI
        username.text = receiverName
        name.text = receiverName

        // RecyclerView setup
        recyclerView.layoutManager = LinearLayoutManager(this).apply {
            stackFromEnd = true
        }
        chatAdapter = ChatAdapter(chatMessages, userPhone)
        recyclerView.adapter = chatAdapter

        // Set up WebSocket connection
        setupWebSocket()

        // Send message on button click
        sendButton.setOnClickListener {
            sendMessage()
        }

        // Handle back button click
        backbtn.setOnClickListener {
            onBackPressed()
        }

        // Fetch previous messages from database when activity is loaded
        fetchMessagesFromDatabase()
    }

    override fun onResume() {
        super.onResume()
        // Fetch the latest messages when the user returns to the chat screen
        fetchMessagesFromDatabase()

    }

    private fun init() {
        username = findViewById(R.id.pname)
        backbtn = findViewById(R.id.chat_back)
        recyclerView = findViewById(R.id.linear1)
        messageEditText = findViewById(R.id.messagebox)
        sendButton = findViewById(R.id.sendm)
        name = findViewById(R.id.pname)
    }

    private fun setupWebSocket() {
        val request = Request.Builder().url("ws://192.168.137.119:8080").build()

        socketListener = ChatWebSocketListener { messageJson ->
            runOnUiThread {
                Log.d("WebSocket", "Message received: $messageJson")
                val jsonObject = JSONObject(messageJson)
                val incomingMessage = ChatMessage(
                    sender = jsonObject.getString("sender"),
                    receiver = jsonObject.getString("receiver"),
                    message = jsonObject.getString("message"),
                    timestamp = jsonObject.getLong("timestamp"),
                    isRead = false
                )

                chatMessages.add(incomingMessage)
                chatAdapter.notifyItemInserted(chatMessages.size - 1)
                recyclerView.scrollToPosition(chatMessages.size - 1)

                saveMessageToDatabase(incomingMessage)
            }
        }
        webSocket = client.newWebSocket(request, socketListener)
    }

    private fun sendMessage() {
        val messageText = messageEditText.text.toString().trim()
        if (messageText.isNotEmpty()) {
            val messageJson = JSONObject().apply {
                put("type", "message")
                put("sender", userPhone)
                put("receiver", receiverPhone)
                put("message", messageText)
            }

            webSocket.send(messageJson.toString())
            Log.d("WebSocket", "Message sent: $messageJson")

            val chatMessage = ChatMessage(
                sender = userPhone,
                receiver = receiverPhone,
                message = messageText,
                timestamp = System.currentTimeMillis(),
                isRead = false
            )

            chatMessages.add(chatMessage)
            chatAdapter.notifyItemInserted(chatMessages.size - 1)
            recyclerView.scrollToPosition(chatMessages.size - 1)
            saveMessageToDatabase(chatMessage)
            messageEditText.text.clear()
        } else {
            Toast.makeText(this, "Message cannot be empty", Toast.LENGTH_SHORT).show()
        }
    }

    private fun fetchMessagesFromDatabase() {
        val url = "http://192.168.137.119:3000/getMessages?userPhone=$userPhone&receiverPhone=$receiverPhone"
        val request = Request.Builder().url(url).build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("ChatActivity", "Error fetching messages", e)
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val messages = responseBody.string() // Ensure it's not null
                        try {
                            val jsonArray = JSONArray(messages) // Fix: Directly use JSONArray
                            for (i in 0 until jsonArray.length()) {
                                val jsonMessage = jsonArray.getJSONObject(i)
                                val chatMessage = ChatMessage(
                                    sender = jsonMessage.getString("sender"),
                                    receiver = jsonMessage.getString("receiver"),
                                    message = jsonMessage.getString("message"),
                                    timestamp = jsonMessage.getLong("timestamp"),
                                    isRead = jsonMessage.optBoolean("isRead", false) // Default false if missing
                                )
                                chatMessages.add(chatMessage)
                            }
                            runOnUiThread {
                                chatAdapter.notifyDataSetChanged()
                                recyclerView.scrollToPosition(chatMessages.size - 1)
                            }
                        } catch (e: JSONException) {
                            Log.e("ChatActivity", "Error parsing messages JSON", e)
                        }
                    } ?: Log.e("ChatActivity", "Response body is null")
                } else {
                    Log.e("ChatActivity", "Failed to fetch messages: ${response.code}")
                }
            }

        })
    }

    private fun saveMessageToDatabase(message: ChatMessage) {
        Log.d("ChatActivity", "Saving message to the database: ${message.message}")
    }

    override fun onDestroy() {
        super.onDestroy()
        client.dispatcher.executorService.shutdown()
    }

    private fun displaySOSMessage(message: String, audioBase64: String?) {
        // Correctly find the chat container by using its ID
        val chatContainer: ScrollView = findViewById(R.id.chatContainer)

        // Inflate the message view layout (make sure you use the correct variable name for chatContainer)
        val messageView = LayoutInflater.from(this).inflate(R.layout.sos_layout_chat, chatContainer, false)

        // Find the individual views in the inflated layout
        val messageBox: TextView = messageView.findViewById(R.id.message_box)
        val playButton: ImageView = messageView.findViewById(R.id.play_button)

        // Set the message text
        messageBox.text = message

        // If audio is provided, make the play button visible
        if (audioBase64 != null) {
            playButton.visibility = View.VISIBLE
            playButton.setOnClickListener {
                playAudio(audioBase64)
            }
        } else {
            playButton.visibility = View.GONE
        }

        // Add the inflated message view to the chat container
        chatContainer.addView(messageView)
    }

    private fun playAudio(audioBase64: String) {
        try {
            // Decode the Base64 string to bytes
            val audioBytes = Base64.decode(audioBase64, Base64.DEFAULT)

            // Create a temporary file to save the audio data
            val tempFile = File.createTempFile("sos_audio", ".mp3", cacheDir)
            tempFile.writeBytes(audioBytes)

            // Play the audio using MediaPlayer
            val mediaPlayer = MediaPlayer().apply {
                setDataSource(tempFile.absolutePath)
                prepare()
                start()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }


}
