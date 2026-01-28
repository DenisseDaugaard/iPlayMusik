import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET(request) {
   const {searchParams} = new URL(request.url);
   const url = searchParams.get('url');

   if (!url){
    return NextResponse.json(
        {error: 'No URL provided'},
         {status: 400});
   }

   const cookiesStore = await cookies();
   const accessToken = cookiesStore.get("IPM_AT")?.value;
   
   const response = await fetch(url, {
       headers:{
           'Authorization': `Bearer ${accessToken}`,
       }, 
       cache: 'no-store',
   });
   
   const data = await response.json();
   return NextResponse.json(data, {status: response.status});
}

