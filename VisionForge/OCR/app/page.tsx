"use client"

import { useState, useRef } from "react"
import { createWorker } from "tesseract.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!image) return

    setIsProcessing(true)
    try {
      const worker = await createWorker("eng")
      const {
        data: { text },
      } = await worker.recognize(image)
      setOcrResult(text)
      await worker.terminate()
    } catch (error) {
      console.error("OCR processing error:", error)
      setOcrResult("Error processing image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const speakText = () => {
    if (ocrResult && !isSpeaking) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(ocrResult)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center mb-6">OCR with Voice Feedback</h1>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <Button className="w-full" onClick={() => fileInputRef.current?.click()}>
              Upload Image
            </Button>
            {image && (
              <div className="mt-4">
                <img src={image || "/placeholder.svg"} alt="Uploaded" className="max-w-full h-auto" />
              </div>
            )}
            <Button className="w-full" onClick={processImage} disabled={!image || isProcessing}>
              {isProcessing ? "Processing..." : "Process Image"}
            </Button>
            <Button className="w-full" onClick={speakText} disabled={!ocrResult || isSpeaking}>
              {isSpeaking ? "Speaking..." : "Start Voice Feedback"}
            </Button>
          </div>
          {ocrResult && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">OCR Result:</h2>
              <p className="text-sm">{ocrResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

