"use client"

import { useEffect } from "react"
import SpotifyWebPlayer from "./components/MusicPlayer/SpotifyWebPlayer"
import { useSpotifyStore } from "../app/components/store/spotifyStore"

export default function PlayerProvider({ token }) {
  const setToken = useSpotifyStore((s) => s.setToken)

  useEffect(() => {
    setToken(token || null)
  }, [token, setToken])

  return <SpotifyWebPlayer/>
}
