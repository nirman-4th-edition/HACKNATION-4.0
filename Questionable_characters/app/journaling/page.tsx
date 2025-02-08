"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function JournalingPage() {
  const [entries, setEntries] = useState<{ title: string; content: string; date: string }[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && content) {
      setEntries([...entries, { title, content, date: new Date().toLocaleString() }])
      setTitle("")
      setContent("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Journal</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <Input
                type="text"
                placeholder="Entry Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
              <Textarea
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32"
              />
              <Button type="submit" className="w-full">
                Save Entry
              </Button>
            </form>
            <div className="space-y-6">
              {entries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{entry.title}</h2>
                  <p className="text-gray-600 mb-2">{entry.content}</p>
                  <p className="text-sm text-gray-400">{entry.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

