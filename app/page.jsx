import { cookies } from "next/headers";
import WelcomePage from "./components/WelcomePage";
import HomeCarouselComp from "./components/home-components/HomeCarouselComp";

export default async function Home() {

  const cookieStore = await cookies();
  const access_token = cookieStore.get("IPM_AT")?.value;
  console.log(access_token); 
  

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  console.log('This is my response = ', response);

  
  return (
    <>
    <HomeCarouselComp />
      <WelcomePage/>
    </>

  );
}
