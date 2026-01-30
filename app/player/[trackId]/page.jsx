
import FullPageTrackPlaying from "@/app/components/MusicPlayer/FullPageTrackPlaying";
import fetchmusic from "@/app/api/lib/fetchmusic";


export default async function TrackPage({ params }) {

  const { trackId } = await params;  
  const url = `https://api.spotify.com/v1/tracks/${trackId}`;
  const trackData = await fetchmusic(url);
  //console.log(trackData)

  return (
    <>
    <FullPageTrackPlaying track={trackData} />
    {/* <PlayBackState /> */}
    </>
  )
}