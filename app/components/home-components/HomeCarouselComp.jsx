"use client";

import Image from "next/image";
import { MdOutlineWifiTethering } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosMusicalNote } from "react-icons/io";
import { useState } from "react";

import HomeText from "./WelcomeText";
import { useRouter } from "next/navigation";


export default function HomeCarouselComp() {

    const [slide, setSlide] = useState(1);
    const active = "bg-[var(--bright-pink-color)] border-none text-white";
    const inactive = "border-[2px] border-black h-[4rem] w-[4rem]";
    const router = useRouter();

    const handleSlideChange = (slideNumber) => {
        setSlide(slideNumber);

        if (slideNumber > 3) {
          setSlide(3);
            router.push('/login');
        }
    };

    return (
       <>
       <section className="page">
      <Image
        src="/badges.svg"
        alt="I Play Musik Logo"
        width={375}
        height={375}
        className="flex justify-self-center"
      />
      {slide === 1 && (
      <HomeText 
      title="Where Words Fail, Music Speaks"
      text="Where words fall short, music steps in as a quiet but powerful language of its own, that connects people across cultures and moments in time."
      />
      )}
      {slide === 2 && (
        <HomeText 
        title="No Music No Life"
        text="Experience the rhythm and energy of music as it moves through you, creating unforgettable moments and memories."
        />
      )}
      {slide === 3 && (
        <HomeText
        title="Peace Love Music"
        text="Music transcends boundaries, connecting people from all walks of life through its universal language of rhythm, melody, and emotion."
        />
      )}
      <nav>
        <ul className="flex justify-center gap-16">
          <li>
            <div className={`w-[4rem] h-[4rem] ${slide === 1 ? active : inactive} rounded-[50%] flex justify-center items-center`}>
              <MdOutlineWifiTethering  onClick={() => handleSlideChange(1)} className="text-[3rem]" />
            </div>
          </li>
          <li>
            <div className={`w-[4rem] h-[4rem] ${slide === 2 ? active : inactive} rounded-[50%] flex justify-center items-center`}>
              <IoMdHeartEmpty onClick={() => handleSlideChange(2)} className="text-[3rem]" />
            </div>
          </li>
          <li>
            <div className={`w-[4rem] h-[4rem] ${slide === 3 ? active : inactive} rounded-[50%] flex justify-center items-center`}>
              <IoIosMusicalNote onClick={() => handleSlideChange(3)} className="text-[3rem]" />
            </div>
          </li>
        </ul>
      </nav>

      <span className=" flex justify-center cursor-pointer font-bold my-4" onClick={() => handleSlideChange(slide + 1)}>Skip</span>
      
    </section>
       </> 
    )
}