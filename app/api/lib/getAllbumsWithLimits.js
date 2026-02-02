import fetchmusic from "./fetchmusic";


export async function fetchAlbumsInOneRequest(allIds) {
  const unique = Array.from(new Set(allIds)); // avoid duplicates
  const url = `https://api.spotify.com/v1/albums?ids=${unique.join(",")}`;

  const data = await fetchmusic(url); // expects JSON
  // Spotify returns { albums: [...] }
  const albums = (data?.albums || []).filter(Boolean);

  // Map id -> album so you can rebuild per category in original order
  const byId = new Map(albums.map((a) => [a.id, a]));
  return byId;
}

