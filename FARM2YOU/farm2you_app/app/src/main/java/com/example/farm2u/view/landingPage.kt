package com.example.farm2u.view

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.farm2u.R
import com.example.farm2u.model.FAQItem
import com.example.farm2u.viewModel.LandingPageViewModel
import java.util.Locale
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.material3.Button

// ✅ Main LandingPage Composable
@Composable
fun LandingPage(navController: NavHostController, viewModel: LandingPageViewModel = viewModel()) {
    var selectedLanguage by remember { mutableStateOf("English") }
    val context = LocalContext.current
    val faqItems = viewModel.faqItems

    // Update locale when language changes
    LaunchedEffect(selectedLanguage) {
        setLocale(context, selectedLanguage)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        Header(
            navController = navController,
            selectedLanguage = selectedLanguage,
            onLanguageChange = { newLanguage -> selectedLanguage = newLanguage }
        )

        // ✅ Language-Sensitive Title
        Text(
            text = when (selectedLanguage) {
                "Hindi" -> "क्यों चुनें Farm2U"
                "Odia" -> "କାହିଁକି Farm2U ବାଛନ୍ତୁ"
                else -> "why Choose Farm2u"
            },
            fontSize = 32.sp,
            color = colorResource(id = R.color.teal_700),
            modifier = Modifier
                .align(Alignment.CenterHorizontally)
                .padding(top = 16.dp),
            fontWeight = FontWeight.Bold
        )

        Image(
            painter = painterResource(id = R.drawable.features_img),
            contentDescription = "Why choose Farm2U",
            contentScale = ContentScale.FillWidth,
            modifier = Modifier.fillMaxWidth()
        )

        // ✅ FAQ Section
        FAQSection(faqItems = faqItems, selectedLanguage = selectedLanguage)

        // ✅ Footer Section
        Footer(navController = navController, context = context)
    }
}

// ✅ Set Locale for Different Languages
fun setLocale(context: Context, language: String) {
    val locale = when (language) {
        "Hindi" -> Locale("hi")
        "Odia" -> Locale("or")
        else -> Locale("en")
    }
    Locale.setDefault(locale)

    val config = context.resources.configuration
    config.setLocale(locale)

    context.resources.updateConfiguration(config, context.resources.displayMetrics)
}

// ✅ Header Section
@Composable
fun Header(
    navController: NavHostController,
    selectedLanguage: String,
    onLanguageChange: (String) -> Unit
) {
    Box(modifier = Modifier.fillMaxWidth()) {
        Image(
            painter = painterResource(id = R.drawable.bg_logo_landing_page_03),
            contentDescription = "Background Logo",
            contentScale = ContentScale.FillBounds,
            modifier = Modifier.aspectRatio(16f / 8f)
        )

        Column(
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .padding(bottom = 40.dp, end = 5.dp)
        ) {
            Text(
                text = when (selectedLanguage) {
                    "Hindi" -> "ताजा खेत से"
                    "Odia" -> "ଚାଷୀଙ୍କ ଖେତରୁ ତାଜା"
                    else -> "Fresh From Farm"
                },
                fontSize = 25.sp,
                modifier = Modifier.align(Alignment.End),
                color = colorResource(id = R.color.c1),
                fontWeight = FontWeight.Bold
            )
            Text(
                text = when (selectedLanguage) {
                    "Hindi" -> "सीधे आपके दरवाजे तक"
                    "Odia" -> "ପ୍ରତ୍ୟକ୍ଷ ଆପଣଙ୍କ ଘରକୁ"
                    else ->"Direct To Doorstep"
                },
                fontSize = 25.sp,
                color = colorResource(id = R.color.c1),
                fontWeight = FontWeight.Bold
            )
        }

        Row(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(bottom = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = { navController.navigate("login / sell") },
                modifier = Modifier.padding(end = 1.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = colorResource(id = R.color.c1)
                )
            ) {
                Text(
                    text = when (selectedLanguage) {
                        "Hindi" -> "बेचें"
                        "Odia" -> "ବିକ୍ରୟ"
                        else -> "Sell"
                    },
                    color = Color.Black,
                    fontSize = 15.sp
                )
            }

            Button(
                onClick = { navController.navigate("login / buy") },
                colors = ButtonDefaults.buttonColors(
                    containerColor = colorResource(id = R.color.c1)
                ),
                modifier = Modifier.padding(start = 8.dp, end = 8.dp)
            ) {
                Text(
                    text = when (selectedLanguage) {
                        "Hindi" -> "खरीदें"
                        "Odia" -> "କିଣନ୍ତୁ"
                        else -> "Buy"
                    },
                    color = Color.Black,
                    fontSize = 15.sp
                )
            }

            LanguageIconSelector(
                selectedLanguage = selectedLanguage,
                onLanguageChange = onLanguageChange
            )
        }
    }
}

