import { cookies } from "next/headers";

export default async function getValidToken() {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing CLIENT_ID or CLIENT_SECRET env vars");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("IPM_AT")?.value;
  const refreshToken = cookieStore.get("IPM_RT")?.value;

  if (accessToken) return accessToken;
  if (!refreshToken) throw new Error("No refresh token available");

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  const data = await res.json();

if (!res.ok) {
  console.error("Spotify refresh failed:", res.status, data);
  throw new Error(
    `Spotify refresh failed (${res.status}): ${data?.error} - ${data?.error_description}`
  );
}


  //store new access token
  cookieStore.set("IPM_AT", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: data.expires_in, // seconds
  });

  return data.access_token;
}
