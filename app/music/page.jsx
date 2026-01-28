import Header from "../components/Header/Header"
import ArtistList from "../components/music-componets/TracksList";
import PageTitle from "../components/PageTitle";
import fetchmusic from "../api/lib/fetchmusic";



export default async function HomePage() {
    const limit = 5;
    const urlId = "1moxjboGR7GNWYIMWsRjgG"; //Florence and the Machine ID
    
    const url = `https://api.spotify.com/v1/artists/${urlId}/top-tracks?market=US&limit=${limit}`;
    const data =  await fetchmusic(url);

    // console.log(data);
    
    return (
        <article className="p-8">
            <Header title="FEATURED" />
            <PageTitle title="Featured" />
            <section>
                <ArtistList data={data}
                 limit={limit} />
            </section>
        </article>  
           
    )
}
