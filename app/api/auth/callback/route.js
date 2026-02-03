import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    console.log('this is my code', code);
    


    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}` 
        }, 
        body: `code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
        })

      const data = await res.json();
      const cookieStore = await cookies();
      cookieStore.set("IPM_AT", data.access_token,{ getMaxAge :data.expires_in});
      cookieStore.set("IPM_RT", data.refresh_token, { getMaxAge :data.expires_in * 5});


        return NextResponse.redirect(new URL("https://iplaymusik-app-denisse.onrender.com/music")); // redirect to homepage after successful authentication
}