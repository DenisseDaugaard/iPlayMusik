"use client";

import { useEffect, useRef } from "react";
import { useSpotifyStore } from "../store/spotifyStore";

export default function SpotifyWebPlayer() {
  const playerRef = useRef(null);

  const token = useSpotifyStore((s) => s.token);
  const deviceId = useSpotifyStore((s) => s.deviceId);
  const uriToPlay = useSpotifyStore((s) => s.uriToPlay);
  const setDeviceId = useSpotifyStore((s) => s.setDeviceId);
  //set playback state in store
  const setPlaybackState = useSpotifyStore((s) => s.setPlaybackState);
  //clear playback store when needed
  const clearPlayback = useSpotifyStore((s) => s.clearPlayback);

  const setTogglePlay = useSpotifyStore((s) => s.setTogglePlay);
  const setSeek = useSpotifyStore((s) => s.setSeek);

  useEffect(() => {
    if (!token) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Next.js Web Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      playerRef.current = player;

     // set toggle play function in store
      setTogglePlay(() => {
        player.togglePlay().then(() => {
          console.log("toggle playback");
        });
      });

      // Seek to a minute into the track
      setSeek(() => (ms) => player.seek(ms));


      // REQUIRED: get device id
      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Helpful errors (these often explain “stuck loading”)
      player.addListener("initialization_error", ({ message }) => console.error(message));
      player.addListener("authentication_error", ({ message }) => console.error(message));
      player.addListener("account_error", ({ message }) => console.error(message));
      player.addListener("playback_error", ({ message }) => console.error(message));

      player.addListener("player_state_changed", (state) => {
        const current = state?.track_window?.current_track;
        setPlaybackState({
          playingUri: current?.uri ?? null,
          isPlaying: state ? !state.paused : false,
          durationMs: state?.duration ?? 0,
          positionMs: state?.position ?? 0,
        });
      });

      player.connect();
    };

    // load SDK once
    if (!document.getElementById("spotify-sdk")) {
      const script = document.createElement("script");
      script.id = "spotify-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.Spotify) {
      window.onSpotifyWebPlaybackSDKReady?.();
    }

    return () => {
      try {
        playerRef.current?.disconnect();
      } catch {}
    };
  }, [token, setDeviceId, setPlaybackState, setTogglePlay, setSeek]);


  //here comes the Slider update logic
 useEffect(() => {
  if (!token) return;

  const EPSILON_MS = 1200; // tolerance for end-of-track rounding

  const interval = setInterval(async () => {
    const p = playerRef.current;
    if (!p) return;

    const state = await p.getCurrentState();

    // If Spotify returns null state, treat as no active playback
    if (!state) {
      clearPlayback();
      return;
    }

    const current = state.track_window?.current_track;
    const durationMs = state.duration ?? 0;
    const positionMs = state.position ?? 0;
    const isPlaying = !state.paused;

    const ended =
      state.paused &&
      durationMs > 0 &&
      positionMs >= durationMs - EPSILON_MS;

    if (ended) {
      clearPlayback();
      return;
    }

    setPlaybackState({
      playingUri: current?.uri ?? null,
      isPlaying,
      durationMs,
      positionMs,
    });
  }, 500);

  return () => clearInterval(interval);
}, [token, setPlaybackState, clearPlayback]);



  useEffect(() => {
    async function play() {
      if (!token || !deviceId || !uriToPlay) return;

      const res = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: [uriToPlay] }),
        }
      );

      if (!res.ok) {
        console.error("Failed to start playback:", res.status, await res.text());
      }
    }

    play();
  }, [uriToPlay, deviceId, token,]);

  return null;
}


