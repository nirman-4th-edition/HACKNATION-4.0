import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.farm2u.R
import com.example.farm2u.viewModel.BuyLoginViewModel
import com.google.firebase.auth.FirebaseAuth

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun Login(
    navController: NavHostController,
    viewModel: BuyLoginViewModel = viewModel(),
    usertype: String?
) {
    val auth = FirebaseAuth.getInstance()
    val user = if (usertype == "buy") "Buyer" else "Seller"

    val showDialog = remember { mutableStateOf(false) }
    val errorMessage = remember { mutableStateOf("") }

    Scaffold(
        content = {
            // Background Image with Box Layout
            Box(
                modifier = Modifier
                    .fillMaxSize()
            ) {
                Image(
                    painter = painterResource(id = R.drawable.img_3),
                    contentDescription = "Background Image",
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.FillBounds
                )

                // Content Overlay
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Welcome $user",
                        fontSize = 24.sp,
                        style = TextStyle(color = Color.White),
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Image(
                        painter = painterResource(id = R.drawable.no_bg_logo_2),
                        contentDescription = "Login Image",
                        modifier = Modifier.size(200.dp)
                    )

                    Spacer(modifier = Modifier.height(32.dp))

                    OutlinedTextField(
                        value = viewModel.email.value,
                        onValueChange = { viewModel.email.value = it },
                        label = { Text("Email") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 8.dp),
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
                    )

                    OutlinedTextField(
                        value = viewModel.password.value,
                        onValueChange = { viewModel.password.value = it },
                        label = { Text("Password") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 8.dp)
                    )

                    Button(
                        onClick = {
                            val email = viewModel.email.value
                            val password = viewModel.password.value

                            auth.signInWithEmailAndPassword(email, password)
                                .addOnCompleteListener { task ->
                                    if (task.isSuccessful) {
                                        if (usertype == "buy") {
                                            navController.navigate("scaffold")
                                        } else {
                                            navController.navigate("verification")
                                        }
                                    } else {
                                        errorMessage.value = task.exception?.message ?: "Login failed due to an unknown error."
                                        showDialog.value = true
                                    }
                                }
                        },
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Text(
                            text = "Login",
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(8.dp)
                        )
                    }

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "Don't have an account?",
                            color = Color.White,
                            modifier = Modifier.padding(2.dp),
                        )
                        Text(
                            text = "Sign Up",
                            color = Color.Yellow,
                            modifier = Modifier
                                .padding(2.dp)
                                .clickable { navController.navigate("signup") }
                        )
                    }

                    HorizontalDivider(
                        color = Color.White,
                        thickness = 1.dp,
                        modifier = Modifier.padding(20.dp)
                    )

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.google),
                            contentDescription = "Google logo",
                            modifier = Modifier
                                .size(100.dp)
                                .clip(CircleShape)
                        )

                        Image(
                            painter = painterResource(id = R.drawable.fb),
                            contentDescription = "Facebook logo",
                            modifier = Modifier
                                .size(60.dp)
                                .clip(CircleShape)
                        )
                    }
                }

                // Error Dialog
                if (showDialog.value) {
                    AlertDialog(
                        onDismissRequest = { showDialog.value = false },
                        title = { Text("Login Failed") },
                        text = { Text(errorMessage.value) },
                        confirmButton = {
                            TextButton(onClick = { showDialog.value = false }) {
                                Text("OK")
                            }
                        }
                    )
                }
            }
        }
    )
}
