import fetchmusic from "@/app/api/lib/fetchmusic";
import PageTitle from "@/app/components/PageTitle";

export default async function AlbumPage({ params }) {
    const { albumId } = await params;
    console.log(albumId);
    
    const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?offset=0&limit=10`;
    const albumTracksData = await fetchmusic(url);
    console.log(albumTracksData);
    

    return(
        <>
        <section>
        {albumTracksData?.items?.map((track) => (
            <div key={track.id} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{track.name}</h3> 
            </div>
        ))}
        </section>
        </>

    )
}
