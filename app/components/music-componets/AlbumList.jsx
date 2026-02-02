import Image from "next/image";
import Link from "next/link";

export default function AlbumsList ({ data, title }) {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
                 <div className="flex overflow-x-scroll no-scrollbar gap-8 pb-4">
                     {data?.albums
                         .filter(album => album !== null)
                         .map(album => (
                   <Link
                      href={`/music/album/${album.id}`}
                      key={album.id}
                      prefetch={false}
                      className="shrink-0 w-40 sm:w-48 md:w-56"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={album.images?.[0]?.url}
                          alt={album.name}
                          fill
                          sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                          className="rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>

                    ))}
                 </div>
    </section>
     
  )
}