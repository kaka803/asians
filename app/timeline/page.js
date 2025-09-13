"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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

  // Cleanup: purane triggers hatane ke liye
  ScrollTrigger.getAll().forEach((t) => t.kill());

  itemsRef.current.forEach((item) => {
    if (!item) return;

    gsap.fromTo(
      item,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",   // jab element viewport mai enter ho
          end: "bottom 60%",  // thoda neeche tak
          toggleActions: "play none none reverse", // sirf ek baar play + reverse
        },
      }
    );
  });

  // Unmount hone par cleanup
  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, [posts]);


  return (
    <>
      <Navbar />

      

      {/* Timeline Section */}
      <div className="text-white mt-20 min-h-screen py-10 px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl lg:text-7xl ">
            Our Journey Through Time
          </h1>
          <p className="mt-2 text-gray-300 font-sans text-lg">
            Every milestone reflects our growth, dedication, and vision. Explore
            our timeline to see how we have evolved step by step.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}

          {loading ? (
            <p className="text-center text-gray-400">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-400">No posts found.</p>
          ) : (
            posts.map((post, index) => (
              <div
                key={post._id}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`mb-12 flex flex-col lg:flex-row items-center lg:items-start ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Box */}
                <div
                  className={`rounded-2xl white-border p-6 shadow-xl w-full lg:w-1/2 ${
                    index % 2 === 0 ? "lg:ml-10" : "lg:mr-10"
                  }`}
                >
                  <h2 className="text-xl lg:text-2xl">{post.title}</h2>
                  <p className="text-sm text-gray-400 font-sans">{post.date}</p>
                  <p className="mt-3 text-gray-300 font-sans">{post.description}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="mt-4 rounded-xl w-full"
                    />
                  )}
                  {post.video && (
                    <video
                      src={post.video}
                      controls
                      className="mt-4 rounded-xl w-full"
                    ></video>
                  )}
                </div>

                {/* Circle Indicator */}
                <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-white text-black shadow-lg z-10">
                  {index + 1}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TimelinePage;
