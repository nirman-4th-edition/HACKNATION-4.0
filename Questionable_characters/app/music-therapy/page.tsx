"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"

const playlists = [
  {
    name: "Calming Nature Sounds",
    tracks: [
      { title: "Ocean Waves", file: "/ocean-waves.mp3" },
      { title: "Forest Ambience", file: "/forest-sounds.mp3" },
      { title: "Gentle Rain", file: "/rain-sounds.mp3" },
      { title: "Mountain Stream", file: "/mountain-stream.mp3" },
      { title: "Birdsong at Dawn", file: "/birdsong-dawn.mp3" },
    ],
  },
  {
    name: "Meditation Melodies",
    tracks: [
      { title: "Zen Garden", file: "/zen-garden.mp3" },
      { title: "Tibetan Bowls", file: "/tibetan-bowls.mp3" },
      { title: "Soft Chimes", file: "/soft-chimes.mp3" },
      { title: "Om Chanting", file: "/om-chanting.mp3" },
      { title: "Crystal Singing Bowls", file: "/crystal-bowls.mp3" },
    ],
  },
  {
    name: "Relaxing Piano",
    tracks: [
      { title: "Moonlight Sonata", file: "/moonlight-sonata.mp3" },
      { title: "River Flows in You", file: "/river-flows-in-you.mp3" },
      { title: "Clair de Lune", file: "/clair-de-lune.mp3" },
      { title: "Gymnopédie No.1", file: "/gymnopedie-no1.mp3" },
      { title: "The Heart Asks Pleasure First", file: "/heart-asks-pleasure-first.mp3" },
    ],
  },
  {
    name: "Classical Masterpieces",
    tracks: [
      { title: "Canon in D - Pachelbel", file: "/canon-in-d.mp3" },
      { title: "Air on the G String - Bach", file: "/air-on-g-string.mp3" },
      { title: "Adagio for Strings - Barber", file: "/adagio-for-strings.mp3" },
      { title: "The Swan - Saint-Saëns", file: "/the-swan.mp3" },
      { title: "Spiegel im Spiegel - Arvo Pärt", file: "/spiegel-im-spiegel.mp3" },
    ],
  },
  {
    name: "Ambient Soundscapes",
    tracks: [
      { title: "Weightless - Marconi Union", file: "/weightless.mp3" },
      { title: "Ambient 1: Music for Airports - Brian Eno", file: "/music-for-airports.mp3" },
      { title: "Structures from Silence - Steve Roach", file: "/structures-from-silence.mp3" },
      { title: "Thursday Afternoon - Brian Eno", file: "/thursday-afternoon.mp3" },
      { title: "Reflection - Brian Eno", file: "/reflection.mp3" },
    ],
  },
]

export default function MusicTherapyPage() {
  const { isPlaying, togglePlay, setAudioTrack } = useAudio()
  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0])
  const [currentTrack, setCurrentTrack] = useState(currentPlaylist.tracks[0])

  const handleTrackChange = (track: { title: string; file: string }) => {
    setCurrentTrack(track)
    setAudioTrack(track.file)
    if (!isPlaying) {
      togglePlay()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Music Therapy</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Playlists</h2>
                {playlists.map((playlist, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentPlaylist(playlist)}
                    variant={currentPlaylist.name === playlist.name ? "default" : "outline"}
                    className="w-full mb-2"
                  >
                    {playlist.name}
                  </Button>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Tracks</h2>
                {currentPlaylist.tracks.map((track, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTrackChange(track)}
                    variant={currentTrack.title === track.title ? "default" : "outline"}
                    className="w-full mb-2"
                  >
                    {track.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Now Playing</h2>
              <p className="text-xl text-gray-600 mb-4">{currentTrack.title}</p>
              <Button onClick={togglePlay} className="w-full max-w-xs">
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

