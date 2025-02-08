package com.example.uday.Chat

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.uday.R
import com.example.uday.database.ChatMessage

class ChatAdapter(private val messages: List<ChatMessage>, private val currentUserPhone: String) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    // View types for differentiating between sender and receiver messages
    private val VIEW_TYPE_SENT = 1
    private val VIEW_TYPE_RECEIVED = 2

    // ViewHolder for sent messages
    class SentMessageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val sentMessageText: TextView = itemView.findViewById(R.id.sentmessage)
    }

    // ViewHolder for received messages
    class ReceivedMessageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val receivedMessageText: TextView = itemView.findViewById(R.id.receivedmessage)
    }

    override fun getItemViewType(position: Int): Int {
        val message = messages[position]
        return if (message.sender == currentUserPhone) VIEW_TYPE_SENT else VIEW_TYPE_RECEIVED
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return if (viewType == VIEW_TYPE_SENT) {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.send_msg, parent, false)
            SentMessageViewHolder(view)
        } else {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.receive_msg, parent, false)
            ReceivedMessageViewHolder(view)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val message = messages[position]
        val formattedTime = formatTimestamp(message.timestamp)

        if (holder is SentMessageViewHolder) {
            holder.sentMessageText.text = message.message
            // Optionally, show timestamp for sent messages
        } else if (holder is ReceivedMessageViewHolder) {
            holder.receivedMessageText.text = message.message
            // Optionally, show timestamp for received messages
        }
    }


    override fun getItemCount(): Int {
        return messages.size
    }

    // Helper function to format the timestamp
    private fun formatTimestamp(timestamp: Long): String {
        val date = java.util.Date(timestamp)
        val format = java.text.SimpleDateFormat("hh:mm a", java.util.Locale.getDefault())
        return format.format(date)
    }
}
