'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';

export default function Hero() {

  

  // const handleSlideChange = (swiper) => {
  //   // Har slide change pe active slide animate hogi
  //   gsap.fromTo(
  //     swiper.slides[swiper.activeIndex].querySelector(".content"),
  //     { y: 100, opacity: 0 },
  //     { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
  //   );
  // };



  return (
    <>
     <div className=" mt-20   relative">
      {/* Custom Buttons */}
      

      <Swiper
 navigation={{
                 nextEl: ".custom-next-hero",
                 prevEl: ".custom-prev-hero",
               }}
               modules={[Navigation, Autoplay]}  // Autoplay add kiya
  loop={true}
  autoplay={{
    delay: 15000, 
    duration:1000,      // 4 seconds delay per slide
    disableOnInteraction: false,  // User interact kare to autoplay continue kare
  }}
  className="mySwiper cursor-pointer h-[980px]   lg:h-[730px]  "
>
        <SwiperSlide>
  <div className="h-[900px]  mt-12  lg:h-[650px] py-5 w-full border-[1px] overflow-visible border-white rounded-3xl flex items-center justify-center relative pb-20">

    {/* Top Right Robot Image */}
    <Image
      src="/robot5.svg"
      width={255}
      height={255}
      alt="robot1"
      className="absolute -top-10 lg:-top-5 right-[0px] z-30 max-lg:w-[150px] animating-img "
    />

    <div className="main content flex flex-col lg:flex-row w-full relative">
      {/* Hire Button */}
      <div className="buton text-sm lg:text-xl text-center lg:text-start absolute bottom-[-80px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:bottom-[30px] lg:left-[35%] grid items-center py-3 px-3 rounded-lg white-border text-white">
        HIRE OUR AI EXPERT
      </div>

      {/* Left Section */}
      <div className="left w-full lg:mt-8 lg:w-[45%]  flex flex-col justify-center items-center lg:items-start gap-5 px-2 lg:pl-9 lg:pt-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl text-white leading-tight">
          We Build Digital Solutions <br className="hidden lg:block" /> with
          Cutting-Edge <br className="hidden lg:block" /> Technologies
        </h1>
        <p className="text-sm text-white font-sans max-md:pr-5">
          From websites to AI systems — we help startups <br className="hidden lg:block" /> & enterprises grow through tech.
        </p>
        <div className="lg:pl-5 hidden lg:block">
          <Image
            src="/robot1.svg"
            width={255}
            height={255}
            alt="robot1"
            className="w-[150px] lg:w-[200px] mx-auto lg:mx-0"
          />
        </div>
      </div>

      {/* Right Section (Cards) */}
      <div className="right lg:mt-8 hidden lg:block w-[60%] h-full relative">
        {/* Card 1 */}
        <div className="card1 shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] white-border rounded-2xl w-60 h-30 absolute top-20 left-35">
          <div className="flex flex-col justify-center items-center absolute top-[-67px] left-[37px]">
            <Image src="/robot3.svg" width={155} height={155} alt="robot1" />
            <p className="text-white text-3xl absolute bottom-[-10px] ">
              AI Consulting
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card2 shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] white-border rounded-2xl w-60 h-30 absolute top-60 left-5">
          <div className="flex flex-col justify-center items-center absolute top-[-67px] left-[37px]">
            <Image src="/robot2.svg" width={155} height={155} alt="robot1" />
            <p className="text-white text-3xl absolute bottom-[-10px]">
              Generative AI
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card2 shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] white-border rounded-2xl w-60 h-30 absolute top-60 left-85">
          <div className="flex flex-col justify-center items-center absolute top-[6px] left-[-41px]">
            <Image src="/robot4.svg" width={155} height={155} alt="robot1" />
            <p className="text-white text-3xl absolute bottom-[70px] right-[-120px]">
              AI Integration
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Cards (Stacked) */}
      <div className="right flex flex-col gap-8 items-center justify-center mt-10 lg:hidden">
        <div className="white-border shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] rounded-2xl w-52 h-24 flex flex-col justify-center items-center relative">
            <Image src="/robot3.svg" width={100} height={100} alt="robot1" className='absolute top-[-22px]' />
          <p className="text-white text-lg mt-2 absolute bottom-0">AI Consulting</p>
        </div>
        <div className="white-border shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] rounded-2xl w-52 h-24 flex flex-col justify-center items-center relative">
          <Image src="/robot2.svg" width={100} height={100} alt="robot1" className='absolute top[-42px] mb-7'/>
          <p className="text-white text-lg mt-2 absolute bottom-0 ">Generative AI</p>
        </div>
        <div className="white-border shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] rounded-2xl w-52 h-24 flex flex-col justify-center items-center relative">
          <Image src="/robot4.svg" width={100} height={100} alt="robot1" className='absolute top-[-40px] max-lg:w-[150px]'/>
          <p className="text-white text-lg mt-2 absolute bottom-0">AI Integration</p>
        </div>
      </div>
    </div>
  </div>
