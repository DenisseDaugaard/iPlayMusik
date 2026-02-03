"use client";

import Image from "next/image";
import { useSpotifyStore } from "@/app/components/store/spotifyStore";
import { FaPauseCircle } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { IoMdPlayCircle } from "react-icons/io";

export default function TrackPlayer({ track }) {
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

  return (
    <>
      <li key={track.id} className="mb-2">
        <div className={`flex items-center w-full gap-4 relative ${isCurrentPlaying ? "bg-[linear-gradient(159deg,rgba(255,17,104,0.34)_24%,rgba(241,141,5,1)_100%)] rounded-lg p-1" : ""}`}>
            <button type="button" onClick={handlePlayPause}>
              {isCurrentPlaying ? (
                <div className="relative w-[50px] shrink-0">
                <Image
                src={track.album.images[0]?.url}
                alt={track.name}
                width={50}
                height={50}
                loading="lazy"
                className="rounded-lg"
                />
                { istogglePlay && isPlaying ? ( 
                  <FaPauseCircle size={24} className="text-red-500 absolute top-[30%] left-[25%]"/>) :
                  (<IoMdPlayCircle size={24} className="text-red-500 absolute top-[30%] left-[25%]"/>)}
               
                </div>
              ) : (
                <Image
                  src="/play_icon.png"
                  alt="Play Button" 
                  width={24}
                  height={24}
                  loading="lazy"
                  className="cursor-pointer ml-2"
                />

              )}
            </button>
          <span>
          <p className="font-medium">{track.name.replace(/\s*(\([^)]*\)|-.*)$/, "")}</p>
          <p className="text-sm text-gray-400">{track.artists.map(artist => artist.name).join(", ")}</p>
            </span>
          {isCurrentPlaying && isPlaying && (
            <ScaleLoader height={15} width={3} color="#f3ece680" className="mt-1"/>
          )}
        </div>      
      </li>
    </>
  );
}

