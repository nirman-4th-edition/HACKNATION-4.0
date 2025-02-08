import Link from "next/link"
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to VisionForge</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="https://v0-ai-object-detection-l0jyhg.vercel.app/object-finding"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded text-center transition duration-300 ease-in-out transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Object Detection
          </Link>
          <Link
            href="https://v0-ocr-voice-feedback-s2zfgw.vercel.app/"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded text-center transition duration-300 ease-in-out transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            OCR
          </Link>
          <Link
            href="https://multilingual-text-and-speech-translator.vercel.app/"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded text-center transition duration-300 ease-in-out transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Multi Language
          </Link>
        </div>
      </main>
    </div>
  )
}

