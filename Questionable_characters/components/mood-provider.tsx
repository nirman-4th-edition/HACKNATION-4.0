"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type Mood = "calm" | "stressed" | "anxious" | "happy"

interface MoodContextType {
  mood: Mood
  setMood: (mood: Mood) => void
  assessmentScore: number
  setAssessmentScore: (score: number) => void
}

const MoodContext = createContext<MoodContextType | undefined>(undefined)

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<Mood>("calm")
  const [assessmentScore, setAssessmentScore] = useState<number>(0)

  return (
    <MoodContext.Provider value={{ mood, setMood, assessmentScore, setAssessmentScore }}>
      {children}
    </MoodContext.Provider>
  )
}

export function useMood() {
  const context = useContext(MoodContext)
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider")
  }
  return context
}

