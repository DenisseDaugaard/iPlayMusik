"use client";

import { useSpotifyStore } from "@/app/components/store/spotifyStore";

export default function FullPageTrackPlaying({track}) {

     const playUri = useSpotifyStore((s) => s.playUri);
      const PlayingUri = useSpotifyStore((s) => s.playingUri);
      const isPlaying = useSpotifyStore((s) => s.isPlaying);
      const istogglePlay = useSpotifyStore((s) => s.togglePlay);
    
    
      const isCurrentPlaying = PlayingUri === track.uri;
    
      const handlePlayPause = () =>{
        if (isCurrentPlaying && istogglePlay){
          istogglePlay();
        } else {
          playUri(track.uri);
        }
      }


    return  (
        <div className="flex flex-col items-center justify-center min-h-screen text-white"
        style={{backgroundImage: `url(${track.album.images[0]?.url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          <div>
            <h1 className="text-5xl text-shadow-lg">{track.name}</h1>
            <p className="text-shadow-lg">{track.artists.map(artist => artist.name).join(", ")}</p>
          <button className="font-bold text-red-500 p-4" onClick={handlePlayPause}>
            {isCurrentPlaying && isPlaying ? "Pause" : "Play"}
          </button>
          </div>

        </div>
    )
}