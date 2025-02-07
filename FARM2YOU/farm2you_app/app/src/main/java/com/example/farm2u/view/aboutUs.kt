package com.example.farm2u.view

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun AboutUs() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(color = Color(0xFFE2ECF8)) // Light background color
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            // Section Title
            Text(
                text = "About Us",
                fontSize = 30.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 16.dp),
                color = Color.Black // Text color for contrast
            )

            // Introduction
            Text(
                text = "FARM2YOU is committed to solving the challenges faced by farmers in accessing markets and " +
                        "earning fair prices for their produce. We believe in empowering farmers and creating opportunities " +
                        "for them to connect directly with consumers.",
                fontSize = 18.sp,
                lineHeight = 24.sp, // Space between lines for readability
                modifier = Modifier.padding(bottom = 16.dp),
                color = Color.Black
            )

            // Section Header: The Problem
            Text(
                text = "The Problem",
                fontSize = 22.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(bottom = 8.dp),
                color = Color.Black
            )

            // Paragraph 1 - Highlighting the Problem
            Text(
                text = "Farmers often face challenges in accessing markets, leading to lower income due to intermediaries " +
                        "or middlemen. This limits their ability to sell produce at fair prices, impacting their livelihood " +
                        "and growth potential.",
                fontSize = 18.sp,
                lineHeight = 24.sp,
                modifier = Modifier.padding(bottom = 16.dp),
                color = Color.Black
            )

            // Section Header: Our Solution
            Text(
                text = "Our Solution",
                fontSize = 22.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(bottom = 8.dp),
                color = Color.Black
            )

            // Paragraph 2 - The Farm2You Platform
            Text(
                text = "FARM2YOU provides a comprehensive platform that connects farmers directly with consumers. " +
                        "This solution eliminates the need for middlemen, ensuring that farmers can list their products, " +
                        "negotiate prices, and manage transactions with transparency.",
                fontSize = 18.sp,
                lineHeight = 24.sp,
                modifier = Modifier.padding(bottom = 16.dp),
                color = Color.Black
            )

            // Section Header: Key Features
            Text(
                text = "Key Features",
                fontSize = 22.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(bottom = 8.dp),
                color = Color.Black
            )

            // Paragraph 3 - Features of the platform
            Text(
                text = "Our user-friendly mobile platform enables farmers to showcase their products with ease. Key features include:",
                fontSize = 18.sp,
                lineHeight = 24.sp,
                modifier = Modifier.padding(bottom = 8.dp),
                color = Color.Black
            )

            // Bullet points for features
            Column(
                modifier = Modifier.padding(start = 8.dp) // Indent for bullet points
            ) {
                FeatureItem("Simple and intuitive product listings")
                FeatureItem("Transparent price negotiation tools")
                FeatureItem("Secure and managed transaction system")
                FeatureItem("Direct connection with consumers")
                FeatureItem("Increased income potential for farmers")
            }

            Spacer(modifier = Modifier.height(16.dp)) // Space between sections

            // Conclusion Paragraph
            Text(
                text = "FARM2YOU is transforming the way farmers interact with the marketplace, providing a direct-to-consumer " +
                        "experience that fosters trust, improves transparency, and helps farmers achieve their true income potential.",
                fontSize = 18.sp,
                lineHeight = 24.sp,
                modifier = Modifier.padding(bottom = 16.dp),
                color = Color.Black
            )
        }
    }
}

@Composable
fun FeatureItem(text: String) {
    Row(
        verticalAlignment = Alignment.Top,
        modifier = Modifier.padding(bottom = 4.dp)
    ) {
        Text(
            text = "•",
            fontSize = 18.sp,
            color = Color.Black,
            modifier = Modifier.padding(end = 8.dp)
        )
        Text(
            text = text,
            fontSize = 18.sp,
            lineHeight = 24.sp,
            color = Color.Black
        )
    }
}

@Preview(showBackground = true)
@Composable
fun AboutUsPreview() {
    AboutUs()
}