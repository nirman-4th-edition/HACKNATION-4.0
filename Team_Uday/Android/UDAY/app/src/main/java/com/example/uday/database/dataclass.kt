package com.example.uday.database


data class UserListdata(
    val id: String,
    val name: String,
    val contact: String,
    val profileImageUrl: String
)


data class DataRequest(
    val table: String,
    val data: Map<String, String>
)


data class ChatMessage(
    val sender: String,
    val receiver: String,
    val message: String,
    val timestamp: Long,
    val isRead: Boolean
)


data class AudioRequest(
    val audioBase64: String,
    val contact: String
)

data class ResponseMessage(
    val message: String  // Message from the server (success or error)
)
data class ImageRequest(
    val imageBase64: String,
    val contact: String
)

data class DataRequestsos(
    val name: String,
    val contact: String,
    val latitude: Double,
    val longitude: Double,
    val message: String? = null,
    val audioBase64: String? = null
)

