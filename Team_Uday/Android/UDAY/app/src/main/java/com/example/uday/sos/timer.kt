package com.example.uday.sos

import android.os.Looper


class timer(listner: OnTimerclickListner){

    interface OnTimerclickListner{
        fun onTimerTick(duration: String)
    }
  private var handler = android.os.Handler(Looper.getMainLooper())
  private lateinit var runnable: Runnable

    private var duration = 0L
    private var delay = 100L

    init {
        runnable = Runnable {
            duration += delay
            handler.postDelayed(runnable,delay)
            listner.onTimerTick(format())
        }
    }

    fun start(){
        handler.postDelayed(runnable,delay)
    }
    fun pause(){
        handler.removeCallbacks(runnable)
    }

    fun stop(){
        handler.removeCallbacks(runnable)
        duration = 0L
    }

    fun format(): String {
        val mills = duration % 1000
        val seconds: Long = (duration / 1000) % 60
        val minutes: Long = (duration / (1000 * 60)) % 60
        val hours: Long = (duration / (1000 * 60 * 60))
        var formatted: String = if (hours > 0) {
            "%02d:%02d:%02d.%02d".format(hours, minutes, seconds, mills)
        } else {
            "%02d:%02d.%02d".format(minutes, seconds, mills)
        }
        return formatted
    }
}