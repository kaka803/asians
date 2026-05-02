"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function MyMap() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      let ctx = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".map-section",
            start: "top 75%",
            // Set toggleActions to only play once and not reverse on scroll up
            toggleActions: "play none none none", 
          },
        });

        tl.from(".map-content h2", { x: -30, opacity: 0, duration: 0.8, ease: "power2.out" })
          .from(".map-content p", { x: -20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .from(".address-card", { scale: 0.95, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.4")
          .from(".map-image-container", { scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.8")
          .from(".map-heading", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(".footer-link-item", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
          .from(".career-box", { y: 40, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5");
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="map-section mt-20">
      {/* Top Section (Address + Image Placeholder) */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-10 main-container">
        
        {/* Left Section (Address) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center map-content">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-blue-500/50"></div>
            <span className="text-blue-400 uppercase tracking-[0.3em] text-xs font-bold">Contact</span>
          </div>
          <h2 className="text-4xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.9]">
            Find Us <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">on the Map</span>
          </h2>
          <p className="text-white/40 mt-6 max-w-md font-sans text-sm leading-relaxed">
            We are strategically located to serve our global clients with excellence and innovation.
          </p>

          <div className="address-card mt-10 w-full px-8 py-8 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] text-left border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 blur-[60px] group-hover:bg-blue-500/10 transition-all duration-700"></div>
            
            <h3 className="text-lg font-medium text-white font-sans flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-full text-blue-400">
                <MapPin size={18} />
              </span>
              Office HQ
            </h3>
            <div className="mt-6 space-y-2">
              <p className="text-base text-white/80 font-sans">Main Sargodha Road, Hafizabad</p>
              <p className="text-xs text-white/40 font-sans tracking-wide">Punjab, Pakistan | Near Punjab College</p>
            </div>

            <div className="mt-8">
              <a
                href="https://maps.google.com/?q=Main+Sargodha+Road,+Hafizabad,+Punjab,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300 bg-white/5 rounded-full hover:bg-white hover:text-black overflow-hidden"
              >
                <span className="relative z-10 text-xs uppercase tracking-widest">Get Directions</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-[60%] map-image-container min-h-[350px] lg:min-h-[400px] rounded-2xl overflow-hidden relative ">
          <img 
            src="/map.png" 
            alt="Asians Technologies Location Map" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          {/* Overlay gradient to blend with the theme */}
          
        </div>
      </div>

      {/* Heading - Removed as it's now integrated below for better space usage */}

      {/* Bottom Section */}
      <div className="w-full text-white px-6 md:px-20 py-10 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
          
          {/* Know More Title & Links */}
          <div className="flex-1">
             <h4 className="text-xl font-bold uppercase tracking-tighter text-white mb-6">Know More <span className="text-blue-400">About Us</span></h4>
             <div className="flex flex-wrap gap-x-12 gap-y-4">
                <div className="flex gap-6 items-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/20">Explore</span>
                  <a href="#" className="footer-link-item text-sm text-white/50 hover:text-white transition-colors">Company</a>
                  <a href="#" className="footer-link-item text-sm text-white/50 hover:text-white transition-colors">Services</a>
                  <a href="#" className="footer-link-item text-sm text-white/50 hover:text-white transition-colors">Portfolio</a>
                </div>
                <div className="flex gap-6 items-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/20">Connect</span>
                  <a href="#" className="footer-link-item text-sm text-white/50 hover:text-white transition-colors">Blog</a>
                  <a href="#" className="footer-link-item text-sm text-white/50 hover:text-white transition-colors">Technologies</a>
                </div>
             </div>
          </div>

          {/* Compact Career Box */}
          <div className="career-box flex items-center gap-6 p-4 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 bg-white/[0.02]">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 mb-1">Join Our Team</h3>
                <p className="text-lg font-medium text-white tracking-tight">+92 305 9990279</p>
              </div>
              <a href="mailto:careers@asianstechnologies.com" className="group/apply flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white hover:text-black rounded-full text-[10px] font-medium uppercase tracking-widest transition-all">
                Apply <ArrowRight size={12} className="group-hover/apply:translate-x-1 transition-transform" />
              </a>
          </div>
        </div>

        {/* Minimal Copyright Bar */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20">
           <p>© {new Date().getFullYear()} Asians Technologies</p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
           </div>
        </div>
      </div>
    </div>
  );
}
