import {create } from "zustand";
//check here 

// here I can control the spotify state
export const useSpotifyStore = create((set, get) => ({
    token: null,
    deviceId: null,
    uriToPlay: null,
    playingUri:null,
    isPlaying: false,
    togglePlay:null,
    currentState: null,

    //state setters
    seek:null,
    player: null,
    durationMs: null,
    positionMs:null,
    
    //setters
    setPlaybackState:({playingUri, isPlaying, durationMs, positionMs}) =>{
        set({
            playingUri,
            isPlaying,
            positionMs: positionMs ?? 0,
            durationMs:durationMs ?? 0,
        })
    },
    
    // actions
    setSeek: (fn) => set({ seek: fn }),
    setToken: (token) => set({ token }),
    setDeviceId: (deviceId) => set({ deviceId }),
    playUri: (uri) => set({ uriToPlay: uri }),
    setPlaybackState: ({ playingUri, isPlaying, durationMs, positionMs }) =>
    set({ playingUri, isPlaying, durationMs, positionMs }),
    // toggle

    setTogglePlay: (fn) => set({ togglePlay: fn }),
    setPlayer: (player) => set({ player }),
   
}));
