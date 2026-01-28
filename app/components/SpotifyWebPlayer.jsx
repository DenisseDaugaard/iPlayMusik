"use client";

import { useEffect, useRef } from "react";
import { useSpotifyStore } from "./store/spotifyStore";

export default function SpotifyWebPlayer() {
  const playerRef = useRef(null);

  const token = useSpotifyStore((s) => s.token);
  const deviceId = useSpotifyStore((s) => s.deviceId);
  const uriToPlay = useSpotifyStore((s) => s.uriToPlay);

  const setDeviceId = useSpotifyStore((s) => s.setDeviceId);
  const setPlaybackState = useSpotifyStore((s) => s.setPlaybackState);
  const setTogglePlay = useSpotifyStore((s) => s.setTogglePlay);

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
  }, [token, setDeviceId, setPlaybackState, setTogglePlay]);


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


