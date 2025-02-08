"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useMood } from "@/components/mood-provider"

export default function ResultsPage() {
  const router = useRouter()
  const { mood } = useMood()

  const getRecommendation = () => {
    switch (mood) {
      case "calm":
        return {
          title: "A little overwhelmed? Let's take a deep breath together. 🌿",
          recommendations: [
            "Try our AI-guided breathing exercise",
            "Explore motivational journaling prompts",
            "Listen to our uplifting music recommendations",
          ],
        }
      case "happy":
        return {
          title: "You're carrying a lot. Let's create space to heal. 💙",
          recommendations: [
            "Engage in interactive CBT exercises",
            "Experience our guided meditation & mindfulness audio",
            "Join our anonymous peer support forum",
          ],
        }
      case "stressed":
      default:
        return {
          title: "You are not alone. We are here, step by step. 🤍",
          recommendations: [
            "Start an AI-driven virtual therapy session",
            "Listen to your personalized healing playlist",
            "Explore therapist recommendations",
          ],
        }
    }
  }

  const recommendation = getRecommendation()

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${
        mood === "calm"
          ? "from-green-200 to-blue-200"
          : mood === "happy"
            ? "from-yellow-200 to-orange-200"
            : "from-pink-200 to-purple-200"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{recommendation.title}</h2>
        <ul className="space-y-4 mb-8">
          {recommendation.recommendations.map((rec, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="mr-2 text-green-500">✓</span>
              {rec}
            </li>
          ))}
        </ul>
        <Button onClick={() => router.push("/therapy")} className="w-full">
          Start Your Healing Journey
        </Button>
      </motion.div>
    </div>
  )
}

