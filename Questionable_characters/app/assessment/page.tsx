"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMood } from "@/components/mood-provider"

const questions = [
  {
    question: "Have you been carrying something heavy that no one else seems to notice?",
    options: [
      { text: "No, I'm okay.", score: 0 },
      { text: "Sometimes, but I manage.", score: 1 },
      { text: "Yes, it's been tough.", score: 2 },
    ],
  },
  {
    question: "When the hard days come, do you have someone who truly sees you?",
    options: [
      { text: "Yes, I have support.", score: 0 },
      { text: "I have someone, but it's complicated.", score: 1 },
      { text: "I feel alone most of the time.", score: 2 },
    ],
  },
  {
    question: "Does sleep come easy for you, or does your mind keep running?",
    options: [
      { text: "I sleep well.", score: 0 },
      { text: "It depends on the day.", score: 1 },
      { text: "My mind never stops.", score: 2 },
    ],
  },
  {
    question: "Have you ever felt like you were drowning in stress, even when everything looked fine on the outside?",
    options: [
      { text: "Not really, I'm okay.", score: 0 },
      { text: "Sometimes, but I try to manage.", score: 1 },
      { text: "Yes, all the time.", score: 2 },
    ],
  },
  {
    question: "If things ever got too dark, do you have a plan—a person, a place, something to hold on to?",
    options: [
      { text: "Yes, I have a plan.", score: 0 },
      { text: "I think so, but I'm not sure.", score: 1 },
      { text: "No, I don't.", score: 2 },
    ],
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const { setMood, setAssessmentScore } = useMood()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (answerScore: number) => {
    const newScore = score + answerScore

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setScore(newScore)
    } else {
      // Final score calculation
      setAssessmentScore(newScore)
      if (newScore <= 3) {
        setMood("calm")
        router.push("/self-care")
      } else if (newScore <= 7) {
        setMood("stressed")
        router.push("/mindfulness")
      } else {
        setMood("anxious")
        router.push("/ai-therapy")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{questions[currentQuestion].question}</h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left justify-start text-indigo-700 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                  variant="outline"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="mt-8 h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full bg-indigo-500"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

