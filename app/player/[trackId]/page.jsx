
import FullPageTrackPlaying from "@/app/components/FullPageTrackPlaying";
import fetchmusic from "@/app/api/lib/fetchmusic";
import GoBackArrow from "@/app/components/Header/GoBackArrow";

export default async function TrackPage({ params }) {

  const { trackId } = await params;  
  const url = `https://api.spotify.com/v1/tracks/${trackId}`;
  const trackData = await fetchmusic(url);

  if(trackData.id !== trackId){
    console.log("ids are not the same ");
    return <h1>Track not found</h1>
  }
  

  return (
    <>
    <div className="absolute text-shadow-lg text-white top-0 left-0 w-full p-6 grid grid-cols-3 gap-4 flex items-center">
      <div className="rounded-[50%] bg-[linear-gradient(45deg,rgba(207,41,41,0.87)_41%,rgba(252,176,69,1)_100%)]
       w-8 h-8 flex items-center justify-center">
      <GoBackArrow />
      </div>
      <p className="text-xl center font-bold">PLAYING</p>
    </div>
    <FullPageTrackPlaying track={trackData} />
    </>
  )
}