</SwiperSlide>


        {/* second slide  */}
        <SwiperSlide>
  <div className="h-auto mt-12  w-full flex items-center justify-center ">
    <div className="h-[900px] lg:h-[650px] w-full border  border-white  rounded-3xl flex flex-col lg:flex-row  items-center justify-center relative p-6 lg:p-12">
      
      {/* Floating Robot */}
      <Image
        src="/robot1.svg"
        width={255}
        height={255}
        alt="robot1"
        className="absolute max-md:-top-2 max-md:-right-0 -bottom-5 right-0 w-[100px] lg:w-[205px] animating-img"
      />

      {/* Main Content */}
      <div className='flex content max-md:mt-14 flex-col gap-5 justify-center items-center w-full'>
        <div className="main flex flex-col lg:flex-row w-full  lg:gap-5  ">
        
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6">
          <div>
            <Image
              src="/microsoft.svg"
              width={275}
              height={275}
              alt="microsoft"
              className="w-[150px] sm:w-[200px] lg:w-[275px]"
            />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center lg:text-left leading-[1.1]">
  Power Platform
  <span className="block text-xl sm:text-3xl lg:text-5xl leading-[1.2]">
    Development Company
  </span>
</h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-sans text-center lg:text-left">
            Custom Power Apps, Automated Workflows, <br className="hidden md:block"/> 
            Interactive Dashboards, and Secure Business <br className="hidden md:block"/> 
            Solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center lg:items-center gap-8">
          
          {/* Top Card */}
          <div className="relative">
            <div
  className="w-44 sm:w-52 h-24 white-border rounded-md  
     flex flex-col items-center justify-center  
     backdrop-blur-lg  border border-white/20
     shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)]
     relative"
>
  <Image
    src="/micro1.png"
    width={120}
    height={120}
    alt="Power Logo"
    className="absolute -top-6 lg:-top-10 w-[230px] lg:w-[230px]
       drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
  />
  <p className="text-white text-lg sm:text-xl lg:text-2xl mt-8">Power BI</p>
</div>

          </div>

          {/* Bottom Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Card 2 */}
            <div className="relative">
              <div className="w-44 sm:w-52 h-24 white-border rounded-md flex flex-col items-center justify-center relative shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)]">
                <Image
                  src="/micro2.png"
                  width={100}
                  height={100}
                  alt="Power Logo"
                  className="absolute -top-4 lg:-top-12 w-[70px] sm:w-[80px] lg:w-[100px] "
                />
                <p className="text-white text-lg sm:text-xl lg:text-2xl mt-8">Power BI</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative">
              <div className="w-44 sm:w-52 h-24 white-border rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center relative">
                <Image
                  src="/micro3.png"
                  width={140}
                  height={140}
                  alt="Power Logo"
                  className="absolute -top-4 lg:-top-9 w-[120px] lg:w-[140px]"
                />
                <p className="text-white text-lg sm:text-xl lg:text-2xl mt-10">Power BI</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Bottom Button */}
      <div className="buton text-xs sm:text-sm lg:text-xl text-center grid items-center py-2 px-4 mt-10 lg:mt-0 rounded-lg white-border text-white hover:scale-105 transition-transform duration-300">
        get a quote now 
      </div>
      </div>

      
    </div>
  </div>
</SwiperSlide>

