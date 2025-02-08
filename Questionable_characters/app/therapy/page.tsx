"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMood } from "@/components/mood-provider"
import { useAudio } from "@/components/audio-provider"
import { AIChat } from "@/components/ai-chat"

const themes = {
  ocean: {
    bg: "bg-gradient-to-r from-blue-400 to-cyan-300",
    audio: "/ocean-waves.mp3",
  },
  stars: {
    bg: "bg-gradient-to-r from-gray-900 to-blue-900",
    audio: "/night-ambience.mp3",
  },
  forest: {
    bg: "bg-gradient-to-r from-green-400 to-green-700",
    audio: "/forest-sounds.mp3",
  },
}

export default function TherapyPage() {
  const router = useRouter()
  const { mood } = useMood()
  const { isPlaying, togglePlay, setAudioTrack } = useAudio()
  const [theme, setTheme] = useState<keyof typeof themes>("ocean")

  useEffect(() => {
    setAudioTrack(themes[theme].audio)
  }, [theme, setAudioTrack])

  const handleThemeChange = (newTheme: keyof typeof themes) => {
    setTheme(newTheme)
    setAudioTrack(themes[newTheme].audio)
  }

  return (
    <div className={`min-h-screen ${themes[theme].bg} flex flex-col`}>
      <nav className="p-4 flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-white">
          Home
        </Button>
        <div>
          {Object.keys(themes).map((t) => (
            <Button
              key={t}
              variant={theme === t ? "default" : "outline"}
              onClick={() => handleThemeChange(t as keyof typeof themes)}
              className="ml-2"
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-4xl w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Healing Space</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Music Therapy</h3>
              <Button onClick={togglePlay} className="w-full mb-4">
                {isPlaying ? "Pause" : "Play"} Ambient Sound
              </Button>
              {/* Add more music therapy features here */}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Therapist</h3>
              <AIChat />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button onClick={() => router.push("/book-therapist")}>Book a Professional Therapist</Button>
          </div>
        </motion.div>
      </main>
      <footer className="p-4 text-center text-white">
        <p>"You are not alone. You matter. And you are seen. 💙"</p>
      </footer>
    </div>
  )
}

