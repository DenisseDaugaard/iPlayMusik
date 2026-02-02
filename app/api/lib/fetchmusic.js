import { cookies } from "next/headers";

export default async function fetchmusic(url) {

  const cookiesStore = await cookies();  
  const accessToken = cookiesStore.get("IPM_AT")?.value;
  if (!accessToken) throw new Error("Missing access token (IPM_AT cookie).");

  const res = await fetch(url, {
    // caching helps a lot when many users request same thing
    next: { revalidate: 60 }, // start with 60s
    headers: { Authorization: `Bearer ${accessToken}` },
  });

 if (res.status === 429) {
  console.log("429 headers:", Object.fromEntries(res.headers.entries()));
  const body = await res.text().catch(() => "");
  console.log("429 body:", body);
  const retryAfter = res.headers.get("retry-after");
  throw new Error(`429 from Spotify. retry-after=${retryAfter}. body=${body}`);
}


  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify failed: ${res.status} ${res.statusText} ${text}`);
  }

  return res.json();
}
