import PageTitle from "@/app/components/PageTitle";
import fetchmusic from "@/app/api/lib/fetchmusic";
import Image from "next/image";
import GoBackArrow from "@/app/components/Header/GoBackArrow";

export default async function MySettings() {
  const url = "https://api.spotify.com/v1/me";
  const user = await fetchmusic(url, { revalidate: 3600 });

  return (
    <section className="p-6 max-w-3xl mx-auto h-screen">
      <header className="w-full py-6 grid grid-cols-3 gap-4 flex items-center z-50">
        <GoBackArrow />
        <span>PROFILE</span>
      </header>
      <PageTitle title="Your Profile" />

      <div className="mt-6 flex items-center gap-6 rounded-xl bg-[linear-gradient(90deg,rgba(2,0,36,0.8)_0%,rgba(130,23,75,0.77)_51%)] p-6 shadow-lg">
        {/* Avatar */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-neutral-800">
          {user.images?.[0]?.url ? (
            <Image
              src={user.images[0].url}
              alt={user.display_name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl text-white">
              🎵
            </div>
          )}
        </div>

        {/* User info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white">
            {user.display_name}
          </h2>

          <p className="text-sm text-white">{user.email}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-white">
            <span>
              🌍 <strong>{user.country}</strong>
            </span>

            <span>
              👥 <strong>{user.followers?.total}</strong> followers
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.product === "premium"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-neutral-700 text-neutral-300"
              }`}
            >
              {user.product.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <a
          href={user.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-black hover:bg-green-400"
        >
          Open in Spotify
        </a>
      </div>
    </section>
  );
}
