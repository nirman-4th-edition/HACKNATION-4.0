package com.example.uday.start_pages

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.uday.Chat.Chat
import com.example.uday.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class Connector_frag : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.main_activity)

        // Set up the fragment to be displayed when activity is created
        replacefragment(gotham_map())

        // Set up the BottomNavigationView
        val bottomNavBar = findViewById<BottomNavigationView>(R.id.bottom_nav_bar)
        bottomNavBar.selectedItemId = R.id.bottom_map

        bottomNavBar.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.bottom_map -> replacefragment(gotham_map())
                R.id.bottom_family -> replacefragment(fragment_familymap())
                R.id.bottom_news -> replacefragment(fragment_news())
                R.id.bottom_chat -> replacefragment(Chat())
                else -> { }
            }
            return@setOnItemSelectedListener true
        }

    }

    // Method to replace fragments
    private fun replacefragment(fragment: Fragment) {
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout, fragment).commit()
    }

}
