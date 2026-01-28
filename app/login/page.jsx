export default function LoginPage() {
    
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    ].join(" ");

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&response_type=code&scope=${scopes}`;


    return (
        <div  className='Page bg-no-repeat p-4 flex flex-col items-center justify-center h-screen ' style={{ backgroundImage: "url('/badges.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            <h1 className="font-bold text-4xl mb-8">Log In</h1>
            <a className="text-black border-2 px-4 py-2 rounded-[1rem] m-8 font-bold" 
            
            href={authUrl}>
            Log in with Spotify</a>
        </div> 
    )
}

