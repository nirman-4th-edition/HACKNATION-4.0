"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function PersonalizedHealingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [affirmation, setAffirmation] = useState("")

  useEffect(() => {
    // Simulate progress calculation
    setProgress(Math.floor(Math.random() * 100))

    // Simulate fetching a personalized affirmation
    const affirmations = [
      "You are stronger than you know.",
      "Every day is a new opportunity for growth.",
      "Your journey is uniquely yours, and that's beautiful.",
      "Small steps lead to big changes.",
      "You are worthy of love and respect.",
    ]
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])
  }, [])

  return (
    <div className="min-h-screen bg-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Your Healing Journey</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Healing Progress</h2>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">
              You've made {progress}% progress on your healing journey. Keep going!
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Today's Affirmation</h2>
            <p className="text-lg text-center italic">{affirmation}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Continue your daily check-ins</li>
              <li>Practice mindfulness for 10 minutes each day</li>
              <li>Reach out to a friend or family member</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center space-y-4">
          <Button onClick={() => router.push("/assessment")} variant="outline" className="w-full">
            Take Another Assessment
          </Button>
          <Button onClick={() => router.push("/")} className="w-full">
            Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