{/* third slide  */}
        <SwiperSlide>
  <div className="h-auto mt-12  w-full flex items-center justify-center ">
    <div className="h-[900px] lg:h-[650px] w-full border border-white rounded-3xl  flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
      
      {/* Floating Robot */}
      <Image
        src="/robot1.svg"
        width={255}
        height={255}
        alt="robot1"
        className="absolute max-md:bottom-35 max-md:right-6 -bottom-3 -right-0 w-[130px] lg:w-[205px] animating-img"
      />

      {/* Main Content */}
      <div className='flex content max-md:mt-14 flex-col gap-5 justify-center items-center w-full'>
        <div className="main flex flex-col lg:flex-row w-full  lg:gap-5  ">
        
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6">
          <div>
            <Image
              src="/microsoft.svg"
              width={275}
              height={275}
              alt="microsoft"
              className="w-[150px] sm:w-[200px] lg:w-[275px]"
            />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center lg:text-left leading-[1.1]">
  Microsoft Dynamics
  <span className="block text-xl sm:text-3xl lg:text-5xl leading-[1.2]">
    365 Experts
  </span>
  <span className="block text-xl sm:text-3xl  leading-[1.2]">
    Consulting Services
  </span>
</h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-sans text-center lg:text-left">
            Simplifying your business with smart Dynamics <br className="hidden md:block"/> 
            365 solutions faster integration, better insights, <br className="hidden md:block"/> 
            and streamlined operations
          </p>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center lg:items-center gap-8">
  <div
    className="flex flex-wrap justify-center items-center gap-9 mt-5 
               max-md:grid max-md:grid-cols-2 max-md:gap-4"
  >
    {[
      { img: "/micro4.png", text: "Customer Services" },
      { img: "/micro5.png", text: "Marketing" },
      { img: "/micro6.png", text: "Sales" },
      { img: "/micro7.png", text: "Business Central" },
      { img: "/micro8.png", text: "FIELD SERVICES" },
    ].map((card, idx) => (
      <div
        key={idx}
        className="relative w-56 h-28  
          rounded-xl 
          bg-white/10 backdrop-blur-lg 
          border border-white/20 
          shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-end p-4
          max-md:w-full max-md:h-24"
      >
        {/* Image */}
        <img
          src={card.img}
          alt={card.text}
          className="absolute -top-8 
                     w-20 h-20 
                     max-md:w-14 max-md:h-14 
                     drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]"
        />
        {/* Text */}
        <p className="text-white text-xl tracking-wide max-md:text-sm text-center">
          {card.text}
        </p>
      </div>
    ))}
  </div>
</div>



        
      </div>

      {/* Bottom Button */}
      <div className="buton text-xs sm:text-sm lg:text-xl text-center grid items-center py-2 px-4 mt-10 lg:mt-0 rounded-lg white-border text-white hover:scale-105 transition-transform duration-300">
        get a quote now 
      </div>
      </div>

      
    </div>
  </div>
</SwiperSlide>
        <SwiperSlide>
  <div className="h-auto mt-12  w-full flex items-center justify-center ">
    <div className="h-[900px] lg:h-[650px] w-full border border-white rounded-3xl  flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
      
      
      <Image
        src="/robot1.svg"
        width={255}
        height={255}
        alt="robot1"
        className="absolute max-md:bottom-20 max-md:right-8 bottom-0 right-0 w-[130px] lg:w-[205px] animating-img"
      />

      {/* Main Content */}
      <div className='flex content max-md:mt-14 flex-col gap-5 justify-center items-center w-full'>
        <div className="main flex flex-col lg:flex-row w-full  lg:gap-5  ">
        
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6">
          <div>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
  {[
    { img: "/apple.png", alt: "Apple" , size: '10'},
    { img: "/flutter.png", alt: "Flutter" , size: '10' },
    { img: "/android.png", alt: "Android" , size: '25' },
  ].map((card, idx) => (
    <div
      key={idx}
      className="w-28 h-16 
                 flex items-center justify-center 
                 rounded-2xl 
                 bg-white/10 backdrop-blur-md 
                 border border-white/20 
                 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
    >
      <img
        src={card.img}
        alt={card.alt}
        className={`w-${card.size} w-${card.size} object-contain`}
      />
    </div>
  ))}
</div>

          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center lg:text-left leading-[1.1]">
  Mobile App
  <span className="block text-xl sm:text-3xl lg:text-5xl leading-[1.2]">
    Development Company
  </span>
  
