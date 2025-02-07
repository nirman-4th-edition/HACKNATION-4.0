package com.example.invisonaries

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.MediaPlayer
import android.net.Uri
import android.util.Log
import android.util.Size
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.rememberImagePainter

import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.content
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.text.SimpleDateFormat
import java.util.Locale
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

// ----------------- Permission Screen --------------------

@Composable
fun PermissionHandler(
    permissions: List<String>,
    onPermissionsGranted: @Composable () -> Unit
) {
    val context = LocalContext.current
    val isGranted = remember { mutableStateOf(checkPermissions(context, permissions)) }
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { result ->
        isGranted.value = result.all { it.value }
    }

    LaunchedEffect(Unit) {
        if (!isGranted.value) {
            launcher.launch(permissions.toTypedArray())
        }
    }

    if (isGranted.value) {
        onPermissionsGranted()
    } else {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Requesting permissions...",
                textAlign = TextAlign.Center,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BakingScreen(
    bakingViewModel: BakingViewModel = viewModel()
) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current

    // Initialize TextToSpeechHelper
    val ttsHelper = remember { TextToSpeechHelper(context) }

    // Initialize MediaPlayerHelper
    val mediaPlayerHelper = remember { MediaPlayerHelper(context) }

    // State for informational dialog visibility
    var showDialog by remember { mutableStateOf(false) }

    // CameraX states
    var preview: Preview? = null
    var imageCapture: ImageCapture? = null
    var capturedImageBitmap: Bitmap? by remember { mutableStateOf(null) }
    var showCapturedImage by remember { mutableStateOf(false) }

    // Chatbot states
    var prompt by remember { mutableStateOf("") }
    val uiState by bakingViewModel.uiState.collectAsState()

    // Permissions handling
    PermissionHandler(permissions = listOf(Manifest.permission.CAMERA)) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(text = "inVisionaries") },
                    navigationIcon = {
                        IconButton(onClick = {
                            // Clear captured image and chatbot response
                            capturedImageBitmap = null
                            showCapturedImage = false
                            prompt = ""
                            bakingViewModel.clearUiState()
                            ttsHelper.stop() // Stop TTS
                            mediaPlayerHelper.stop() // Stop loading sound
                        }) {
                            Icon(
                                imageVector = androidx.compose.material.icons.Icons.Filled.ArrowBack,
                                contentDescription = "Back"
                            )
                        }
                    },
                    actions = {
                        IconButton(onClick = { showDialog = true }) {
                            Icon(
                                imageVector = androidx.compose.material.icons.Icons.Filled.Star,
                                contentDescription = "Help"
                            )
                        }
                    }
                )
            }
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {

                // Camera Preview & Capture Button
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(550.dp)
                ) {
                    AndroidView(
                        factory = { context ->
                            val previewView = PreviewView(context)
                            val cameraProviderFuture = ProcessCameraProvider.getInstance(context)

                            cameraProviderFuture.addListener({
                                val cameraProvider = cameraProviderFuture.get()
                                imageCapture = ImageCapture.Builder().build()
                                val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
                                // Add flash mode here
                                imageCapture = ImageCapture.Builder()
                                    .setFlashMode(ImageCapture.FLASH_MODE_AUTO)
                                    .build()
                                preview = Preview.Builder().build().also {
                                    it.setSurfaceProvider(previewView.surfaceProvider)
                                }

                                try {
                                    cameraProvider.unbindAll()
                                    cameraProvider.bindToLifecycle(
                                        lifecycleOwner, cameraSelector, preview!!, imageCapture!!
                                    )
                                } catch (exc: Exception) {
                                    Log.e("CameraX", "Use case binding failed", exc)
                                }
                            }, ContextCompat.getMainExecutor(context))

                            previewView
                        },
                        modifier = Modifier.fillMaxSize()
                    )

                    IconButton(
                        onClick = {
                            capturePhoto(context, imageCapture!!) { bitmap ->
                                capturedImageBitmap = bitmap
                                showCapturedImage = true

                                // Send to Gemini API (empty prompt for now)
                                bakingViewModel.sendPrompt(bitmap, "")
                            }
                        },
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(16.dp).size(72.dp),


                        ) {
                        Icon(
                            painter = painterResource(id = R.drawable.img_1),
                            contentDescription = "Take Photo",
                            modifier = Modifier.size(64.dp),
                            tint = Color.Unspecified,

                            )
                    }

                    // Display the captured image above the capture button
                    if (showCapturedImage && capturedImageBitmap != null) {
                        Image(
                            bitmap = capturedImageBitmap!!.asImageBitmap(),
                            contentDescription = "Captured Image",
                            modifier = Modifier
                                .fillMaxWidth()
                                .fillMaxHeight(),
                            contentScale = ContentScale.Crop
                        )
                    }
                }

                // Spacer to add some separation between image and chatbot response
                //Spacer(modifier = Modifier.height(16.dp))

                // Display the result from Gemini (Chatbot output)
                when (val currentState = uiState) {
                    is UiState.Loading -> {
                        CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
                        mediaPlayerHelper.play() // Play loading sound
                    }
                    is UiState.Success -> {
                        mediaPlayerHelper.stop() // Stop loading sound
                        val scrollState = rememberScrollState()
                        Text(
                            text = currentState.outputText,
                            textAlign = TextAlign.Start,
                            color = MaterialTheme.colorScheme.onSurface,
                            modifier = Modifier
                                .align(Alignment.CenterHorizontally)
                                .padding(16.dp)
                                .fillMaxSize()
                                .verticalScroll(scrollState)
                        )

                        // Speak the response using TTS
                        LaunchedEffect(currentState.outputText) {
                            ttsHelper.speak(currentState.outputText)
                        }
                    }
                    is UiState.Error -> {
                        mediaPlayerHelper.stop() // Stop loading sound
                        Text(
                            text = currentState.errorMessage,
                            color = MaterialTheme.colorScheme.error,
                            modifier = Modifier.align(Alignment.CenterHorizontally)
                        )
                    }
                    else -> {} // Initial state, do nothing
                }
            }

            // Informational dialog
            if (showDialog) {
                AlertDialog(
                    onDismissRequest = { showDialog = false },
                    title = { Text(text = "Information") },
                    text = {
                        Column {
                            Text(
                                text = "This channel features the latest Artificial Intelligence for describing an overall scene. Use caution.\n\n" +
                                        "Take a photo and hear a description of the scene it captured.\n\n" +
                                        "Tap 'More info' to hear a detailed description and to ask inVisionaries questions about the photo.\n\n" +
                                        "Image descriptions and responses are AI-generated, so mistakes are possible. To help us improve them, please send us your feedback.\n"
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(text = "Link to the YouTube video")
                        }
                    },
                    confirmButton = {
                        TextButton(
                            onClick = { showDialog = false }
                        ) {
                            Text(text = "OK")
                        }
                    }
                )
            }
        }
    }
}

fun checkPermissions(context: Context, permissions: List<String>): Boolean {
    return permissions.all {
        ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
    }
}

fun capturePhoto(
    context: Context,
    imageCapture: ImageCapture,
    onImageCaptured: (Bitmap) -> Unit
) {
    val name = SimpleDateFormat("yyyyMMddHHmmss", Locale.US).format(System.currentTimeMillis())
    val file = File(context.cacheDir, "$name.jpg")
    val outputOptions = ImageCapture.OutputFileOptions.Builder(file).build()

    imageCapture.takePicture(
        outputOptions,
        ContextCompat.getMainExecutor(context),
        object : ImageCapture.OnImageSavedCallback {
            override fun onImageSaved(output: ImageCapture.OutputFileResults) {
                val bitmap = BitmapFactory.decodeFile(file.absolutePath)
                onImageCaptured(bitmap)
            }

            override fun onError(exception: ImageCaptureException) {
                exception.printStackTrace()
            }
          }
)
}