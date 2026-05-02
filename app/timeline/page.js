"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Milestone, Calendar, PlayCircle, Image as ImageIcon, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TimelinePage = () => {
  const itemsRef = useRef([]);
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------- Fetch Posts from Backend --------------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

// -------------------- GSAP Animation --------------------
useEffect(() => {
  if (!posts.length) return;

  let ctx = gsap.context(() => {
    // Animate the central vertical line height
    gsap.to(".timeline-line-progress", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    // Animate each timeline item
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const isEven = index % 2 === 0;

      gsap.fromTo(
        item.querySelector(".content-card"),
        { 
          x: isEven ? 80 : -80, 
          opacity: 0,
          scale: 0.9 
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate the center node pulse
      gsap.fromTo(
        item.querySelector(".timeline-node"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return () => ctx.revert();
}, [posts]);


  return (
    <>
      <Navbar />

      

      {/* Timeline Section */}
      <div className="text-white mt-20 min-h-screen py-20 px-6 overflow-hidden">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-pulse">
            <Milestone size={14} className="text-blue-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Our Legacy</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
            Digital <span className="text-blue-400">Evolution</span>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Witness the milestones of Asians Technologies as we bridge the gap between imagination and reality.
          </p>
        </div>

        <div className="timeline-container relative max-w-6xl mx-auto">
          {/* Central Progress Line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-white/5">
             <div className="timeline-line-progress absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-400 py-20 font-sans uppercase tracking-widest">No Milestones Recorded Yet.</p>
          ) : (
            <div className="space-y-24 lg:space-y-32">
              {posts.map((post, index) => (
                <div
                  key={post._id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`relative flex flex-col lg:flex-row items-center justify-between w-full
                    ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content Card Area */}
                  <div className="w-full lg:w-[45%] content-card">
                    <div className="group relative rounded-[2rem] border border-white/10 p-8 lg:p-10 shadow-2xl bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500">
                      
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 mb-6">
                         <Calendar size={14} className="text-blue-400" />
                         <span className="text-xs uppercase tracking-widest font-bold text-white/40">{post.date}</span>
                      </div>

                      <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-white/50 font-sans text-base md:text-lg leading-relaxed mb-8">
                        {post.description}
                      </p>

                      {/* Media Assets */}
                      {post.image && (
                        <div className="relative rounded-2xl overflow-hidden border border-white/5 group/img">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                        </div>
                      )}

                      {post.video && (
                        <div className="relative rounded-2xl overflow-hidden border border-white/5">
                          <video
                            src={post.video}
                            controls
                            className="w-full h-auto"
                          ></video>
                        </div>
                      )}

                      {/* Subtle Icon Decoration */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                         <Sparkles size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Central Node Indicator */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-10 items-center justify-center z-20">
                    <div className="timeline-node w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl relative">
                       {/* Pulse Effect */}
                       <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping"></div>
                       <span className="text-xs font-bold text-blue-400 relative z-10">{index + 1}</span>
                    </div>
                  </div>

                  {/* Empty space for layout balance */}
                  <div className="hidden lg:block w-[45%]"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TimelinePage;
