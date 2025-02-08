"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAudio } from "@/components/audio-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const affirmations = [
  "I am worthy of love, respect, and positive energy.",
  "Every day is a new opportunity for growth and happiness.",
  "I trust in my ability to overcome challenges.",
  "I am grateful for all the good in my life.",
  "I choose to focus on what I can control and let go of what I cannot.",
  "I am becoming the best version of myself.",
  "My potential is limitless, and I can achieve great things.",
]

export default function SelfCarePage() {
  const { isPlaying, togglePlay } = useAudio()
  const [journalEntry, setJournalEntry] = useState("")
  const [currentAffirmation, setCurrentAffirmation] = useState("")

  useEffect(() => {
    const changeAffirmation = () => {
      const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
      setCurrentAffirmation(newAffirmation)
    }

    changeAffirmation()
    const interval = setInterval(changeAffirmation, 10000) // Change every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Journal entry:", journalEntry)
    setJournalEntry("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Self-Care Space</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Daily Affirmation</CardTitle>
                <CardDescription>Boost your mood with a positive affirmation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-center">{currentAffirmation}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Breathing Exercise</CardTitle>
                <CardDescription>Take a moment to breathe and relax</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={togglePlay} className="w-full">
                  {isPlaying ? "Pause" : "Start"} Guided Breathing
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Journaling</CardTitle>
                <CardDescription>Express your thoughts and feelings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJournalSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="w-full"
                  />
                  <Button type="submit" className="w-full">
                    Save Journal Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

