import Image from "next/image";
import Link from "next/link";

export default function AlbumsList ({ data, title }) {
  return (
    <section className="mt-4 ">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
                 <div className="flex overflow-x-scroll gap-8 pb-4">
                     {data?.albums
                         .filter(album => album !== null)
                         .map(album => (
                    <Link className="block w-full" href={`/music/album/${album.id}`} key={album.id}>
                     <Image
                         src={album.images?.[0]?.url}
                         alt={album.name}
                         width={200}
                         height={200}
                         className="rounded-lg mb-4"
                         loading="lazy"
                     />
                    </Link>
                    ))}
                 </div>
    </section>
     
  )
}