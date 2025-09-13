"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPage from "./Contact";
import MyMap from "./map";
import Showcase from "./showcase";
import { useProjectsContext } from "../context/GlobalContext";
import Minifoam from "./minifoam";
import Developer from "./developers";

gsap.registerPlugin(ScrollTrigger);

const ServicePart = () => {
  const heroRef = useRef(null);
  const consultRef = useRef(null);
  const workRef = useRef(null);
  const secondConsultRef = useRef(null);
  const servicesRef = useRef(null);
  const otherServicesRef = useRef(null);
  const {open, setOpen} = useProjectsContext()

useEffect(() => {
  let ctx = gsap.context(() => {
    const sections = [
      heroRef.current,
      consultRef.current,
      workRef.current,
      secondConsultRef.current,
      servicesRef.current,
      otherServicesRef.current,
    ];

    sections.forEach((section) => {
      if (!section) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // jab section viewport me aayega
          toggleActions: "play none none reverse",
        },
      });

      tl.from(section.querySelectorAll("h1, p, img, div"), {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });
    });
  });

  return () => ctx.revert();
}, []);


  const services = [
    "PowerApps Portal Development",
    "Power Automate Development",
    "Microsoft Azure PowerApps Development",
    "Office 365 PowerApps Development",
    "SharePoint PowerApps Development",
    "Dynamic 365 Power Apps Development",
    "Power Virtual Agents",
    "PowerApps with Web APIs",
  ];

  return (
    <div className="w-full ">
      <Minifoam/>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="flex flex-col justify-center items-center gap-7 mt-20 top-border pt-10 px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-white text-center">
          PowerApps Development Company
        </h1>
        <p className="text-white text-base sm:text-lg font-sans text-center max-w-4xl">
          Asians Technologies is a leading PowerApps company, delivering 70+ apps across multiple industries with full development and support services.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 w-full sm:w-[90%] lg:w-[70%] mt-3 px-2">
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            ✅ Premium Quality Solutions
          </div>
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            🚀 Next-Gen Technologies
          </div>
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            ⚡ Lightning-Fast Delivery
          </div>
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            ⏰ Always On-Time
          </div>
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            🔒 Secure & Scalable Development
          </div>
          <div className="px-3 py-2 max-sm:w-full text-white white-border text-sm sm:text-lg">
            🔗 Seamless Integration Support
          </div>
        </div>
        <div>
  <button
    onClick={() => setOpen(true)}
    className="text-white text-xl sm:text-2xl lg:text-3xl px-4 py-2  white-border rounded-md mt-2 md:mt-5 transition-all duration-200 hover:scale-110 z-20"
  >
    Consult with Expert
  </button>
  </div>

      </div>

      {/* Consulting Section */}
      <div
        ref={consultRef}
        className="flex flex-col justify-center items-center gap-7 pt-10 px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Digitize your business workflows with our{" "}
          <br className="hidden md:block" /> PowerApps Consulting Services
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl">
          <div className="left w-full md:w-1/2">
            <p className="text-white font-sans text-base sm:text-lg md:text-xl text-center md:text-left">
              Microsoft Power Platform provides a powerful low-code environment for building custom, business-specific applications quickly and efficiently. At Asians Technologies, we specialize in PowerApps consultation, integration, PoC, and custom development services. Our certified experts handle analysis, design, development, testing, and deployment of scalable solutions, helping businesses streamline operations, boost productivity, and achieve goals with secure, innovative, and tailored PowerApps solutions that drive digital transformation and enhance overall business performance.
            </p>
          </div>
          <div className="right w-full md:w-1/2">
            <img
              src="/programmer.png"
              alt=""
              className="w-full h-auto shadow-lg object-contain"
            />
          </div>
        </div>
      </div>

      <Showcase/>

      {/* Second Consulting Section */}
      <div
        ref={secondConsultRef}
        className="flex flex-col justify-center items-center gap-7 mt-10 pt-10 px-4"
      >
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Digitize your business workflows with our{" "}
          <br className="hidden md:block" /> PowerApps Consulting Services
        </h1>
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 w-full max-w-7xl">
          <div className="left w-full md:w-1/2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 text-left">
              Power Your Business with Asians Technologies
            </h1>
            <p className="text-white font-sans text-base sm:text-lg md:text-xl text-left">
              Microsoft Power Platform provides a powerful low-code environment for building custom, business-specific applications quickly and efficiently. At Asians Technologies, we specialize in PowerApps consultation, integration, PoC, and custom development services. Our certified experts handle analysis, design, development, testing, and deployment of scalable solutions, helping businesses streamline operations, boost productivity, and achieve goals with secure, innovative, and tailored PowerApps solutions that drive digital transformation and enhance overall business performance.
            </p>
          </div>
          <div className="right w-full md:w-1/2">
            <img
              src="/power.png"
              alt=""
              className="w-full h-auto shadow-lg object-contain"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="w-full mt-20 rounded-md white-border "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-start white-border px-4 py-6 font-sans text-white text-lg sm:text-xl md:text-2xl hover:text-cyan-300 transition-colors"
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      {/* Other Services Section */}
      <div ref={otherServicesRef} className="mt-20 px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white text-center mb-10">
          Other Related Services
        </h1>
        <div className="flex flex-wrap w-full justify-center lg:justify-between items-center gap-5">
          <div className="flex md:mt-20 flex-col justify-center items-center gap-2 py-4 px-6 white-border rounded-lg w-full sm:w-[45%] lg:w-auto">
            <img src="/s1.png" alt="s1" className="w-16 sm:w-20 " />
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white text-center">
              SharePoint Development
            </h1>
          </div>
          <div className="flex md:mb-20 flex-col justify-center items-center gap-2 py-4 px-6 white-border rounded-lg w-full sm:w-[45%] lg:w-auto">
            <img src="/s2.png" alt="s2" className="w-16 sm:w-20" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white text-center">
              Microsoft Power Automate
            </h1>
          </div>
          <div className="flex md:mt-20 flex-col justify-center items-center gap-2 py-4 px-6 white-border rounded-lg w-full sm:w-[45%] lg:w-auto">
            <img src="/s3.png" alt="s3" className="w-16 sm:w-20" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white text-center">
              ASP.NET Development
            </h1>
          </div>
        </div>

        {/* Profile Section */}

        
      </div>
      <Developer/>
      <ContactPage />
        <MyMap />
    </div>
  );
};

export default ServicePart;
