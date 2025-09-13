"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { HashLoader } from "react-spinners";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  budget: 'Less than $1,000', // default pehla option select
  description: '',
});
const [sendloading, setsendloading] = useState(false)

  useEffect(() => {
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

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsendloading(true)
    try {
      const response = await fetch("/api/addmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          urgent: false,
        }),
      });

      const data = await response.json();
      setsendloading(false)
      

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        setFormData({
  name: '',
  phone: '',
  email: '',
  budget: 'Less than $1,000', 
  description: '',
})
        return;
      }

      alert(data.message);
      setFormData({
        name: "",
        phone: "",
        email: "",
        budget: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <>
    <div className="text-center mb-10">
  <h2 className="text-4xl md:text-6xl mt-15 text-white uppercase lg:mt-30">
    Get in Touch <br />With Us
  </h2>
  <p className="mt-4 font-sans  text-md md:text-lg text-gray-100 max-w-2xl mx-auto">
    Have a question or want to start a project? Fill out the form below and our team will get back to you within 24 hours.
  </p>
</div>

    
    <div className="w-full contact border overflow-hidden border-white rounded-3xl mt-5 lg:h-[600px] flex flex-col lg:flex-row items-center">
      {/* LEFT SECTION */}
      <div className="left overflow-hidden w-full lg:min-w-[35%] lg:w-[35%] lg:right-border h-auto lg:h-auto px-5 py-10 flex justify-center">
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
      <div className="right w-full lg:min-w-[65%] lg:w-[65%] lg:left-border flex justify-center items-center h-auto lg:h-auto">
        <div className="w-full text-white px-6 py-10">
          <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left Side */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm mb-1">Your Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Select Project Budget</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white py-2"
                >
                  <option className="bg-black">Less than $1,000</option>
                  <option className="bg-black">$1,000 - $5,000</option>
                  <option className="bg-black">$5,000 - $10,000</option>
                  <option className="bg-black">$10,000+</option>
                </select>
              </div>
            </div>

            <div className="mt-6 md:col-span-2 flex justify-start">
              <button
                type="submit"
                className="p-1 w-40 h-12 rounded-2xl border border-white text-white
                     hover:scale-110 hover:text-white transition-all duration-300 shadow-md flex justify-center items-center"
              >
                {sendloading ? <HashLoader color="white" size={20}/> : 'Send Message'}
              </button>
            </div>
          </form>

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
    </>
  );
}
