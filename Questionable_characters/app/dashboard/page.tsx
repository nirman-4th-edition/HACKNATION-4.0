"use client"
import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MeditationIcon, BrainIcon, JournalIcon, MusicIcon, TherapistIcon, ChatIcon } from "@/components/icons"
import Chatbot from "@/components/Chatbot"

function DashboardContent() {
  const router = useRouter()
  const [showWalkthrough, setShowWalkthrough] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")

  useEffect(() => {
    const justLoggedIn = searchParams.get("newLogin")
    const hasSeenWalkthrough = localStorage.getItem("hasSeenWalkthrough")
    if (justLoggedIn === "true" && !hasSeenWalkthrough) {
      setShowWalkthrough(true)
      localStorage.setItem("hasSeenWalkthrough", "true")
    }
  }, [searchParams])

  const features = [
    {
      name: "Self-Care & Relaxation",
      icon: MeditationIcon,
      route: "/self-care",
      description: "Guided exercises for relaxation and self-care",
      color: "bg-green-100 hover:bg-green-200",
      iconColor: "text-green-600",
    },
    {
      name: "Mental Health Quiz",
      icon: BrainIcon,
      route: "/assessment",
      description: "Quick assessment of your current mental state",
      color: "bg-blue-100 hover:bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      name: "Journaling",
      icon: JournalIcon,
      route: "/journaling",
      description: "Express your thoughts and track your mood",
      color: "bg-yellow-100 hover:bg-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      name: "Music Therapy",
      icon: MusicIcon,
      route: "/music-therapy",
      description: "Soothing playlists to calm your mind",
      color: "bg-purple-100 hover:bg-purple-200",
      iconColor: "text-purple-600",
    },
    {
      name: "Medical Assistance",
      icon: TherapistIcon,
      route: "/medical-assistance",
      description: "Connect with professional help when needed",
      color: "bg-red-100 hover:bg-red-200",
      iconColor: "text-red-600",
    },
    {
      name: "AI Therapist",
      icon: ChatIcon,
      action: () => setShowChatbot(true),
      description: "Chat with our AI for immediate support",
      color: "bg-indigo-100 hover:bg-indigo-200",
      iconColor: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Welcome to Your Mindful Sanctuary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`${feature.color} transition-colors duration-300`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-black">
                    <div className={`p-2 rounded-md ${feature.color} ${feature.iconColor}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span>{feature.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-black">{feature.description}</CardDescription>
                  <Button
                    className="mt-4 w-full bg-white text-black border border-black hover:bg-gray-100"
                    onClick={() => (feature.action ? feature.action() : router.push(feature.route))}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Dialog open={showWalkthrough} onOpenChange={setShowWalkthrough}>
        <DialogContent className="bg-blue-600">
          <DialogHeader>
            <DialogTitle className="text-white">Welcome to Mindful Sanctuary</DialogTitle>
          </DialogHeader>
          <div className="text-white">
            <p>Here's a quick overview of our features:</p>
            <ul className="list-disc list-inside mt-2">
              {features.map((feature, index) => (
                <li key={index}>
                  {feature.name}: {feature.description}
                </li>
              ))}
            </ul>
            <p className="mt-4">Remember, you can always access our AI chatbot by clicking the AI Therapist card.</p>
          </div>
          <Button onClick={() => setShowWalkthrough(false)} className="bg-white text-blue-600 hover:bg-gray-100 mt-4">
            Got it!
          </Button>
        </DialogContent>
      </Dialog>
      {showChatbot && <Chatbot />}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

