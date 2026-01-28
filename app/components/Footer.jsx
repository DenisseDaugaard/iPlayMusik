"use client";
import { IoMdPulse } from "react-icons/io";
import { IoMdMicrophone } from "react-icons/io";
import { MdOutlineWifiTethering } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../Theme/ThemeProvider";
import GradientIcons from "./GradientIcons";

export default function Footer (){
    const { theme } = useTheme();
    const isDark = theme === "dark";
    console.log(isDark);
    
    return (
        <footer id="footer" className="pt-16">
            <nav>
            <ul className={`${isDark ? "bg-[var(--dark-blue-color)] " : "bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]"} footer_navbar fixed bottom-0 left-0 w-full h-16 flex justify-around items-center text-white z-50`}>
                <li><Link href="/album"> <GradientIcons Icon={IoMdPulse}/></Link></li>
                <li><Link href="/music"><GradientIcons Icon={IoMdMicrophone} /></Link></li>
                <li><Link href="/music/play-list"><GradientIcons Icon={MdOutlineWifiTethering} /></Link></li>
                <li><ThemeToggle /></li>
                <li><Link href="/playlist"><GradientIcons Icon={IoSettings} /></Link></li>
            </ul>
            </nav>
        </footer>
    )
}