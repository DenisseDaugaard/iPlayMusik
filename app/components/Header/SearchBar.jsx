"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {

    const [q, setQ] = useState('');
    const [results, setResults] = useState(null);

    async function onSubmit(e){
        e.preventDefault();

        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}` +
          `&type=album,playlist,track,artist&limit=10`;
    
        const res = await fetch(`/api/getmusic?url=${encodeURIComponent(url)}`);
    
        const data = await res.json();
        //console.log(data);
    
        setResults(data);
    }


    return (

    <>
       <form onSubmit={onSubmit}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
      </form>
      {results ? (
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Se Results:</h2>
            {results?.tracks?.items.map(track =>(
                <div key={track.id} className="mb-2 p-2">
                    <ul>
                        <li>
                            <Link href={`/player/${track.id}`}>
                                <div className="flex items-center">
                                    <Image
                                    src={track.album.images[0].url}
                                    alt={track.name}
                                    width={40}
                                    height={40}
                                    className="inline-block mr-2 rounded-md"
                                    />
                                    <span>
                                        <p className="font-semibold">{track.name}</p>
                                        <p className="text-sm text-gray-600">{track.artists.map(artist => artist.name).join(', ')}</p>
                                    </span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            ))}

        </div> ): (<p className="mt-4">No results</p>
      )}   
    </>
    )

}