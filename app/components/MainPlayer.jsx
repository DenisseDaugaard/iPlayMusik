"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { usePlayerStore } from "./store/playerStore"
import Image from "next/image"

export default function MainPlayer() {
  const router = useRouter()
  const audioRef = useRef(null)

  const currentTrack = usePlayerStore((s) => s.currentTrack)
  const isPlaying = usePlayerStore((s) => s.isPlaying)
  const togglePlay = usePlayerStore((s) => s.togglePlay) // or togglePlay/toggle depending on your store

  //Hooks always run (no early return above this)

  useEffect(() => {
    if (!audioRef.current) return
    if (!currentTrack?.url) return

    audioRef.current.src = currentTrack.url

    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentTrack?.id]) // when track changes

  useEffect(() => {
    if (!audioRef.current) return
    if (!currentTrack?.url) return

    if (isPlaying) audioRef.current.play().catch(() => {})
    else audioRef.current.pause()
  }, [isPlaying, currentTrack?.url])

  // Now it’s safe to conditionally render UI
  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-3">
      <audio ref={audioRef} />

      <div
        onClick={() => router.push(`/player/${currentTrack.id}`)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div>
          <p>{currentTrack.title}</p>
          <p className="text-sm opacity-70">{currentTrack.artist}</p>
          <Image
            src={currentTrack.image}
            alt={currentTrack.title}
            width={64}
            height={64}
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      {!currentTrack.url && (
        <p className="text-xs opacity-70 mt-2">
          No preview_url for this track (can’t play in browser).
        </p>
      )}
    </div>
  )
}
