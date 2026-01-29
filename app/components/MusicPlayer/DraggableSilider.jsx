"use client";

import {useState, useMemo} from "react";
import  * as Slider  from "@radix-ui/react-slider";
import { useSpotifyStore } from "@/app/components/store/spotifyStore";


export default function DraggableSlider() {

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
        < div className="relative">
        <Slider.Root
        className="slider"
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
      
        <Slider.Thumb className="thumb absolute left-[-12px] top-[-18px] block h-4 w-4 rounded-full bg-orange-500 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 z-50" />
        </Slider.Root>

        <div className="mt-2 flex justify-between text-sm text-orange-500">
            <span>{format(shownMs)}</span>
            <span>{format(durationMs)}</span>
        </div>

        </div>
    )
    

}