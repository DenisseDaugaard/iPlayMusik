import { create } from "zustand";

export const useSpotifyStore = create((set, get) => ({
  token: null,
  deviceId: null,
  uriToPlay: null,

  playingUri: null,
  isPlaying: false,
  durationMs: 0,
  positionMs: 0,

  togglePlay: null,
  seek: null,
  player: null,

  setToken: (token) => set({ token }),
  setDeviceId: (deviceId) => set({ deviceId }),
  playUri: (uri) => set({ uriToPlay: uri }),

  setTogglePlay: (fn) => set({ togglePlay: fn }),
  setSeek: (fn) => set({ seek: fn }),
  setPlayer: (player) => set({ player }),

  //  single source of truth
  setPlaybackState: ({ playingUri, isPlaying, durationMs, positionMs }) =>
    set({
      playingUri: playingUri ?? null,
      isPlaying: !!isPlaying,
      durationMs: durationMs ?? 0,
      positionMs: positionMs ?? 0,
    }),

  // helper to clear when ended
  clearPlayback: () =>
    set({
      playingUri: null,
      isPlaying: false,
      durationMs: 0,
      positionMs: 0,
      uriToPlay: null,
    }),
}));
