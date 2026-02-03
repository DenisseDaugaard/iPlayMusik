"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import TrackPlayer from "@/app/components/MusicPlayer/TrackPlayer";

export default function Carousel({ playlists }) {
  return (
    <div className="w-full flex justify-center">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.75}
        loop
        speed={350}
        resistanceRatio={0.6}
        threshold={10}
        touchRatio={1.1}
        longSwipesRatio={0.25}
        longSwipesMs={200}
        pagination={false}
      >
        {playlists?.map((playlist) => {
          const img = playlist?.images?.[0]?.url;
          if (!img) return null;

          return (
            <SwiperSlide key={playlist.id} className="!w-[220px]">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-6">
                  <div className="rounded-xl overflow-hidden bg-gray-200">
                    <Image
                      src={img}
                      alt={playlist?.name ?? "Playlist cover"}
                      width={220}
                      height={220}
                      className="w-[220px] h-[220px] object-cover"
                      loading="lazy"
                    />
                  </div>

                  {isActive && (
                    <div className="w-full">
                      <ul className="space-y-2">
                        {playlist.tracks?.map((item) => (
                          <TrackPlayer
                            key={item.track.id}
                            track={item.track}
                          />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
