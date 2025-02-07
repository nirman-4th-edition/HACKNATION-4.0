package com.example.farm2u.view



import android.content.Context
import android.content.Intent
import android.net.Uri

fun openEmailClient(context: Context, email: String) {
    val intent = Intent(Intent.ACTION_SENDTO).apply {
        data = Uri.parse("mailto:$email") // Email address
        putExtra(Intent.EXTRA_SUBJECT, "Your Subject Here") // Optional: add a subject
    }
    context.startActivity(Intent.createChooser(intent, "Send Email"))
}
