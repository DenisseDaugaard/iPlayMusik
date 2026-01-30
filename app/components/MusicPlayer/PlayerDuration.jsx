"use client";
import { useState } from "react";
import { useSpotifyStore } from "@/app/components/store/spotifyStore";
import * as Slider from "@radix-ui/react-slider";
import { useMemo } from "react";

export default function PlayerDuration({ id, playingUri }) {

     const sameTrack = 
        typeof playingUri === 'string' 
        && (id != null) 
        && playingUri.includes(id);
    
        if(!sameTrack) return null;
       
    
        const durationMs = useSpotifyStore((s) => s.durationMs);
        //console.log(durationMs);
       const position = useSpotifyStore((s) => s.positionMs);
       const seek = useSpotifyStore((s) => s.seek);
    
       //draggin position state
        const [dragging, setDragging] = useState(false);
        const [draggingValue, setDraggingValue] = useState(0);
    
        // calculate progress
        const progress = useMemo(() => {
            if(!durationMs) return 0;
          
            return(position / durationMs) * 100;
        }, [position, durationMs]);
    
        const shown = dragging ? draggingValue : progress;
    
        const format = (ms) =>{
            const min = Math.floor(ms / 60000);
            const sec = Math.floor((ms % 60000) / 1000);
            return `${min}:${sec < 10 ? `0${sec}` : sec}`;
        }
    
        // calculate shownMs or the progress in milisecunds
        const shownMs = durationMs ? (shown / 100) * durationMs : 0;
        //console.log('miliseconds in min,sec fotmat',format(8000000));
    
        return(
            < div className="relative w-full mt-4">
            <Slider.Root
            className="slider relative flex items-center select-none touch-none w-full h-5"
            value={[shown]}
            max={100}
            step={0.1}
            radioGroup="sm"
            color="orange"
            onValueChange={([v]) =>{
                setDragging(true)
                setDraggingValue(v)
            }}
            onValueCommit={([v]) =>{
                setDragging(false)
                 if (!seek || !durationMs) return;
              const nextMs = Math.round((v / 100) * durationMs);
              seek(nextMs);
            }}
            >
            <Slider.Track className="slider-track bg-[rgba(196,183,171,0.50)] relative h-2 rounded-full w-full">
              <Slider.Range className="slider-range bg-orange-500 absolute h-2 rounded-full" style={{width: `${shown}%`}} />
            </Slider.Track>
          
            <Slider.Thumb className="thumb absolute left-[-10px] top-[-8px] block h-4 w-4 rounded-full bg-orange-500 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 z-50" />
            </Slider.Root>
    
            <div className="mt-2 flex justify-between text-sm text-orange-500">
                <span className="font-bold text-shadow">{format(shownMs)}</span>
                <span className="font-bold">{format(durationMs)}</span>
            </div>
    
            </div>
        )
        

}