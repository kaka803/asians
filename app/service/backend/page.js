'use client'
import React from 'react'
import Navbar from '@/app/components/navbar'
import Image from 'next/image'
import MyMap from '@/app/components/map'
import Footer from '@/app/components/footer'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react'
import { useProjectsContext } from '@/app/context/GlobalContext'
import Minifoam from '@/app/components/minifoam'


const Page = () => {

  const {open, setOpen} = useProjectsContext()
    
    



    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Heading
      tl.from(".main-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
      })

      // Subheading
      .from(".sub-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")

      // Services Grid (stagger)
      .from(".services-grid div p", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      }, "-=0.4")

      // Button
      .from(".consult-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
      }, "-=0.3")

      
    });

    return () => ctx.revert(); // cleanup GSAP
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact",
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".contact .left", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".contact .right",
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ".contact form div, .contact .notes",
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5"
      );
      });

  return () => ctx.revert();
  }, []);

     



  return (
    <>
    <Navbar/>
    <Minifoam/>
    <div className='main-container '>
      <div className="flex flex-col justify-center items-center gap-5 mt-30">
          
          {/* Heading */}
          <h1 className='main-heading text-center text-6xl text-white'>
           Backend
          </h1>
          
          {/* Subheading */}
          <p className='sub-heading text-white font-sans mb-3 text-md text-center'>
            Expert backend development with Node.js, Laravel, PHP, and Python 
            <br className='hidden md:block' /> 
            secure, scalable, and performance-driven solutions.
          </p>
          
          {/* Services */}
         <div className="mx-auto p-4 py-6 rounded-lg white-border">
  <div className="px-20 services-grid grid grid-cols-1 sm:grid-cols-2  gap-x-6 gap-y-6 text-start">
    
    {/* Column 1 */}
    <div className="space-y-2">
      <p className="text-xl md:text-2xl text-white">Node JS</p>
      <p className="text-xl md:text-2xl text-white">Laravel</p>
    </div>
    
    {/* Column 2 */}
    <div className="space-y-2">
      <p className="text-xl md:text-2xl text-white">PHP</p>
      <p className="text-xl md:text-2xl text-white">Python</p>
    </div>
    
    

</div>

</div>


          
          {/* Button */}
          <button onClick={() => {setOpen(true)}} className='consult-btn white-border p-2 px-3 text-white text-xl rounded-lg mt-3'>
            Consult with Expert 
          </button>
        </div>
      <div className="w-full contact border overflow-hidden border-white rounded-3xl mt-20 lg:h-[600px] flex flex-col lg:flex-row items-center">
          {/* LEFT SECTION */}
          <div className="left overflow-hidden w-full lg:min-w-[35%] lg:w-[35%] lg:right-border h-auto lg:h-screen px-5 py-10 flex justify-center">
            <div className="flex flex-col items-start justify-center gap-10 max-md:justify-center max-md:items-center">
              <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-4xl lg:text-5xl text-white max-md:text-center">
                  We Are Here To <br className="hidden lg:block" /> Help You
                </h1>
                <p className="text-white text-lg lg:text-xl max-md:text-center max-md:w-full">
                  contact us :
                </p>
              </div>
              <div className="flex items-center justify-start gap-5 p-2 white-border rounded-xl">
                <Image src="/whatsapp.png" alt="" width={40} height={40} />
                <p className="text-xl lg:text-2xl text-white">+92-305-9990279</p>
              </div>
              <div className="flex items-center justify-start gap-5 p-2 white-border rounded-xl">
                <Image src="/mail.png" alt="" width={40} height={40} />
                <p className="text-base lg:text-lg text-white">
                  www.asianstechnologies.com
                </p>
              </div>
            </div>
          </div>
    
          {/* RIGHT SECTION */}
          <div className="right w-full lg:min-w-[65%] lg:w-[65%] lg:left-border flex justify-center items-center h-auto lg:h-screen">
            <div className="w-full text-white px-6 py-10">
              <form className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="flex flex-col gap-6 ">
                  <div>
                    <label className="block text-sm mb-1">Your Name*</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                    />
                  </div>
    
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                    />
                  </div>
    
                  <div>
                    <label className="block text-sm mb-1">Project Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2 resize-none"
                    />
                  </div>
                </div>
    
                {/* Right Side */}
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm mb-1">Your Email*</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                    />
                  </div>
    
                  <div>
                    <label className="block text-sm mb-1">Select Project Budget</label>
                    <select className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2">
                      <option className="bg-black">Less than $1,000</option>
                      <option className="bg-black">$1,000 - $5,000</option>
                      <option className="bg-black">$5,000 - $10,000</option>
                      <option className="bg-black">$10,000+</option>
                    </select>
                  </div>
                </div>
              </form>
    
              {/* Footer Notes */}
              <div className="max-w-5xl contact-button mx-auto mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl border border-white text-white
                         hover:bg-white hover:text-black transition-all duration-300 shadow-md"
                >
                  Send Message
                </button>
              </div>
              <div className="notes max-w-5xl mx-auto mt-8 text-sm text-gray-400">
                <p>100% Secure and Confidential.</p>
                <p className="mt-2">
                  This site is protected by reCAPTCHA and the Google
                  <a href="#" className="underline mx-1">
                    Privacy Policy
                  </a>{" "}
                  and
                  <a href="#" className="underline ml-1">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
        <MyMap/>
        <Footer/>
    </div>
    
    </>
  )
}

export default Page
