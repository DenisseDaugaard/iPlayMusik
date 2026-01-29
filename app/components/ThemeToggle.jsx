"use client";

import { IoContrastSharp } from "react-icons/io5";
import { useTheme } from "../Theme/ThemeProvider";


export default function ThemeToggle() {

    const { toggleTheme, mounted} = useTheme();

    if (!mounted) { return null; }
    
    return (
        <button onClick={toggleTheme}><IoContrastSharp className="icon-gradient"/></button>
    )
}
