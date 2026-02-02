"use client";
import { usePathname } from "next/navigation"
import { useSpotifyStore } from "../store/spotifyStore";
import Link from "next/link";
//import { useEffect, useState } from "react"
import { PiVinylRecordBold } from "react-icons/pi";



export default function BackGroundPlayer() {
  const playingUri = useSpotifyStore((s) => s.playingUri);
  const isPlaying = useSpotifyStore((s) => s.isPlaying);
  const pathname = usePathname();

  const id = playingUri ? playingUri.split(":").at(-1) : null;

  if (!playingUri || !isPlaying || pathname.includes("play-list") || pathname.includes("/music/album/")) {
    return null;
  }

  return (
    <Link href={`/player/${id}`} prefetch={false}>
      <div className="z-50 fixed rounded-[50%] bottom-[12%] left-[8%] p-4 h-[4rem] w-[4rem] bg-[linear-gradient(159deg,rgba(255,17,104,0.98)_24%,rgba(241,141,5,1)_100%)] flex items-center justify-center hover:scale-110 cursor-pointer">
        <PiVinylRecordBold className="animate-spin text-3xl" />
      </div>
    </Link>
  );
}
