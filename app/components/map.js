"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      <div className="w-full flex flex-row justify-center items-center gap-10 h-auto main-container map mt-20">
        <div className="mb-6 text-center">
          <h2 className="text-3xl lg:text-5xl text-white md:text-start">Find Us on the Map</h2>
          <p className="text-white/80 mt-2 max-w-2xl mx-auto font-sans md:text-start">
            We are located at a convenient spot in the heart of the city. You can easily find us using the map below or copy our address for quick reference.
          </p>
          <div className="mt-6 w-full inline-block px-6 py-6 bg-white/10 backdrop-blur-md rounded-2xl text-left shadow-lg">
            <h3 className="text-lg font-semibold text-white font-sans flex items-center gap-2">📍 Our Address</h3>
            <p className="text-sm text-white/80 mt-2 font-sans">
              Main Sargodha Road, Jhang, Punjab, Pakistan <br />
              Near Punjab College, Opposite City Mall
            </p>
            <h3 className="text-lg font-semibold text-white font-sans mt-4 flex items-center gap-2">🕒 Opening Hours</h3>
            <p className="text-sm text-white/80 mt-2 font-sans">
              Monday – Friday: 9:00 AM – 6:00 PM <br />
              Saturday: 10:00 AM – 4:00 PM <br />
              Sunday: Closed
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
        <div className="w-[60%] h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <MapContainer
            center={[32.06244569007046, 73.70420842384429]}
            zoom={13}
            zoomControl={false}
            attributionControl={false}
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              minZoom={0}
              maxZoom={20}
              subdomains={["a", "b", "c", "d"]}
            />
          </MapContainer>
        </div>
      </div>
      <h1 className="map-heading text-5xl pt-9 main-container text-white max-md:text-center">Know More About Us</h1>
      <div className="w-full text-white px-20 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-white">
          <div className="footer-links flex flex-wrap gap-16 text-xl font-medium text-center md:text-left justify-center md:justify-start">
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
          <div className="career-box white-border rounded-xl px-6 py-4 text-center border border-gray-500">
            <h3 className="mb-3">For Career Inquiry</h3>
            <p className="text-lg">+92-305-9990279</p>
            <p className="text-sm mt-1">www.asianstechnologies.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}