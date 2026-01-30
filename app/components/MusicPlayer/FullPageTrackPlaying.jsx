"use client";

import { useSpotifyStore } from "@/app/components/store/spotifyStore";
import GoBackArrow from "../Header/GoBackArrow";
import PlayerDuration from "./PlayerDuration";

import { PuffLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


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
        style={{backgroundImage: `url(${track.album.images[0]?.url})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'}}>

           <div className="absolute top-0 left-0 w-full p-6 grid grid-cols-3 gap-4 flex items-center z-50">
            <div className="rounded-[50%] bg-[linear-gradient(45deg,rgb(255,45,122)_41%,rgba(252,176,69,1)_100%)] w-8 h-8 flex items-center justify-center">
              <GoBackArrow />
            </div>
            <p className="text-xl center text-shadow-lg font-bold">PLAYING</p>
          </div>

         <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(236,182,138,0.61)_0%,rgba(232,79,19,0.35)_100%)]" />{/* overlay for better text visibility */}
          
          <PuffLoader className="gradiant-spinner absolute top-[50%] traslate-y-[50%] z-50" 
          size={300}
          loading={isCurrentPlaying && isPlaying}
          color="#e4620bc2"
          />

          <div className="fixed bottom-[10%] left-1/2 translate-x-[-50%] text-center w-10/12">
            <h1 className="text-2xl text-shadow-lg">{track.name}</h1>
            <p className="text-shadow-lg">{track.artists.map(artist => artist.name).join(", ")}</p>
            
              <PlayerDuration id={track.id} playingUri={PlayingUri} />
            <button className="font-bold text-4xl p-4" onClick={handlePlayPause}>
            {isCurrentPlaying && isPlaying ? (
              <FaPause className="icon-gradient" />
            ) : (
              <FaPlay className="icon-gradient" />
            )}
           </button>

            
          </div>

        </div>
    )
}