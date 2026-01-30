"use client";
import { usePathname } from "next/navigation"
import { useSpotifyStore } from "../store/spotifyStore";
import Link from "next/link";
//import { useEffect, useState } from "react"
import { GiMusicalNotes } from "react-icons/gi";
import { PiVinylRecordBold } from "react-icons/pi";



export default function BackGroundPlayer(){

    const PlayingUri = useSpotifyStore((s) => s.playingUri);
    const pathname = usePathname();
    const id = PlayingUri ? PlayingUri.split(":").at(-1) : null;

    // //get info about the currently playing track
    // const url = `https://api.spotify.com/v1/tracks/${id}`;
    
    
    if(!PlayingUri || pathname.includes("play-list")){
        console.log('nothing PLYING '); 
        return null;
    }
    
    return(
        <>
        <Link href={`/player/${id}`}>
        {/* <div className="w-full z-50 fixed bottom-0 p-4 h-[8rem] bg-[linear-gradient(159deg,rgba(255,17,104,0.98)_24%,rgba(241,141,5,1)_100%)]">
           <h1 className="text-center">Background Player</h1> 
        </div> */}
        <div className="z-50 fixed rounded-[50%] bottom-[12%] left-[8%] p-4 h-[4rem] w-[4rem] bg-[linear-gradient(159deg,rgba(255,17,104,0.98)_24%,rgba(241,141,5,1)_100%)] flex items-center justify-center hover:scale-110 cursor-pointer">
            <PiVinylRecordBold className="animate-spin text-3xl"/>
        </div>
        </Link>

        </>

    )

}