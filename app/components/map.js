"use client";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function MyMap() {
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
        <div className="w-full lg:w-[60%] map-image-container min-h-[50px] lg:min-h-[400px] rounded-2xl overflow-hidden relative ">
          <img 
            src="/map.png" 
            alt="Asians Technologies Location Map" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          {/* Overlay gradient to blend with the theme */}
          
        </div>
      </div>

      {/* Heading - Removed as it's now integrated below for better space usage */}

      {/* Bottom Section (Premium Footer) */}
      <div className="w-full relative mt-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/5 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Brand & Vision Section */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl lg:text-5xl font-semibold tracking-tighter text-white leading-tight">
                  KNOW MORE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                    ABOUT US
                  </span>
                </h4>
                <p className="text-white/40 text-sm font-sans max-w-sm leading-relaxed">
                  Empowering businesses through cutting-edge technology and innovative digital solutions. Join us on our journey to redefine the future.
                </p>
              </div>

              {/* Enhanced Career Box */}
              <div className="career-box group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-400/60 mb-1">Join Our Team</h3>
                      <p className="text-xl font-medium text-white tracking-tight">+92 305 9990279</p>
                    </div>
                  </div>
                  
                  <a href="mailto:careers@asianstechnologies.com" className="flex items-center justify-between group/apply px-6 py-4 bg-white/5 hover:bg-white rounded-2xl transition-all duration-500">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white group-hover/apply:text-black">Drop Your CV</span>
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-white group-hover/apply:bg-black group-hover/apply:text-white transition-all">
                      <ArrowRight size={16} className="group-hover/apply:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6">
                <h5 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400/60">Explore</h5>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Company</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Services</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Portfolio</a></li>
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <h5 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400/60">Connect</h5>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Blog</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Technologies</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Support</a></li>
                </ul>
              </div>

              <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
                <h5 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-400/60">Legal</h5>
                <ul className="flex flex-col gap-4">
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Terms of Service</a></li>
                  <li><a href="#" className="footer-link-item text-sm font-sans text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 font-sans">Ready to build</span>
               </div>
               <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 font-sans">
                 © {new Date().getFullYear()} Asians Technologies
               </p>
            </div>
            
            {/* Social or Extra Links if needed */}
            <div className="flex gap-10">
               <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/10 italic font-sans">Premium Digital Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
