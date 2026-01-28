"use client";

import { IoContrastSharp } from "react-icons/io5";
import { useTheme } from "../Theme/ThemeProvider";
import GradientIcons from "./GradientIcons";


export default function ThemeToggle() {

    const {theme, toggleTheme, mounted} = useTheme();

    if (!mounted) { return null; }
    
    return (
        <button onClick={toggleTheme}><GradientIcons Icon={IoContrastSharp} /></button>
    )
}
