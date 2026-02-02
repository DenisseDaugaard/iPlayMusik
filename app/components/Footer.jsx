"use client";
import { IoMdPulse } from "react-icons/io";
import { IoMdMicrophone } from "react-icons/io";
import { GiMusicSpell } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../Theme/ThemeProvider";



export default function Footer (){
    const { theme } = useTheme();
    const isDark = theme === "dark";
    //console.log(isDark);
    
    return (
        <>
        <footer id="footer" className="pt-16">
            <nav>
            <ul className={`${isDark ? "bg-[var(--dark-blue-color)] " : "bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]"} footer_navbar fixed bottom-0 left-0 w-full h-16 flex justify-around items-center text-white text-3xl z-50`}>
                <li><Link href="/login"> <IoMdPulse className="icon-gradient"/></Link></li>
                <li><Link href="/music"><IoMdMicrophone className="icon-gradient"/></Link></li>
                <li><Link href="/music/play-list"><GiMusicSpell className="icon-gradient"/></Link></li>
                <li><ThemeToggle /></li>
                <li><Link href="/music/mysettings"><IoSettings className="icon-gradient"/></Link></li>
            </ul>
            </nav>
        </footer>
        </>
    )
}