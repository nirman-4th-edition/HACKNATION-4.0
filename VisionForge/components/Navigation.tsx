"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">VisionForge</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <button
              onClick={handleAuthClick}
              className="ml-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

