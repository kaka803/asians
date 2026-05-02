"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useProjectsContext } from "../context/GlobalContext";
import { ExternalLink, MessageCircle, LayoutGrid } from "lucide-react";
import ContactPage from "../components/Contact";
import MyMap from "../components/map";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const { projects, projectloading } = useProjectsContext();
  const [activeCategory, setActiveCategory] = useState("");

  // 🔹 Categories generate karna (unique categories)
  const categories = useMemo(() => {
    return [
      ...new Set(projects?.projects?.map((p) => p.category.charAt(0).toUpperCase() + p.category.slice(1)))
    ];
  }, [projects?.projects]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]); // default category
    }
  }, [categories, activeCategory]);

  // 🔹 Active category ke projects filter karo
  const filteredProjects = projects?.projects?.filter(
    (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  useEffect(() => {
    // Stagger animation for project cards whenever category changes
    if (!projectloading) {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(1.2)" 
        }
      );
    }
  }, [activeCategory, projectloading]);

  // 🔹 Colors for tags
  const colors = [
    "bg-[#ffc0d9]",
    "bg-[#c0ffd9]",
    "bg-[#c0d9ff]",
    "bg-[#fffac0]",
    "bg-[#e0c0ff]",
    "bg-[#ffc0e1]",
    "bg-[#c0fff4]",
    "bg-[#ffd9c0]",
  ];

  return (
    <>
      <Navbar />
      <section className="px-6 py-20 pt-32 text-white min-h-screen overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] -z-10"></div>

        {/* Heading Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 animate-pulse">
            <LayoutGrid size={14} className="text-blue-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/60">Our Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter uppercase mb-6 leading-tight">
            {activeCategory} <span className="text-blue-400">Excellence</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/30 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">{activeCategory} Portfolio</span>
          </div>
          <p className="text-white/40 max-w-2xl mx-auto font-sans leading-relaxed text-base md:text-lg">
            A curated showcase of our most innovative {activeCategory.toLowerCase()} solutions, built with precision and modern technology.
          </p>
        </div>

        {/* Category Filter - Refined Pill Design */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 border 
                ${activeCategory === cat
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto space-y-24">
          {projectloading ? (
            // 🔹 Modern Skeleton Loader
            [...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 animate-pulse">
                <div className="flex-1 space-y-6">
                   <div className="h-10 w-48 bg-white/10 rounded-xl"></div>
                   <div className="h-20 w-full bg-white/5 rounded-xl"></div>
                   <div className="flex gap-4"><div className="h-8 w-24 bg-white/10 rounded-full"></div></div>
                </div>
                <div className="lg:w-1/2 h-[350px] bg-white/5 rounded-3xl"></div>
              </div>
            ))
          ) : (
            filteredProjects.map((p, idx) => (
              <div
                key={p._id || idx}
                className={`project-card group flex flex-col lg:flex-row items-stretch gap-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-blue-500/30 
                  ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text Content */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="w-10 h-[1px] bg-blue-500/30"></span>
                     <span className="text-[9px] uppercase tracking-[0.3em] text-blue-400 font-bold">Featured Case Study</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-5xl font-semibold text-white mb-4 tracking-tighter leading-tight group-hover:text-blue-400 transition-colors duration-500">
                    {p.name}
                  </h3>
                  
                  <p className="text-white/50 mb-6 font-sans leading-relaxed text-base lg:max-w-md">
                    {p.description}
                  </p>

                  {/* High-Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags?.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium border border-white/5 bg-white/5 text-white/30 group-hover:border-blue-500/10 group-hover:text-blue-300 transition-all"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Simple & Readable Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full text-base font-medium font-sans transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg overflow-hidden"
                    >
                      <span>Explore</span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>

                    <a 
                      href="https://wa.me/923059990279"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/20 text-white rounded-full text-base font-medium font-sans transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                    >
                      Hire Us <MessageCircle size={16} className="text-blue-400" />
                    </a>
                  </div>
                </div>

                {/* Image Section - More Compact */}
                <div className="lg:w-[45%] h-[300px] lg:h-[450px] relative overflow-hidden group/img">
                  <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 z-10"></div>
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="main-container space-y-24">
        <ContactPage />
        <MyMap />
      </section>
      <Footer />
    </>
  );
}
