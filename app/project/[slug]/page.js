"use client";

import { useParams } from "next/navigation";
import { useProjectsContext } from "@/app/context/GlobalContext";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import MyMap from "@/app/components/map";
import { Contact } from "lucide-react";
import ContactPage from "@/app/components/Contact";

export default function ProjectDetailPage() {
  const params = useParams();
  const { projects } = useProjectsContext();

  const project = projects.projects?.find(p => p._id === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Project not found or loading...</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-20 text-white px-6 md:px-16 lg:px-24 py-16 space-y-20">

      <div className="h-auto w-full flex items-center justify-center">
        <div className="h-auto lg:h-[530px] w-full border border-white rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-center relative p-6 lg:p-12">
          
          <div className="main w-full h-full flex flex-col lg:flex-row justify-center items-center gap-8">
            
            {/* Left Section */}
            <div className="left w-full lg:w-1/2 h-full flex flex-col justify-center items-start text-center lg:text-left">
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-6 text-white">
                {project.name} {/* Dynamic project name */}
              </h1>

              {/* Paragraph */}
              <p className="text-sm sm:text-base md:text-lg font-sans text-white max-w-2xl mb-6 leading-relaxed">
                {project.description || "No description available."} {/* Dynamic description */}
              </p>

              
            </div>

            {/* Right Section */}
            <div className="right w-full lg:w-1/2 h-auto lg:h-full flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={project.thumbnail || "/showcase3.png"} // Dynamic image fallback
                alt={project.name || "App Showcase"}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Project Sections */}
      <div className="space-y-12">
        {project.sections.map((section, idx) => (
  <div
    key={section._id}
    className={`flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-12 rounded-2xl shadow-lg
    ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
  >
    {/* Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="w-72 md:w-80 h-64 md:h-80 overflow-hidden rounded-xl shadow-md flex items-center justify-center bg-slate-700/20">
        <img
          src={section.image}
          alt={section.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>

    {/* Text */}
    <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
      <p className="text-gray-300 font-sans">{section.description}</p>
    </div>
  </div>
))}

      </div>
    <ContactPage/>
    <MyMap/>
    </div>
    <Footer/>
    </>
  );
}
