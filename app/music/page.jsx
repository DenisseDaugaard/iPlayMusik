import Header from "../components/Header/Header";
import PageTitle from "../components/PageTitle";
import AlbumsList from "../components/music-componets/AlbumList";
import {recomendedIds,rockIds,popIds,jazzIds,} from "../components/music-componets/music_ids";
import {fetchAlbumsInOneRequest } from "../api/lib/getAllbumsWithLimits";


export default async function AlbumPage() {
  let recommended = [];
  let rock = [];
  let pop = [];
  let jazz = [];

  try {
    const allIds = [
      ...recomendedIds,
      ...rockIds,
      ...popIds,
      ...jazzIds,
    ];

    const byId = await fetchAlbumsInOneRequest(allIds);

    recommended = recomendedIds.map((id) => byId.get(id)).filter(Boolean);
    rock = rockIds.map((id) => byId.get(id)).filter(Boolean);
    pop = popIds.map((id) => byId.get(id)).filter(Boolean);
    jazz = jazzIds.map((id) => byId.get(id)).filter(Boolean);

  } catch (e) {
    if (e?.status === 429) {
      console.error("Spotify rate-limited, retry-after:", e.retryAfter);
    } else {
      console.error("Error fetching albums:", e);
    }
  }

  return (
    <article className="p-8">
      <Header title="MUSIC" />
      <PageTitle title="All albums" />
      <AlbumsList data={{ albums: recommended }} title="Recommended for you" />
      <AlbumsList data={{ albums: rock }} title="Rock" />
      <AlbumsList data={{ albums: pop }} title="Pop" />
      <AlbumsList data={{ albums: jazz }} title="Jazz" />
    </article>
  );
}

