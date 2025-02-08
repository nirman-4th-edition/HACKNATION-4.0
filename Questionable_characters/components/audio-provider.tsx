"use client"

import type React from "react"
import { createContext, useState, useContext, useRef, useEffect } from "react"

interface AudioContextType {
  isPlaying: boolean
  togglePlay: () => void
  setAudioTrack: (track: string) => void
  currentTrack: string
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("/ocean-waves.mp3")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(currentTrack)
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [currentTrack])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeAudioTrack = (track: string) => {
    setCurrentTrack(track)
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused
      audioRef.current.pause()
      audioRef.current = new Audio(track)
      audioRef.current.loop = true
      if (wasPlaying) {
        audioRef.current.play()
      }
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, setAudioTrack: changeAudioTrack, currentTrack }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

