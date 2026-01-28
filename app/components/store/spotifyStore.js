import {create } from "zustand";

// here I can control the spotify state
export const useSpotifyStore = create((set) => ({
    token: null,
    deviceId: null,
    uriToPlay: null,
    playingUri:null,
    isPlaying: false,
    togglePlay:null,

    setToken: (token) => set({ token }),
    setDeviceId: (deviceId) => set({ deviceId }),
    playUri: (uri) => set({ uriToPlay: uri }),
    setPlaybackState: ({ playingUri, isPlaying }) =>
    set({ playingUri, isPlaying }),
    // toogle
    setTogglePlay: (fn) => set({ togglePlay: fn }),
}));
