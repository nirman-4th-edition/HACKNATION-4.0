"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"
import { AIChat } from "@/components/ai-chat"
import { useRouter } from "next/navigation"
import Chatbot from "@/components/Chatbot"

export default function AITherapyPage() {
  const { isPlaying, togglePlay } = useAudio()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-black mb-6">AI-Guided Therapy</h1>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">Healing Playlist</h2>
                <Button onClick={togglePlay} className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  {isPlaying ? "Pause" : "Play"} Soothing Music
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">AI Therapy Session</h2>
                <AIChat />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-black">Professional Help</h2>
                <Button
                  onClick={() => router.push("/medical-assistance")}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  View Medical Assistance Options
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Chatbot />
    </div>
  )
}

