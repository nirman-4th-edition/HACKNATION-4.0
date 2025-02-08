"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useMood } from "@/components/mood-provider"

const questions = [
  {
    question: "How would you rate your overall mood today?",
    options: [
      { text: "Excellent", score: 0 },
      { text: "Good", score: 1 },
      { text: "Neutral", score: 2 },
      { text: "Poor", score: 3 },
      { text: "Terrible", score: 4 },
    ],
  },
  {
    question: "How well did you sleep last night?",
    options: [
      { text: "Very well", score: 0 },
      { text: "Well", score: 1 },
      { text: "Average", score: 2 },
      { text: "Poorly", score: 3 },
      { text: "Very poorly", score: 4 },
    ],
  },
  {
    question: "How would you describe your stress level?",
    options: [
      { text: "Very low", score: 0 },
      { text: "Low", score: 1 },
      { text: "Moderate", score: 2 },
      { text: "High", score: 3 },
      { text: "Very high", score: 4 },
    ],
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { setMood, setAssessmentScore } = useMood()
  const [loginType, setLoginType] = useState<"email" | "anonymous" | "google">("email")
  const [showAssessment, setShowAssessment] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAssessment(true)
  }

  const handleAnswer = (answerScore: number) => {
    const newScore = score + answerScore
    setScore(newScore)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Assessment complete
      setAssessmentScore(newScore)
      if (newScore <= 3) {
        setMood("calm")
      } else if (newScore <= 7) {
        setMood("stressed")
      } else {
        setMood("anxious")
      }
      router.push("/dashboard?newLogin=true")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 rounded-lg p-8 w-96 shadow-xl backdrop-blur-md"
      >
        {!showAssessment ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
            <div className="space-y-4 mb-6">
              <Button
                onClick={() => setLoginType("email")}
                variant={loginType === "email" ? "default" : "outline"}
                className="w-full text-white border-white hover:bg-white hover:text-blue-600"
              >
                Email Login
              </Button>
              <Button
                onClick={() => setLoginType("anonymous")}
                variant={loginType === "anonymous" ? "default" : "outline"}
                className="w-full text-white border-white hover:bg-white hover:text-purple-600"
              >
                Anonymous Mode
              </Button>
              <Button
                onClick={() => setLoginType("google")}
                variant={loginType === "google" ? "default" : "outline"}
                className="w-full text-white border-white hover:bg-white hover:text-red-600"
              >
                Google Login
              </Button>
            </div>
            {loginType === "email" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  className="bg-white bg-opacity-20 text-white placeholder-gray-300"
                />
                <Button type="submit" className="w-full bg-white hover:bg-gray-200 text-blue-600">
                  Log In
                </Button>
              </form>
            )}
            {loginType === "anonymous" && (
              <Button onClick={handleLogin} className="w-full bg-white hover:bg-gray-200 text-purple-600">
                Continue Anonymously
              </Button>
            )}
            {loginType === "google" && (
              <Button onClick={handleLogin} className="w-full bg-white hover:bg-gray-200 text-red-600">
                Continue with Google
              </Button>
            )}
          </>
        ) : (
          <Card className="bg-white bg-opacity-20 text-white">
            <CardHeader>
              <CardTitle className="text-white">Quick Assessment</CardTitle>
              <CardDescription className="text-gray-200">Help us understand how you're feeling today</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 text-white">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    variant="outline"
                    className="w-full text-left justify-start text-white border-white hover:bg-white hover:text-blue-600"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

