import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.farm2u.R
import com.example.farm2u.navigation.Screens
import com.example.farm2u.viewModel.signUpViewModel
import com.google.firebase.auth.FirebaseAuth

@Composable
fun SignUp(
    navController: NavHostController,
    viewModel: signUpViewModel = viewModel()
) {
    val auth = FirebaseAuth.getInstance()

    // State for controlling the visibility of the AlertDialog
    val showDialog = remember { mutableStateOf(false) }
    val errorMessage = remember { mutableStateOf("") }

    // Background with Box
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        // Background Image
        Image(
            painter = painterResource(id = R.drawable.img_4),
            contentDescription = "Background Image",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.FillHeight
        )

        // Main Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.Start
        ) {
            IconButton(
                onClick = { navController.navigate("buylogin") },
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = Color.White
                )
            }

            Text(
                text = "Sign Up",
                fontSize = 35.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color.White,
                modifier = Modifier.padding(start = 10.dp)
            )

            Text(
                text = "Register with your valid credentials",
                fontSize = 15.sp,
                color = Color.White,
                modifier = Modifier.padding(start = 10.dp, top = 5.dp, bottom = 5.dp)
            )

            Image(
                painter = painterResource(id = R.drawable.no_bg_logo_2),
                contentDescription = "Login Image",
                modifier = Modifier.size(200.dp).align(Alignment.CenterHorizontally)
            )

            Spacer(modifier = Modifier.height(32.dp))

            Form(navController, viewModel, auth, showDialog, errorMessage)
        }

        // AlertDialog for Sign Up failure
        if (showDialog.value) {
            AlertDialog(
                onDismissRequest = { showDialog.value = false },
                title = { Text("Sign Up Failed") },
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

@Composable
fun Form(
    navController: NavHostController,
    viewModel: signUpViewModel,
    auth: FirebaseAuth,
    showDialog: MutableState<Boolean>,
    errorMessage: MutableState<String>
) {
    Column(
        modifier = Modifier

            .fillMaxWidth()
            .background(Color.White.copy(alpha = 0.9f), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Name field
        OutlinedTextField(
            value = viewModel.name.value,
            onValueChange = { viewModel.name.value = it },
            label = { Text("Name") },
            modifier = Modifier.fillMaxWidth()
        )

        // Email field
        OutlinedTextField(
            value = viewModel.eemail.value,
            onValueChange = { viewModel.eemail.value = it },
            label = { Text("Email") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            modifier = Modifier.fillMaxWidth()
        )

        // New password field
        OutlinedTextField(
            value = viewModel.newpassword.value,
            onValueChange = { viewModel.newpassword.value = it },
            label = { Text("New Password") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            modifier = Modifier.fillMaxWidth()
        )

        // Confirm password field
        OutlinedTextField(
            value = viewModel.confirmpassword.value,
            onValueChange = { viewModel.confirmpassword.value = it },
            label = { Text("Confirm Password") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = {
                val email = viewModel.eemail.value
                val password = viewModel.newpassword.value
                val name = viewModel.name.value

                if (password == viewModel.confirmpassword.value) {
                    auth.createUserWithEmailAndPassword(email, password)
                        .addOnCompleteListener { task ->
                            if (task.isSuccessful) {
                                navController.popBackStack()
                            } else {
                                errorMessage.value = task.exception?.message ?: "Sign Up Failed"
                                showDialog.value = true
                            }
                        }
                } else {
                    errorMessage.value = "Passwords do not match!"
                    showDialog.value = true
                }
            },
            modifier = Modifier
                .padding(top = 16.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(8.dp))
        ) {
            Text(text = "Sign Up")
        }

        Row {
            Text(
                text = "Already have an account?",
                fontSize = 15.sp,
                modifier = Modifier.padding(top = 10.dp)
            )
            Text(
                text = "Login",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color.Blue,
                modifier = Modifier
                    .padding(top = 10.dp, start = 5.dp)
                    .clickable { navController.popBackStack() }
            )
        }
    }
}
