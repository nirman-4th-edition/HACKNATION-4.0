"use client"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"

export function AudioPlayer() {
  const { isPlaying, togglePlay } = useAudio()

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        onClick={togglePlay}
        variant="outline"
        className="rounded-full w-12 h-12 flex items-center justify-center"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </Button>
    </div>
  )
}

