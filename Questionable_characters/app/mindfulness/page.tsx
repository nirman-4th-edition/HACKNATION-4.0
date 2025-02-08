"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAudio } from "@/components/audio-provider"
import { AIChat } from "@/components/ai-chat"

export default function MindfulnessPage() {
  const { isPlaying, togglePlay, setAudioTrack } = useAudio()
  const [currentExercise, setCurrentExercise] = useState<string | null>(null)
  const [showAITherapist, setShowAITherapist] = useState(false)
  const [breathCount, setBreathCount] = useState(0)

  useEffect(() => {
    setAudioTrack("/meditation-music.mp3")
  }, [setAudioTrack])

  const exercises = [
    { name: "Body Scan", description: "A guided meditation to increase body awareness." },
    { name: "Thought Labeling", description: "Practice identifying and labeling your thoughts." },
    { name: "Mindful Breathing", description: "Focus on your breath to anchor yourself in the present moment." },
  ]

  const handleBreathingExercise = () => {
    setCurrentExercise("Breathing")
    setBreathCount(0)
    const interval = setInterval(() => {
      setBreathCount((prevCount) => {
        if (prevCount >= 10) {
          clearInterval(interval)
          return prevCount
        }
        return prevCount + 1
      })
    }, 5000) // 5 seconds per breath cycle
    return () => clearInterval(interval)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Mindfulness & Support</h1>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guided Meditation</CardTitle>
              <CardDescription>Relax with soothing background music</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={togglePlay} className="w-full">
                {isPlaying ? "Pause" : "Start"} Meditation Music
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Breathing Exercise</CardTitle>
              <CardDescription>Follow the animation to regulate your breathing</CardDescription>
            </CardHeader>
            <CardContent>
              {currentExercise === "Breathing" ? (
                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">{breathCount % 2 === 0 ? "Inhale" : "Exhale"}</div>
                  <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto animate-pulse"></div>
                  <div className="mt-4">Breath count: {Math.floor(breathCount / 2)}/5</div>
                </div>
              ) : (
                <Button onClick={handleBreathingExercise} className="w-full">
                  Start Breathing Exercise
                </Button>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CBT Exercises</CardTitle>
              <CardDescription>Practice cognitive behavioral techniques</CardDescription>
            </CardHeader>
            <CardContent>
              {exercises.map((exercise) => (
                <div key={exercise.name} className="mb-2">
                  <Button
                    onClick={() => setCurrentExercise(exercise.name)}
                    variant={currentExercise === exercise.name ? "default" : "outline"}
                    className="w-full text-left justify-start"
                  >
                    {exercise.name}
                  </Button>
                  {currentExercise === exercise.name && (
                    <p className="mt-2 text-sm text-gray-600">{exercise.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Therapist</CardTitle>
              <CardDescription>Get immediate support from our AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowAITherapist(!showAITherapist)} className="w-full">
                {showAITherapist ? "Close" : "Open"} AI Therapist
              </Button>
              {showAITherapist && (
                <div className="mt-4">
                  <AIChat />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

