"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const articles = [
  {
    title: "Understanding Anxiety: Causes, Symptoms, and Coping Strategies",
    description: "Learn about the different types of anxiety disorders and effective ways to manage them.",
    content: "Anxiety is a normal human emotion that everyone experiences from time to time...",
  },
  {
    title: "The Importance of Self-Care in Mental Health",
    description: "Discover why self-care is crucial for maintaining good mental health and wellbeing.",
    content:
      "Self-care is any activity that we do deliberately to take care of our mental, emotional, and physical health...",
  },
  {
    title: "Mindfulness Meditation: A Beginner's Guide",
    description: "Learn the basics of mindfulness meditation and how it can improve your mental health.",
    content:
      "Mindfulness meditation is a mental training practice that involves focusing your mind on your experiences...",
  },
  {
    title: "Recognizing and Dealing with Depression",
    description: "Understand the signs of depression and explore various treatment options.",
    content:
      "Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition...",
  },
  {
    title: "Building Resilience: Bouncing Back from Life's Challenges",
    description: "Learn strategies to develop mental toughness and adaptability in the face of adversity.",
    content:
      "Resilience is the ability to adapt well in the face of adversity, trauma, tragedy, threats, or significant sources of stress...",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Mental Health Support</h1>
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-8"
        />
        <div className="space-y-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{article.content.substring(0, 150)}...</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

