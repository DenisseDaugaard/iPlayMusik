import "./globals.css";
import {Poppins} from "next/font/google";

import ThemeProvider from "./Theme/ThemeProvider";
import PlayerProvider from "./PlayerProvider";
import { cookies } from "next/headers";




const poppinsFont  = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-Poppins' 
});


export const metadata = {
  title:{
    template: "%s | iPlayMusik",
    default: "iPlayMusik"
  } ,
  description: "Your ultimate destination for music lovers. Discover, stream, and share your favorite tunes all in one place.",
  icons: {
    icon: "/icon.png"
  }
};


export default async function RootLayout({ children }) {

  const cookieStore = await cookies();
  const token = cookieStore.get("IPM_AT")?.value;
  // console.log(token);
  

  return (
    <html lang="en">
      <body className={poppinsFont.variable}>
         <ThemeProvider>
          <main>
            {children}

          </main>
        </ThemeProvider>
      <PlayerProvider token={token}/>
      </body>
    </html>
  );
}
