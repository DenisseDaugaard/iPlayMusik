import Header from "@/app/components/Header/Header";
import { FaMagnifyingGlass } from "react-icons/fa6";
import fetchmusic from "@/app/api/lib/fetchmusic";
import PageTitle from "@/app/components/PageTitle";
import mapWithLimit from "@/app/api/lib/mapWithLimit";
import Carousel from "@/app/components/music-componets/Carousel";


export default async function AlbumsPage() {
  
  const url = "https://api.spotify.com/v1/me/playlists";
  let data = null;
  let error = null;
  
 
  try{
    data = await fetchmusic(url);  
  } catch (e){
  error = e;
  console.error("Error fetching playlists:", e);
  }
  
  // this ensure we don't overload Spotify API with too many requests at once
  const playlistsWithTracks = await mapWithLimit(
    data?.items || [],
    3,
    async (playlist) => {
      const tracksData = await fetchmusic(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?market=US&limit=15`);
      return {
        ...playlist,
        tracks: tracksData.items,
      };
    }
  );

  return (
    <article className="p-8 bg-[url('/sound-wave.png')] bg-no-repeat bg-fixed lg:bg-cover lg:bg-center min-h-screen">
      <Header title="PLAYLISTS" icon={<FaMagnifyingGlass />} />
      <PageTitle title="Play Lists" />
      <section>
     <Carousel playlists={playlistsWithTracks} />
      </section>
    </article>
  );
}


