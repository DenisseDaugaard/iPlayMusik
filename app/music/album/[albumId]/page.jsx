import fetchmusic from "@/app/api/lib/fetchmusic";
import GoBackArrow from "@/app/components/Header/GoBackArrow";
import Image from "next/image";
import TrackPlayer from "@/app/components/MusicPlayer/TrackPlayer";

export default async function AlbumPage({ params }) {
  const resolvedParams = await params;
  const parsedParams =
    typeof resolvedParams === "string" ? JSON.parse(resolvedParams) : resolvedParams;

  const { albumId } = parsedParams;
  if (!albumId) throw new Error("albumId missing from route params");

  // Fetch album (includes first page of tracks)
  const album = await fetchmusic(`https://api.spotify.com/v1/albums/${albumId}`, {
    revalidate: 3600,
  });

  const tracksUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=20`;
  const allTracksData = await fetchmusic(tracksUrl, { revalidate: 3600 });
  

  // Prepare tracks for TrackPlayer
  const tracks = allTracksData?.items ?? [];
  const tracksForTrackPlayer = tracks.map((t) => ({
    ...t,
    album: {
      id: album.id,
      name: album.name,
      images: album.images ?? [],
    },
  }));

  return (
    <section className="relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="scrim-top" />
        <div className="relative grid grid-cols-3 items-center p-6 text-white">
          <div className="w-8 h-8 flex items-center justify-center">
            <GoBackArrow />
          </div>
          <p className="text-xl text-center font-bold tracking-wide">ALBUM</p>
          <div />
        </div>

        <div className="relative px-6 pb-4 mt-40 text-white">
          <h1 className="text-3xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {album?.name}
          </h1>
          <p className="text-sm opacity-90">
            {tracks.length} tracks
          </p>
        </div>
      </header>

      <Image
        src={album?.images?.[0]?.url || ""}
        alt={album?.name || "Album Art"}
        width={600}
        height={600}
        className="w-full h-auto"
        priority
      />

      <div className="px-8">
        <h2 className="mb-2 text-xl font-bold p-4">All tracks</h2>

        <ul>
          {tracksForTrackPlayer.map((track) => (
            <TrackPlayer key={track.id} track={track} />
          ))}
        </ul>
      </div>
    </section>
  );
}
