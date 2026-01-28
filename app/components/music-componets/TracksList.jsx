"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TrackList({ data, limit }) {
  const [visible, setVisible] = useState(limit);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };

  return (
    <>
      {data.tracks.slice(0, visible).map((track) => (
        <div
          key={track.id}
          className="relative w-[300px] h-[300px] rounded-xl overflow-hidden mt-12"
        >
         <Link href={`/player/${encodeURIComponent(track.id)}`} className="absolute inset-0">
            <Image
              src={track.album.images[0]?.url}
              alt={track.name}
              fill
              className="object-cover"
              loading="lazy"
            />
         </Link>
    
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 z-10 text-3xl text-white font-bold leading-tight">
              {track.name}
          </div>
        </div>
      ))}

      {visible < data.tracks.length && (
        <button
          onClick={handleLoadMore}
          className="border-2 py-2 px-4 rounded-[1rem] flex justify-self-center mt-4"
        >
          Load More
        </button>
      )}
    </>
  );
}