</h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-sans text-center lg:text-left">
            We build powerful, cross-platform mobile applications <br className="hidden md:block"/> 
            using cutting-edge technologies like Android, iOS <br className="hidden md:block"/> 
            and Flutter  backed by a skilled and experienced <br className="hidden md:block"/> 
            development team.
          </p>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center lg:items-center gap-8">
 <div
  className="flex flex-wrap justify-center items-center gap-9 mt-5 
             max-md:grid max-md:grid-cols-2 max-md:gap-3"
>
  {[
    { img: "/bus.svg", text: "medicine delivery app", imgClass: "mb-8" },
    { img: "/data.png", text: "Live Streaming", imgClass: "mb-3" },
    { img: "/delivry.png", text: "food delivery app", imgClass: "mb-4" },
    { img: "/logic.png", text: "logistic app", imgClass: "mb-4 mr-1" },
    { img: "/shopping.png", text: "grocery delivery app", imgClass: "mb-5 mr-6" },
  ].map((card, idx) => (
    <div
      key={idx}
      className="relative w-44 h-28 max-md:w-32 max-md:h-20 
         rounded-xl 
         bg-white/10 backdrop-blur-lg 
         border border-white/20 
         shadow-[0_10px_20px_rgba(0,0,0,0.2),0_3px_6px_rgba(0,0,0,0.1)] 
         flex flex-col items-center justify-center gap-2 p-2"
    >
      {/* Image */}
      <img
        src={card.img}
        alt={card.text}
        className={`w-60 h-60 max-md:w-28 max-md:h-28 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] ${card.imgClass}`}
      />

      {/* Text */}
      <p className="text-white text-xs sm:text-lg font-medium tracking-wide text-center absolute bottom-1">
        {card.text}
      </p>
    </div>
  ))}
</div>



</div>



        
      </div>

      {/* Bottom Button */}
      <div className="buton text-xs sm:text-sm lg:text-xl text-center grid items-center py-2 px-4 mt-10 lg:mt-0 rounded-lg white-border text-white hover:scale-105 transition-transform duration-300">
        get a quote now 
      </div>
      </div>

      
    </div>
  </div>
</SwiperSlide>
<SwiperSlide>
  <div className="h-auto mt-12  w-full flex items-center justify-center ">
    <div className="h-[900px] lg:h-[650px] w-full border border-white rounded-3xl  flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
      
      {/* Floating Robot */}
      <Image
        src="/robot1.svg"
        width={255}
        height={255}
        alt="robot1"
        className="absolute max-md:-top-2 max-md:-right-0 -bottom-3 -right-0 w-[100px] lg:w-[205px] animating-img"
      />

      {/* Main Content */}
      <div className='flex content max-md:mt-14 flex-col gap-5 justify-center items-center w-full'>
        <div className="main flex flex-col lg:flex-row w-full  lg:gap-5  ">
        
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6">
          <div>
            <Image
              src="/microsoft.svg"
              width={275}
              height={275}
              alt="microsoft"
              className="w-[150px] sm:w-[200px] lg:w-[275px]"
            />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center lg:text-left leading-[1.1]">
  Office Add-INS
  <span className="block text-xl sm:text-3xl lg:text-5xl leading-[1.2]">
    Development Company
  </span>
</h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-sans text-center lg:text-left">
            We specialize in building powerful and customized Office <br className="hidden md:block"/> 
            365 add-ins, delivering seamless solutions with deep <br className="hidden md:block"/> 
            technical expertise and Microsoft-certified capabilities.
          </p>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center lg:items-center gap-8">
  <div
    className="flex flex-wrap justify-center items-center gap-9 mt-5 
               max-md:grid max-md:grid-cols-1 max-md:gap-7"
  >
    {[
      { img: "/world.png", text: "Customer Services" },
      { img: "/excel.png", text: "Marketing" },
      { img: "/powerpoint.png", text: "Sales" },
      { img: "/outlook.png", text: "Business Central" },
    ].map((card, idx) => (
      <div
        key={idx}
        className="relative w-56 h-28  
          rounded-xl 
          bg-white/10 backdrop-blur-lg 
          border border-white/20 
          shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-end p-4
          max-md:w-full max-md:h-24"
      >
        {/* Image */}
        <img
          src={card.img}
          alt={card.text}
          className="absolute -top-8 
                     w-16 h-16
                     max-md:w-14 max-md:h-14 
                     drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]"
        />
        {/* Text */}
        <p className="text-white text-xl tracking-wide max-md:text-sm text-center">
          {card.text}
        </p>
      </div>
    ))}
  </div>
