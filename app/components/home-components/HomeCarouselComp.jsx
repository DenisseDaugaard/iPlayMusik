"use client";

import Image from "next/image";
import { MdOutlineWifiTethering } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdMusicalNote } from "react-icons/io";
import { useState } from "react";

import HomeText from "./WelcomeText";
import { useRouter } from "next/navigation";


export default function HomeCarouselComp() {

    const [slide, setSlide] = useState(1);
    const active = "bg-[var(--bright-pink-color)] border-none text-white";
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
              <MdOutlineWifiTethering  onClick={() => handleSlideChange(1)} className={`${slide === 1 ? active : ''} text-[3rem] border-[3px] rounded-[50%]`} />
          </li>
          <li>
              <IoMdHeartEmpty onClick={() => handleSlideChange(2)} className={`${slide === 2 ? active : ''} text-[3rem] border-[3px] rounded-[50%]`} />
          </li>
          <li>
              <IoMdMusicalNote onClick={() => handleSlideChange(3)} className={`${slide === 3 ? active : ''} text-[3rem] border-[3px] rounded-[50%]`} />
          </li>
        </ul>
      </nav>

      <span className=" flex justify-center cursor-pointer font-bold my-4" onClick={() => handleSlideChange(slide + 1)}>Skip</span>
      
    </section>
       </> 
    )
}