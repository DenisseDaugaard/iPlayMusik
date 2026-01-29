"use client";
import { useState, useEffect } from "react";
import DraggableSlider from "./DraggableSilider";

export default function PlayerDuration({ durationMs, isPlaying }) {

    const minutes = Math.floor(durationMs / 60000); // calculate minutes
    const seconds = Math.floor((durationMs % 60000) / 1000);// calculate seconds
   
    const [positionMs, setPositionMs] = useState(0);

    useEffect(()=>{
        if(!isPlaying) return;
      
            const interval = setInterval(()=>{
                setPositionMs((p) => Math.min(p + 1000, durationMs)); // increment position by 1 second, but not exceed duration
            }, 1000);
            return () => clearInterval(interval);

    }, [isPlaying, durationMs]);

    const progress = durationMs ? (positionMs / durationMs) * 100 : 0; //* 100 to get percentage

    return (
        <>
        <div className="mt-4">
            <div style={{width: '100%', height: '6px'}} className="bg-[rgba(196,183,171,0.50)] rounded-full relative">
                <div style={{width: `${progress}%`, height: '6px'}} className="moving-bar bg-orange-500 absolute rounded-full z-50"></div>
            </div>
            <DraggableSlider durationMs={durationMs} />
        </div>


        </>
    )

}