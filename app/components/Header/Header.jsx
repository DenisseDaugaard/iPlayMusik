"use client";
import { useTheme } from "../../Theme/ThemeProvider";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import GoBackArrow from "./GoBackArrow";


export default function Header ({title}) {

    const {theme} = useTheme();
    const isDark = theme === "dark";
    
    const pathname = usePathname();
    const playerPath = pathname.startsWith("/player/");
    
 
    const [searchBar, setSearchBar] = useState(false);
    const toggleSearchBar = () => {
        setSearchBar(!searchBar);
    }


    return (
        <header className="py-6">
            <nav className={isDark ? "text-white" : "text-[var(--dark-blue-color)]"}>
            <ul className="grid grid-cols-[3fr_1fr] gap-4 flex items-center">
                <li><div className="flex justify-between items-center ">
                    <GoBackArrow />
                    <span className="mr-[10%] text-lg">
                    {title}
                    </span>
                    </div>
                </li>
                <li className="flex justify-end">{!playerPath && <FaMagnifyingGlass onClick={toggleSearchBar} className="text-2xl" />}</li>
            </ul>
            </nav>
            {searchBar && (<SearchBar/>)}
        </header>
    )
}