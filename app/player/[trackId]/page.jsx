
import FullPageTrackPlaying from "@/app/components/MusicPlayer/FullPageTrackPlaying";
import fetchmusic from "@/app/api/lib/fetchmusic";


export default async function TrackPage({ params }) {
  const resolvedParams = await params;

  const parsedParams =
    typeof resolvedParams === "string"
      ? JSON.parse(resolvedParams)
      : resolvedParams;

  const { trackId } = parsedParams; 

  const url = `https://api.spotify.com/v1/tracks/${trackId}`;
  const trackData = await fetchmusic(url);
  //console.log(trackData)

  return (
    <>
    <FullPageTrackPlaying track={trackData} />
    </>
  )
}