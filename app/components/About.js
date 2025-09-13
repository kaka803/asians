'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const titleref = useRef(null)

  let mm = gsap.matchMedia();

useEffect(() => {
  let ctx = gsap.context(() => {
    // ---- Desktop Animations ----
    mm.add("(min-width: 999px)", () => {
      // Floating image scroll animation
      gsap.timeline({
        scrollTrigger: {
          trigger: ".showcase",
          start: "top 100%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img", { top: 830, x: 950, scale: 1.2, duration: 0.8 }, "same");

      gsap.timeline({
        scrollTrigger: {
          trigger: ".contact",
          start: "top 100%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img2", { top: 1750, x: 0, scale: 1, duration: 0.8 });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 100%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img2", { top: 2600, x: 950, scale: 1, duration: 0.8 });

      // Title, Desc & Cards animation
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-page",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleref.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".paragraph",
          {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ".desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          ".box",
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.3"
        );
    });

    // ---- Mobile Animations ----
    mm.add("(max-width: 604px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".showcase",
          start: "top 100%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img", { top: 950, x: 190, scale: 1, duration: 1 });

      // Title, Desc & Cards mobile
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-page",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".contact",
          start: "top 100%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img2", { top: 1980, x: 0, scale: 0.9, duration: 0.8 });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 100%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      }).to(".moving-img2", { top: 3450, x: 210, scale: 1, duration: 0.8 });

      tl.from(titleref.current, { y: -30, opacity: 0, duration: 0.8 })
        .from(".paragraph", { y: -15, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".desc", { y: 15, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(
          ".box",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        );
    });
  });

  // 🔥 Cleanup (important for Next.js route changes)
  return () => {
    ctx.revert(); // sab animations reset
    mm.revert(); // matchMedia cleanup
    ScrollTrigger.getAll().forEach((t) => t.kill()); // scrollTriggers kill
  };
}, []);


  return (
    <div>
      <section className="about-page w-full relative py-5 max-md:mt-15 px-5">
        <div>
          <Image
            src="/robot1.svg"
            width={255}
            height={255}
            alt="robot1"
            className="moving-img   moving-img2 max-[1200px]:hidden max-[440px]:block absolute top-23 z-1000 left-4  max-md:-top-18 max-md:-left-5 max-md:w-[150px]"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 ref={titleref} className="about-title text-6xl md:text-7xl text-white uppercase lg:mt-30">
            About
          </h2>
          <p className="paragraph text-3xl md:text-3xl text-white">
            Asians Technologies
          </p>
          <p className="desc text-white max-w-3xl mx-auto mt-4 text-[17px] font-sans leading-relaxed">
            We specialize in delivering complete end-to-end hybrid app development — from idea to execution. 
            Our team covers everything: coding, UI/UX design, requirement analysis, testing, deployment, and ongoing maintenance. 
            We’re committed to building powerful, scalable, and high-performing digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="Stats px-4">
          {/* TOP ROW */}
          <div className="top grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-7">
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">20+</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">Technology Expert</span>
              </h1>
            </div>
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">04</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">YEARS OF EXPERIENCE</span>
              </h1>
            </div>
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">100+</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">MOBILE APP DEVELOPED</span>
              </h1>
            </div>
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">30+</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">POWERAPPS DEVELOPED</span>
              </h1>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="bottom grid grid-cols-2 sm:flex sm:justify-center items-center gap-6 mt-10">
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">20+</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">WEB APP DEVELOPED</span>
              </h1>
            </div>
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">98%</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl whitespace-nowrap text-white">Client Retention <br /> RATE</span>
              </h1>
            </div>
            <div className="box flex flex-col justify-center items-center gap-2 white-border rounded-xl w-full sm:w-[220px] px-7 py-4">
              <h1 className="text-center">
                <span className="text-4xl text-white">20+</span><br />
                <span className="text-xl sm:text-2xl md:text-3xl text-white">Technology Expert</span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