// ✅ Language Icon Selector
@Composable
fun LanguageIconSelector(
    selectedLanguage: String,
    onLanguageChange: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        IconButton(onClick = { expanded = !expanded }) {
            Image(
                painter = painterResource(id = R.drawable.multilingual),
                contentDescription = "Change Language",
                modifier = Modifier.size(30.dp)
            )
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            DropdownMenuItem(
                text = { Text("ଓଡ଼ିଆ") },
                onClick = {
                    expanded = false
                    onLanguageChange("Odia")
                }
            )
            DropdownMenuItem(
                text = { Text("हिंदी") },
                onClick = {
                    expanded = false
                    onLanguageChange("Hindi")
                }
            )
            DropdownMenuItem(
                text = { Text("English") },
                onClick = {
                    expanded = false
                    onLanguageChange("English")
                }
            )
        }
    }
}

// ✅ FAQ Section
@Composable
fun FAQSection(faqItems: List<FAQItem>, selectedLanguage: String) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = when (selectedLanguage) {
                "Hindi" -> "अक्सर पूछे जाने वाले प्रश्न"
                "Odia" -> "ବାରମ୍ବାର ପଚାରାଯାଉଥିବା ପ୍ରଶ୍ନଗୁଡ଼ିକ"
                else -> "Frequently Asked Questions"
            },
            fontSize = 25.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(max = 500.dp), // Add a reasonable max height
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(faqItems) { faqItem ->
                FAQItemCard(faqItem = faqItem, selectedLanguage = selectedLanguage)
            }
        }
    }
}


// ✅ FAQ Item Card
@Composable
fun FAQItemCard(faqItem: FAQItem, selectedLanguage: String) {
    var expanded by remember { mutableStateOf(false) }

    val question = when (selectedLanguage) {
        "Hindi" -> faqItem.questionHindi
        "Odia" -> faqItem.questionOdia
        else -> faqItem.question
    }

    val answer = when (selectedLanguage) {
        "Hindi" -> faqItem.answerHindi
        "Odia" -> faqItem.answerOdia
        else -> faqItem.answer
    }


    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { expanded = !expanded },
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = question,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
            AnimatedVisibility(visible = expanded) {
                Text(
                    text = answer,
                    fontSize = 16.sp,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
        }
    }
}

// ✅ Footer Section
@Composable
fun Footer(navController: NavHostController, context: Context) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .background(color = Color.Transparent),
        horizontalAlignment = Alignment.Start // Align items to the start
    ) {
        // Copyright Section
        Text(
            text = "Copyright @ 2025 Farm2U",
            color = colorResource(id = R.color.teal_700),
            fontWeight = FontWeight.Bold,
        )

        Text(
            text = "All Rights Reserved",
            color = colorResource(id = R.color.teal_700),
            fontWeight = FontWeight.Bold,
        )



        // Navigation Links
        Text(
            text = "About Us",
            color = colorResource(id = R.color.teal_700),
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .clickable { navController.navigate("about_us") }

        )

        Text(
            text = "Contact Us",
            color = colorResource(id = R.color.teal_700),
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .clickable { openEmailClient(context, "chhayakantdash143@gmail.com") }

        )

        Text(
            text = "Privacy Policy",
            color = colorResource(id = R.color.teal_700),
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .clickable { navController.navigate("privacy_policy") }

        )
    }
}
