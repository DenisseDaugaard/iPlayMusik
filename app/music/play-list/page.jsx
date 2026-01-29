import Header from "@/app/components/Header/Header";
import { FaMagnifyingGlass } from "react-icons/fa6";
import fetchmusic from "@/app/api/lib/fetchmusic";
import PageTitle from "@/app/components/PageTitle";
import Image from "next/image";
import TrackPlayer from "@/app/components/MusicPlayer/TrackPlayer";
import mapWithLimit from "@/app/api/lib/mapWithLimit";



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
      const tracksData = await fetchmusic(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?market=US&limit=10`);
      return {
        ...playlist,
        tracks: tracksData.items,
      };
    }
  );

  return (
    <article className="p-16 bg-[url('/sound-wave.png')] bg-no-repeat bg-fixed lg:bg-cover lg:bg-center min-h-screen">
      <Header title="PLAYLISTS" icon={<FaMagnifyingGlass />} />
      <PageTitle title="Play Lists" />
      <section>
        <ul className="flex overflow-x-scroll gap-8 pb-4 mt-8">
          {playlistsWithTracks?.map((playlist) => (
            <li key={playlist.id} className="mb-8">
              <section>
              <Image
                src={playlist.images[0]?.url}
                alt={playlist.name}
                width={500}
                height={500}
                className="rounded-lg mb-4"
                loading="lazy"
                />
              </section>
                <div>
                  <ul>
                    {playlist.tracks?.map((item) => (
                      <TrackPlayer key={item.track.id} track={item.track} />
                    ))}
                  </ul>
                </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
