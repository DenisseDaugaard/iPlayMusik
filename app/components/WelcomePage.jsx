"use client";

import Image from "next/image";
import { useTheme } from "../Theme/ThemeProvider";

export default function WelcomePage() {

    const { theme } = useTheme();
    const isDark = theme === "dark";
   
    return ( 
        <div className={`animate-fadeup h-screen w-full absolute top-0 right-0 left-0  flex flex-col justify-center items-center gap-8 ${isDark ? 'welcome_dark_bg' : 'welcome_light_bg' }`}>
            <Image
            src={isDark ? "/welcome_logo_dark.svg" : "/welcome_logo_light.svg"}
            alt="iPlayMusik Logo"
            width={200}
            height={400}
            className="animate-logo"
            />
        </div>
    )
}
