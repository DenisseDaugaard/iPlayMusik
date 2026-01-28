"use client"

import { useEffect } from "react"
import SpotifyWebPlayer from "./components/SpotifyWebPlayer"
import {useSpotifyStore} from "./components/store/spotifyStore"

export default function PlayerProvider({ token }) {
  const setToken = useSpotifyStore((s) => s.setToken)

  useEffect(() => {
    setToken(token || null)
  }, [token, setToken])

  return <SpotifyWebPlayer/>
}
