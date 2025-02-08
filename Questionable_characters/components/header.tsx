"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Menu, X, BookOpen, HeartPulse, Music, MessageSquare, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Self-Care", path: "/self-care", icon: HeartPulse },
  { name: "Journaling", path: "/journaling", icon: BookOpen },
  { name: "Music Therapy", path: "/music-therapy", icon: Music },
  { name: "AI Therapist", path: "/ai-therapy", icon: MessageSquare },
  { name: "Support", path: "/support", icon: HelpCircle },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex space-x-2">
        <Link href="/dashboard" passHref>
          <Button
            variant="default"
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gradient-to-b from-blue-600 to-purple-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className="flex items-center py-2 px-4 text-lg text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

