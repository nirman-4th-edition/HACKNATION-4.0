"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"

const musicOptions = [
  { name: "Ocean Waves", file: "/ocean-waves.mp3" },
  { name: "Lo-Fi Beats", file: "/lo-fi-beats.mp3" },
  { name: "Rain Sounds", file: "/rain-sounds.mp3" },
  { name: "Soft Piano", file: "/soft-piano.mp3" },
  { name: "Silence", file: "" },
]

export default function MusicSelectionPage() {
  const router = useRouter()
  const { togglePlay, setAudioTrack } = useAudio()
  const [selectedMusic, setSelectedMusic] = useState("")

  const handleMusicChoice = (choice: string) => {
    setSelectedMusic(choice)
    setAudioTrack(choice)
    if (choice !== "") {
      togglePlay()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Background Music</h2>
        <div className="space-y-4">
          {musicOptions.map((option) => (
            <Button
              key={option.name}
              onClick={() => handleMusicChoice(option.file)}
              className={`w-full ${selectedMusic === option.file ? "bg-purple-500 text-white" : ""}`}
              variant="outline"
            >
              {option.name}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="w-full mt-8 bg-purple-500 text-white hover:bg-purple-600"
        >
          Continue to Login
        </Button>
      </motion.div>
    </div>
  )
}

