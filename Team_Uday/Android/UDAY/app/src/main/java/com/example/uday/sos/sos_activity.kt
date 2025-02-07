package com.example.uday.sos

import ApiService
import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.media.MediaRecorder
import android.os.Bundle
import android.util.Base64
import android.util.Log
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.example.uday.R
import com.example.uday.camera.camera_activity
import com.example.uday.camera.video_activity
import com.example.uday.database.AudioRequest
import com.example.uday.database.ResponseMessage
import com.example.uday.global.phone
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

const val REQUEST_CODE = 200

class sos_activity : AppCompatActivity(), timer.OnTimerclickListner {

    private var permission = arrayOf(Manifest.permission.RECORD_AUDIO)
    private var permissionGranted = false
    private lateinit var record: ImageButton
    private lateinit var delete: ImageButton
    private lateinit var ok: ImageButton
    private lateinit var recoder: MediaRecorder
    private var dirPath = ""
    private var filename = ""
    private var isRecording = false
    private var paused = false
    private lateinit var timetexT: TextView
    private lateinit var del: ImageButton
    private lateinit var done: ImageButton
    private lateinit var photobtn: ImageButton
    private lateinit var videobtn: ImageButton
    private lateinit var timer: timer
    private var base64Audio: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.sos_layout)

        init()

        permissionGranted = ActivityCompat.checkSelfPermission(this, permission[0]) == PackageManager.PERMISSION_GRANTED
        if (!permissionGranted) {
            ActivityCompat.requestPermissions(this, permission, REQUEST_CODE)
        }

        timer = timer(this)
        record.setOnClickListener {
            when {
                paused -> resumeRecording()
                isRecording -> pauseRecording()
                else -> startRecording()
            }
            del.isClickable = true
        }

        del.setOnClickListener {
            stopRecorder()
            val file = File("$dirPath$filename.mp3")
            if (file.exists()) {
                file.delete()
                Toast.makeText(this, "Recording Deleted", Toast.LENGTH_SHORT).show()
            }
        }

        done.setOnClickListener {
            stopRecorder()
            del.isClickable = false
            base64Audio?.let {
                sendAudioToServer(it)  // Now we use the base64Audio variable
            }
        }

        photobtn.setOnClickListener {
            val intent = Intent(this@sos_activity, camera_activity::class.java)
            startActivity(intent)
        }

        videobtn.setOnClickListener {
            val intent1 = Intent(this@sos_activity, video_activity::class.java)
            startActivity(intent1)
        }
    }

    private fun init() {
        record = findViewById(R.id.record)
        delete = findViewById(R.id.btnDelete)
        ok = findViewById(R.id.done)
        timetexT = findViewById(R.id.Timer)
        del = findViewById(R.id.btnDelete)
        done = findViewById(R.id.done)
        photobtn = findViewById(R.id.photosos)
        videobtn = findViewById(R.id.videosos)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE) {
            permissionGranted = grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED
        }
    }

    private fun startRecording() {
        if (!permissionGranted) {
            ActivityCompat.requestPermissions(this, permission, REQUEST_CODE)
            return
        }
        recoder = MediaRecorder()
        dirPath = "${getExternalFilesDir(null)?.absolutePath}/"

        val simpleDateFormat = SimpleDateFormat("yyyy.MM.DD_hh.mm.ss", Locale.getDefault())
        val date = simpleDateFormat.format(Date())
        filename = "audio_record_$date"
        recoder.apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setOutputFile("$dirPath$filename.mp3")

            try {
                recoder.prepare()
            } catch (e: IOException) {
                e.printStackTrace()
            }
            start()
        }

        record.setImageResource(R.drawable.pause_vector)
        isRecording = true
        paused = false
        timer.start()

        Toast.makeText(this, "Recording Started", Toast.LENGTH_SHORT).show()
    }

    private fun pauseRecording() {
        if (::recoder.isInitialized) {
            recoder.pause()
            paused = true
            record.setImageResource(R.drawable.voice_btn)
            timer.pause()
        }
    }

    private fun resumeRecording() {
        if (::recoder.isInitialized) {
            recoder.resume()
            paused = false
            record.setImageResource(R.drawable.pause_vector)
            timer.start()
        }
    }

    private fun stopRecorder() {
        if (::recoder.isInitialized) {
            timer.stop()
            try {
                recoder.stop()
                recoder.release()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        isRecording = false
        paused = false
        timetexT.text = "00:00:00"
        Toast.makeText(this, "Audio Added", Toast.LENGTH_SHORT).show()

        // Convert the audio file to Base64 and store internally
        val audioFile = File("$dirPath$filename.mp3")
        if (audioFile.exists()) {
            convertAudioToBase64(audioFile)
        } else {
            Toast.makeText(this@sos_activity, "Error: File does not exist", Toast.LENGTH_SHORT).show()
        }
    }

    private fun convertAudioToBase64(audioFile: File) {
        val byteArrayOutputStream = ByteArrayOutputStream()
        try {
            val fileInputStream = audioFile.inputStream()
            val buffer = ByteArray(1024)
            var length: Int
            while (fileInputStream.read(buffer).also { length = it } > 0) {
                byteArrayOutputStream.write(buffer, 0, length)
            }
            fileInputStream.close()

            // Get the byte array
            val audioBytes = byteArrayOutputStream.toByteArray()

            // Convert to Base64 string
            base64Audio = Base64.encodeToString(audioBytes, Base64.DEFAULT)

            // Show the Base64 string in a Toast message (Note: it could be very large)
            Toast.makeText(this, "Base64 Audio: $base64Audio", Toast.LENGTH_LONG).show()

        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    private fun sendAudioToServer(base64Audio: String) {
        val audioRequest = AudioRequest(
            audioBase64 = base64Audio,
            contact = phone.userNumber.toString() // Use the actual phone number or user ID
        )

        // Create a Retrofit call to send the audio
        RetrofitClient.apiService.uploadAudio(audioRequest).enqueue(object :
            Callback<ResponseMessage> {
            override fun onResponse(call: Call<ResponseMessage>, response: Response<ResponseMessage>) {
                if (response.isSuccessful) {
                    // Handle success
                    val responseMessage = response.body()?.message
                    Toast.makeText(applicationContext, responseMessage, Toast.LENGTH_SHORT).show()
                } else {
                    // Handle error
                    Toast.makeText(applicationContext, "Error: ${response.message()}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<ResponseMessage>, t: Throwable) {
                // Handle failure
                Toast.makeText(applicationContext, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }


    override fun onTimerTick(duration: String) {
        timetexT.text = duration
    }
}
