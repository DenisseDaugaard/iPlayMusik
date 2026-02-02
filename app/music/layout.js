
"use client";
import Footer from "../components/Footer";
import {useTheme} from "../Theme/ThemeProvider";
import BackGroundPlayer from "../components/MusicPlayer/BackGroundPlayer";


export default function MusicLayout({ children }) {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';


    return (
        <div className={`h-full ${isDarkMode ? 'bg-[linear-gradient(159deg,rgb(34,16,32),rgb(68,27,63))] text-white' : 'text-[#111625]'} page flex flex-col h-[100vh]`}>
            {children}
            <BackGroundPlayer />
            <Footer />
        </div>
    );
}