</div>



        
      </div>

      {/* Bottom Button */}
      <div className="buton text-xs sm:text-sm lg:text-xl text-center grid items-center py-2 px-4 mt-10 lg:mt-0 rounded-lg white-border text-white hover:scale-105 transition-transform duration-300">
        get a quote now 
      </div>
      </div>

      
    </div>
  </div>
</SwiperSlide>
<SwiperSlide>
  <div className="h-auto mt-12 w-full flex items-center justify-center ">
    <div className="h-[900px] lg:h-[650px] w-full border border-white rounded-3xl  flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
      
      {/* Floating Robot */}
      <Image
        src="/robot1.svg"
        width={255}
        height={255}
        alt="robot1"
        className="absolute max-md:top-2 z-200 max-md:right-0 -top-3 -right-0 w-[130px] lg:w-[205px] animating-img"
      />

      {/* Main Content */}
      <div className='flex content max-md:mt-14 flex-col gap-5 justify-center items-center w-full'>
        <div className="main flex flex-col lg:flex-row w-full  lg:gap-5  ">
        
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6">
          <div>
            <div className="inline-block px-6 py-3 rounded border-1 shadow-lg white-border">
  <span className="text-white  uppercase tracking-wide text-sm">
    Hire only the top-tier QA engineers
  </span>
</div>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center lg:text-left leading-[1.1]">
  QA Testing
  <span className="block text-xl sm:text-3xl lg:text-5xl leading-[1.2]">
    Development Company
  </span>
</h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-sans text-center lg:text-left">
            We specialize in building powerful and customized Office <br className="hidden md:block"/> 
            365 add-ins, delivering seamless solutions with deep <br className="hidden md:block"/> 
            technical expertise and Microsoft-certified capabilities.
          </p>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center lg:items-center gap-8">
  <div
    className="flex flex-wrap justify-center items-center gap-9 mt-5 
               max-md:grid max-md:grid-cols-1 max-md:gap-7"
  >
    <div
        className="relative w-56 h-28  
          rounded-xl 
          bg-white/10 backdrop-blur-lg 
          border border-white/20 
          shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-end p-4
          max-md:w-full max-md:h-24"
      >
        {/* Image */}
        <img
          src={'/icon1.png'}
          alt='icon'
          className="absolute lg:-top-7 -top-11
                     w-40 h-40 
                     drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]"
        />
        {/* Text */}
        <p className="text-white text-xl tracking-wide max-md:text-sm text-center leading-3">
          Manual QA Testing 
        </p>
      </div>
    <div
        className="relative w-56 h-28  
          rounded-xl 
          bg-white/10 backdrop-blur-lg 
          border border-white/20 
          shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-end p-4
          max-md:w-full max-md:h-24"
      >
        {/* Image */}
        <img
          src={'/icon2.png'}
          alt='icon'
          className="absolute lg:-top-2  -top-5
                     w-30 h-30
                     drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]"
        />
        {/* Text */}
        <p className="text-white text-xl tracking-wide max-md:text-sm text-center leading-4 whitespace-nowrap">
          Automation Testing <br /> Services 
        </p>
      </div>
    <div
        className="relative w-56 h-28  
          rounded-xl 
          bg-white/10 backdrop-blur-lg 
          border border-white/20 
          shadow-[0_15px_35px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-end p-4
          max-md:w-full max-md:h-24"
      >
        {/* Image */}
        <img
          src={'/icon3.png'}
          alt='icon'
          className="absolute md:top-2 top-0
                     w-10 h-10
                     max-md:w-10 max-md:h-10 
                     drop-shadow-[0_8px_15px_rgba(0,0,0,0.25)]"
        />
        {/* Text */}
        <p className="text-white text-xl tracking-wide max-md:text-sm text-center leading-4 whitespace-nowrap">
          Selenium Automation <br /> Services 
        </p>
      </div>
  </div>
</div>



        
      </div>

      {/* Bottom Button */}
      <div className="buton text-xs sm:text-sm lg:text-xl text-center grid items-center py-2 px-4 mt-10 lg:mt-0 rounded-lg white-border text-white hover:scale-105 transition-transform duration-300">
        get a quote now 
      </div>
      </div>

      
    </div>
  </div>
</SwiperSlide>
      </Swiper>
    </div>
    </>
  );
}
