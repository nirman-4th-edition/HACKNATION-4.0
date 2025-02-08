package com.example.uday.camera

import android.os.Bundle
import android.content.Context
import android.content.DialogInterface
import android.content.pm.PackageManager
import android.os.Build
import android.os.Environment
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.uday.databinding.CameraBinding
import android.widget.Toast
import com.example.uday.R
import com.example.uday.database.ResponseMessage
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.io.*
import java.text.SimpleDateFormat
import java.util.*
import android.util.Base64
import com.example.uday.database.ImageRequest
import com.example.uday.global.phone

class camera_activity : AppCompatActivity() {

    private lateinit var binding: CameraBinding

    private val multiplePermissionId = 14
    private val multiplePermissionNameList = if (Build.VERSION.SDK_INT >= 33) {
        arrayListOf(android.Manifest.permission.CAMERA)
    } else {
        arrayListOf(android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
    }

    private var imageCapture: ImageCapture? = null
    private var cameraProvider: ProcessCameraProvider? = null
    private var cameraSelector: CameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
    private var lensFacing = CameraSelector.LENS_FACING_BACK
    private lateinit var camera: Camera  // Camera instance

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = CameraBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (checkMultiplePermission()) {
            startCamera()
        }

        binding.captureIB.setOnClickListener {
            takePhoto()
        }

        binding.flipCameraIB.setOnClickListener {
            lensFacing = if (lensFacing == CameraSelector.LENS_FACING_FRONT) CameraSelector.LENS_FACING_BACK else CameraSelector.LENS_FACING_FRONT
            startCamera()
        }

        binding.flashToggleIB.setOnClickListener {
            setFlashIcon()
        }
    }

    private fun setFlashIcon() {
        if (!this::camera.isInitialized) {
            Toast.makeText(this, "Camera is not ready yet!", Toast.LENGTH_SHORT).show()
            return
        }

        if (camera.cameraInfo.hasFlashUnit()) {
            val torchState = camera.cameraInfo.torchState.value
            if (torchState == TorchState.ON) {
                camera.cameraControl.enableTorch(false)
                binding.flashToggleIB.setImageResource(R.drawable.flash_on) // Flash OFF icon
            } else {
                camera.cameraControl.enableTorch(true)
                binding.flashToggleIB.setImageResource(R.drawable.flash_off) // Flash ON icon
            }
        } else {
            Toast.makeText(this, "Flash is not available", Toast.LENGTH_SHORT).show()
            binding.flashToggleIB.isEnabled = false
        }
    }

    private fun takePhoto() {
        val imageFolder = File(getExternalFilesDir(Environment.DIRECTORY_PICTURES)!!, "Images")
        if (!imageFolder.exists()) imageFolder.mkdirs()

        val fileName = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(System.currentTimeMillis()) + ".jpg"
        val imageFile = File(imageFolder, fileName)
        val outputOptions = ImageCapture.OutputFileOptions.Builder(imageFile).build()

        imageCapture?.takePicture(outputOptions, ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageSavedCallback {
                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                    Toast.makeText(this@camera_activity, "Photo saved!", Toast.LENGTH_SHORT).show()

                    val compressedFile = compressImage(imageFile)
                    val con = phone.userNumber
                    uploadImage(compressedFile, "con") // Send user contact
                }

                override fun onError(exception: ImageCaptureException) {
                    Toast.makeText(this@camera_activity, "Error: ${exception.message}", Toast.LENGTH_LONG).show()
                }
            }) ?: Toast.makeText(this, "ImageCapture is not initialized", Toast.LENGTH_SHORT).show()
    }

    private fun checkMultiplePermission(): Boolean {
        val listPermissionNeeded = arrayListOf<String>()
        for (permission in multiplePermissionNameList) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                listPermissionNeeded.add(permission)
            }
        }
        return if (listPermissionNeeded.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, listPermissionNeeded.toTypedArray(), multiplePermissionId)
            false
        } else {
            true
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == multiplePermissionId) {
            if (grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                startCamera()
            } else {
                warningPermissionDialog(this) { _, _ -> checkMultiplePermission() }
            }
        }
    }

    private fun warningPermissionDialog(context: Context, onClickListener: DialogInterface.OnClickListener) {
        AlertDialog.Builder(context)
            .setMessage("Permissions are required to use this feature. Please allow the permissions.")
            .setCancelable(false)
            .setPositiveButton("Retry", onClickListener)
            .setNegativeButton("Cancel") { dialog, _ -> dialog.dismiss() }
            .show()
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraProviderFuture.addListener({
            cameraProvider = cameraProviderFuture.get()
            bindCameraUserCases()
        }, ContextCompat.getMainExecutor(this))
    }

    private fun bindCameraUserCases() {
        cameraProvider?.unbindAll()

        val preview = Preview.Builder().build()
        imageCapture = ImageCapture.Builder().build()
        cameraSelector = CameraSelector.Builder().requireLensFacing(lensFacing).build()

        try {
            camera = cameraProvider?.bindToLifecycle(this, cameraSelector, preview, imageCapture)!!

            preview.setSurfaceProvider(binding.cameraView.surfaceProvider)
        } catch (exc: Exception) {
            Toast.makeText(this, "Camera binding failed: ${exc.message}", Toast.LENGTH_LONG).show()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraProvider?.unbindAll()
    }

    private fun compressImage(imageFile: File): File {
        val bitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
        val compressedFile = File(imageFile.parent, "compressed_${imageFile.name}")
        val outputStream = FileOutputStream(compressedFile)

        bitmap.compress(Bitmap.CompressFormat.JPEG, 50, outputStream)
        outputStream.flush()
        outputStream.close()

        return compressedFile
    }

    private fun encodeImageToBase64(imageFile: File): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        val bitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }

    private fun uploadImage(imageFile: File, contact: String) {
        val imageBase64 = encodeImageToBase64(imageFile)
        val imageRequest = ImageRequest(imageBase64, contact)

        RetrofitClient.apiService.uploadImage(imageRequest).enqueue(object : Callback<ResponseMessage> {
            override fun onResponse(call: Call<ResponseMessage>, response: Response<ResponseMessage>) {
                if (response.isSuccessful) {
                    Toast.makeText(applicationContext, "Image uploaded successfully!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(applicationContext, "Upload failed: ${response.message()}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<ResponseMessage>, t: Throwable) {
                Toast.makeText(applicationContext, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
