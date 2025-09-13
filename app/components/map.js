"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MiniMap from "./Minimap";

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

// Import Leaflet CSS statically (safe for both server and client)
import "leaflet/dist/leaflet.css";

export default function MyMap() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      let ctx = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".map-section",
            start: "top 70%",
            end: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(".map", { scale: 0.8, opacity: 0, duration: 1, ease: "power3.out" })
          .from(".map-heading", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(".footer-links div a", { y: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.3")
          .from(".career-box", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="map-section mt-20">
  {/* Top Section (Map + Address) */}
  <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 main-container map">
    {/* Left Section */}
    <div className="w-full lg:w-[40%] text-center lg:text-left">
      <h2 className="text-3xl lg:text-5xl text-white">Find Us on the Map</h2>
      <p className="text-white/80 mt-2 max-w-2xl mx-auto font-sans lg:mx-0">
        We are located at a convenient spot in the heart of the city. 
        You can easily find us using the map below or copy our address for quick reference.
      </p>

      {/* Address Box */}
      <div className="mt-6 w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-left shadow-lg">
        <h3 className="text-lg font-semibold text-white font-sans flex items-center gap-2">
          📍 Our Address
        </h3>
        <p className="text-sm text-white/80 mt-2 font-sans">
          Main Sargodha Road, Jhang, Punjab, Pakistan <br />
          Near Punjab College, Opposite City Mall
        </p>
        <div className="mt-6">
          <a
            href="https://maps.google.com/?q=Main+Sargodha+Road,+Jhang,+Punjab,+Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-xl white-border text-white transition-all duration-300"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>

    {/* Right Section (Map) */}
    <div className="w-full lg:w-[60%] h-[auto] lg:h-[auto] rounded-2xl overflow-hidden">
      <MiniMap />
    </div>
  </div>

  {/* Heading */}
  <h1 className="map-heading text-4xl md:text-5xl pt-12 main-container text-white text-center md:text-left">
    Know More About Us
  </h1>

  {/* Bottom Section */}
  <div className="w-full text-white px-6 md:px-20 py-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
      {/* Footer Links */}
      <div className="footer-links flex flex-wrap gap-12 md:gap-16 text-lg md:text-xl font-medium text-center md:text-left justify-center md:justify-start">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <a href="#" className="hover:text-gray-300">Company</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Portfolio</a>
        </div>
        <div className="flex flex-col gap-3 items-center md:items-start">
          <a href="#" className="hover:text-gray-300">Blog</a>
          <a href="#" className="hover:text-gray-300">Technologies</a>
          <a href="#" className="hover:text-gray-300">Testimonials</a>
        </div>
      </div>

      {/* Career Box */}
      <div className="career-box white-border rounded-xl px-6 py-4 text-center border border-gray-500">
        <h3 className="mb-3 text-lg font-semibold">For Career Inquiry</h3>
        <p className="text-lg">+92-305-9990279</p>
        <p className="text-sm mt-1">www.asianstechnologies.com</p>
      </div>
    </div>
  </div>
</div>

  );
}