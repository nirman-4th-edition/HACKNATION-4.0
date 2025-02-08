"use client"

import { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { Camera, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isModelLoading, setIsModelLoading] = useState(true)

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready()
        const loadedModel = await cocoSsd.load()
        setModel(loadedModel)
        setIsModelLoading(false)
        toast.success("AI model loaded successfully")
      } catch (error) {
        console.error("Error loading model:", error)
        toast.error("Failed to load AI model")
        setIsModelLoading(false)
      }
    }
    loadModel()
  }, [])

  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsWebcamActive(true)
          detectFromVideoStream()
        }
      } catch (error) {
        console.error("Error accessing webcam:", error)
        toast.error("Failed to access webcam. Please check permissions.")
      }
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsWebcamActive(false)
    }
  }

  const toggleWebcam = () => {
    if (isWebcamActive) {
      stopWebcam()
    } else {
      startWebcam()
    }
  }

  const detectFromVideoStream = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return

    const detectFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !model) return

      const predictions = await model.detect(videoRef.current)
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox
        const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`

        ctx.strokeStyle = "#00FF00"
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, width, height)

        ctx.fillStyle = "#00FF00"
        ctx.fillRect(x, y - 30, ctx.measureText(label).width + 10, 30)

        ctx.fillStyle = "#000000"
        ctx.font = "18px Arial"
        ctx.fillText(label, x, y - 5)
      })

      const newObjects = predictions.map((pred) => pred.class)
      setDetectedObjects((prevObjects) => {
        const uniqueNewObjects = newObjects.filter((obj) => !prevObjects.includes(obj))
        if (uniqueNewObjects.length > 0 && voiceEnabled) {
          speakDetections(uniqueNewObjects)
        }
        return [...new Set([...prevObjects, ...newObjects])]
      })

      if (isWebcamActive) {
        requestAnimationFrame(detectFrame)
      }
    }

    detectFrame()
  }

  const speakDetections = (objects: string[]) => {
    if (!window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(`I see ${objects.join(", ")}`)
    window.speechSynthesis.speak(utterance)
  }

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled)
    toast.success(voiceEnabled ? "Voice feedback disabled" : "Voice feedback enabled")
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && model && canvasRef.current) {
      const img = new Image()
      img.onload = async () => {
        const ctx = canvasRef.current!.getContext("2d")
        if (!ctx) return

        canvasRef.current!.width = img.width
        canvasRef.current!.height = img.height
        ctx.drawImage(img, 0, 0)

        const predictions = await model.detect(canvasRef.current!)
        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox
          const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`

          ctx.strokeStyle = "#00FF00"
          ctx.lineWidth = 2
          ctx.strokeRect(x, y, width, height)

          ctx.fillStyle = "#00FF00"
          ctx.fillRect(x, y - 30, ctx.measureText(label).width + 10, 30)

          ctx.fillStyle = "#000000"
          ctx.font = "18px Arial"
          ctx.fillText(label, x, y - 5)
        })

        const detectedClasses = predictions.map((pred) => pred.class)
        setDetectedObjects(detectedClasses)
        if (voiceEnabled) {
          speakDetections(detectedClasses)
        }
      }
      img.src = URL.createObjectURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Object Detection with Voice Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <Button onClick={toggleWebcam} disabled={isModelLoading}>
                <Camera className="mr-2 h-4 w-4" />
                {isWebcamActive ? "Stop Camera" : "Start Camera"}
              </Button>
              <Button onClick={handleVoiceToggle} variant={voiceEnabled ? "default" : "outline"}>
                <Volume2 className="mr-2 h-4 w-4" />
                {voiceEnabled ? "Voice On" : "Voice Off"}
              </Button>
              <div className="flex-1">
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isModelLoading}
                />
              </div>
            </div>
            <div className="relative aspect-video bg-muted">
              {isModelLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  Loading AI Model...
                </div>
              )}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: isWebcamActive ? "block" : "none" }}
              />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />
            </div>
            {detectedObjects.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Detected Objects:</h3>
                <div className="flex flex-wrap gap-2">
                  {detectedObjects.map((object, index) => (
                    <span key={index} className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                      {object}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

