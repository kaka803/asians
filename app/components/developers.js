"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useProjectsContext } from "../context/GlobalContext";




const DeveloperSwiper = () => {
  
const {developers} = useProjectsContext()
  return (
    <div className="mt-17 lg:mt-35 px-6 relative">
      <h1 className="text-white text-center text-4xl md:text-4xl lg:text-6xl mb-10">Our Team</h1>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={60}
        slidesPerView={1}
        loop={true} // ✅ Infinite loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-14"
      >
        {developers.map((dev) => (
          <SwiperSlide key={dev.id}>
            <div className="flex flex-col cursor-pointer items-center justify-between bg-white/10 backdrop-blur-lg white-border p-6 rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300 h-[400px]">
              {/* Profile Image */}
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white/80"
              />

              {/* Name & Profession */}
              <div className="text-center">
                <h2 className="mt-4 text-white text-lg sm:text-xl ">
                  {dev.name}
                </h2>
                <p className="text-gray-400 text-sm font-sans">{dev.profession}</p>
              </div>

              {/* Description */}
              <p className="mt-3 text-white text-xs sm:text-sm font-sans text-center line-clamp-4">
                {dev.description}
              </p>

              {/* Contact Button */}
              <a
  href={`https://wa.me/${dev.whatsapp}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="mt-4 px-4 py-2 bg-white/20 text-white text-sm rounded-xl border border-white/50 hover:bg-white hover:text-black transition-all duration-300">
    Contact
  </button>
</a>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>

      {/* Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          padding: 10px;
          border-radius: 9999px;
          transition: all 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.2);
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }
        .swiper-pagination-bullet-active {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default DeveloperSwiper;
