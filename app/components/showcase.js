'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProjectsContext } from '../context/GlobalContext';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import Link from 'next/link';

const Showcase = () => {
  const { projects, setOpen, open } = useProjectsContext();

  useEffect(() => {
    console.log(projects);
    
  }, [projects])
  
  return (
    <div className='showcase'>
      <div className="text-center max-md:mb-10">
        <h2 className="text-6xl md:text-7xl mt-2  text-white uppercase lg:mt-20">
          Our <br /> Showcasess
        </h2>
        
        <p className="text-white max-w-3xl mx-auto max-md:text-sm  text-lg font-sans leading-relaxed">
          Our work speaks louder than words explore our projects to see <br className='hidden md:block'/> our expertise in action.
        </p>
      </div>

      <div className="  lg:pt-15  relative">
            <div className="absolute top-1/2 -right-5 z-30">
  <button
    className="custom-next flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black/40 to-[#8ed0f7]/40 
               backdrop-blur-2xl  white-border hover:hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full text-gray-800"
    aria-label="Next Slide"
  >
    <FaArrowRight size={20} className='text-white'/>
  </button>
</div>

<div className="absolute -left-5 top-1/2 z-30">
  <button
    className="custom-prev flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black/40 to-[#8ed0f7]/40 
               backdrop-blur-2xl  hover:scale-105  shadow-lg hover:shadow-xl rounded-full text-gray-800 transition-all duration-300"
    aria-label="Previous Slide"
  >
    <FaArrowLeft size={20} className='text-white' />
  </button>
</div>
      
            <Swiper
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation]}
              className="mySwiper cursor-pointer"
            >
              
      {projects.projects?.map((project) => {
  return (
    <SwiperSlide key={project.id}> {/* Unique key add ki */}
      <div className="h-auto w-full flex items-center justify-center">
        <div className="h-auto lg:h-[530px] w-full border border-white rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
          
          <div className="main w-full h-full flex flex-col lg:flex-row justify-center items-center gap-8">
            
            {/* Left Section */}
            <div className="left w-full lg:w-1/2 h-full flex flex-col justify-center items-start text-center lg:text-left">
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-6 text-white">
                {project.name} {/* Dynamic project name */}
              </h1>

              {/* Paragraph */}
              <p className="text-sm sm:text-base md:text-lg font-sans text-white max-w-2xl mb-6 leading-relaxed">
                {project.description || "No description available."} {/* Dynamic description */}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href={`/project/${project._id}`}>
                <button className="bg-transparent border text-white border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition w-full sm:w-auto">
                  VIEW ALL SCREEN →
                </button>
                </Link>
                <button onClick={() => setOpen(true)} className="bg-transparent border text-white border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition w-full sm:w-auto">
                  CONTACT NOW →
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="right w-full lg:w-1/2 h-auto lg:h-full flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={project.thumbnail || "/showcase3.png"} // Dynamic image fallback
                alt={project.name || "App Showcase"}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </SwiperSlide>
  );
})}

      

      
            </Swiper>
          </div>
    </div>
  )
}

export default Showcase
