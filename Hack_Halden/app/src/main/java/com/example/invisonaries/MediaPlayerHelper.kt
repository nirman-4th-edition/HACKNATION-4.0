package com.example.invisonaries


import android.content.Context
import android.media.MediaPlayer

class MediaPlayerHelper(context: Context) {
    private val mediaPlayer: MediaPlayer = MediaPlayer.create(context, R.raw.loading)

    fun play() {
        if (!mediaPlayer.isPlaying) {
            mediaPlayer.start()
        }
    }

    fun stop() {
        if (mediaPlayer.isPlaying) {
            mediaPlayer.stop()
            mediaPlayer.prepare() // Prepare the media player for the next play
        }
    }

    fun release() {
        mediaPlayer.release()
    }
}