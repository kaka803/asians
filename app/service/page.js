'use client'
import React, { useState, useRef, useLayoutEffect } from 'react'
import Navbar from '../components/navbar'
import Image from 'next/image'
import { gsap } from "gsap"
import { useEffect } from 'react'
import Footer from '../components/footer'
import MyMap from '../components/map'
import ContactPage from '../components/Contact'
import { useRouter } from 'next/navigation'
import ServicePart from '../components/servicepart'
import Link from 'next/link'
import { useProjectsContext } from '../context/GlobalContext'
import { HashLoader } from 'react-spinners'

const Page = () => {
  const {loading} = useProjectsContext()
  const [activeSection, setActiveSection] = useState('microsoft')
  const containerRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const robotRef = useRef(null) // robot image ke liye ref
 // Jab section mount hoga to fade in animation

 const router = useRouter()
useLayoutEffect(() => {
  if (!containerRef.current) return;

  const ctx = gsap.context(() => {
    const elems = containerRef.current.querySelectorAll(".animate-section");

    gsap.from(elems, {
      opacity: 0,
      y: 30, // halka sa neeche se upar aane ka effect
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, containerRef);

  return () => ctx.revert();
}, [activeSection]);



  const handleChangeSection = (section) => {
    if (section === activeSection) return

    const elems = containerRef.current.querySelectorAll(".animate-section")

    // Pehle fade out karo
     gsap.to(elems, {
      opacity: 0,
      y: -40,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: () => {
        setActiveSection(section) // Exit ke baad naya section load hoga
      }
    })
  }

useEffect(() => {
  if (!robotRef.current) return;


  

  if (activeSection === "frontend") {
    gsap.to(robotRef.current, {
      top: "240px",       // neeche
      x: '-50%',       // left shift for center align
      duration: 1,
      scale:1, 
      ease: "power3.out",
    });
  } else if (activeSection === "microsoft") {
    gsap.to(robotRef.current, {
      top: "0px",       // original top
      x: "0%",            // original position
      duration: 1,
      scale:1, 
      ease: "power3.inOut",
    });
  } else if (activeSection === "business") {
    gsap.to(robotRef.current, {
      top: "240px",       // original top
      x: "-250%",
      scale:1.3,            // original position
      duration: 1,
      ease: "power3.inOut",
    });
  } else if (activeSection === "mobile") {
    gsap.to(robotRef.current, {
      top: "-70px",       // original top
      x: "-200%",
      scale:0.8,            // original position
      duration: 1,
      ease: "power3.inOut",
    });
  } else if (activeSection === "software") {
    gsap.to(robotRef.current, {
      top: "0px",       // original top
      x: "0%",
      scale:1,            // original position
      duration: 1,
      ease: "power3.inOut",
    });
  } else if (activeSection === "backend") {
    gsap.to(robotRef.current, {
      top: "240px",       // neeche
      x: "-50%",          // left shift for center align
      duration: 1,
      scale:1, 
      ease: "power3.out",
    });
  } else if (activeSection === "uiux") {
    gsap.to(robotRef.current, {
      top: "240px",       // neeche
      x: "-230%",          // left shift for center align
      duration: 1,
      scale:1, 
      ease: "power3.out",
    });
    
  }
  else if (activeSection === "video") {
    gsap.to(robotRef.current, {
      top: "230px",       // neeche
      x: "20%",          // left shift for center align
      duration: 1,
      scale:1, 
      ease: "power3.out",
    });
    
  }
  else if (activeSection === "marketing") {
    gsap.to(robotRef.current, {
      top: "240px",       // neeche
      x: "-50%",          // left shift for center align
      duration: 1,
      scale:1, 
      ease: "power3.out",
    });
    
  }
  else if (activeSection === "ai") {
    gsap.to(robotRef.current, {
      top: "0px",       // original top
      x: "0%",
      scale:1,            // original position
      duration: 1,
      ease: "power3.inOut",
    });
  }
}, [activeSection]);





  
  

  return (
    <>
    {loading ? (
        // Loader
        <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-xl">
          <HashLoader color="white"/>
        </div>
      ) : (<div>
      <Navbar />

      <div className="main-container min-h-[500px]  w-full flex flex-col lg:flex-row pt-30">
        
  {/* Sidebar */}
  <div className="sidebar w-full lg:min-w-[300px] lg:min-h-[500px] lg:w-auto">
    <ul className="text-white text-lg lg:text-2xl flex lg:flex-col flex-wrap lg:items-start items-center gap-y-2 gap-x-0 lg:gap-5 justify-center">
  <li
    onClick={() => handleChangeSection("microsoft")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 rounded-2xl hover:translate-x-2
    ${activeSection === "microsoft" ? "border-1 border-white px-3 py-1 lg:px-4 lg:py-1 " : ""}`}
  >
    Microsoft
  </li>
  <li
    onClick={() => handleChangeSection("frontend")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "frontend" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Frontend
  </li>
  <li
    onClick={() => handleChangeSection("business")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "business" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Business Applications
  </li>
  <li
    onClick={() => handleChangeSection("mobile")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "mobile" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Mobile Apps
  </li>
  <li
    onClick={() => handleChangeSection("software")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "software" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Software Engineering
  </li>
  <li
    onClick={() => handleChangeSection("backend")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "backend" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Backend
  </li>
  <li
    onClick={() => handleChangeSection("uiux")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "uiux" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    UI UX Design
  </li>
  <li
    onClick={() => handleChangeSection("video")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "video" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Video Editing
  </li>
  <li
    onClick={() => handleChangeSection("marketing")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "marketing" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Marketing
  </li>
  <li
    onClick={() => handleChangeSection("ai")}
    className={`cursor-pointer transition-all duration-300 px-3 lg:px-4 hover:translate-x-2
    ${activeSection === "ai" ? "white-border px-3 py-1 lg:px-4 lg:py-1 rounded-2xl" : ""}`}
  >
    Artifical Intelligence
  </li>
</ul>

  </div>

  {/* Main Content */}
  <div className="main flex-1 mt-6 lg:mt-0 relative " ref={containerRef} >
    <Image
        ref={robotRef}
            src="/robot1.svg"
            width={255}
            height={255}
            alt="robot1"
            className={`absolute right-25 top-0 hidden lg:block z-100 `}
          />

          

    {activeSection === 'microsoft' && (
      <div className="main flex flex-col lg:flex-row justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start max-lg:justify-center max-lg:items-center items-start gap-5 h-auto lg:h-[400px] relative">
          <h1 className='text-4xl lg:text-8xl text-white'>Microsoft</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            We provide end-to-end Microsoft Consulting Services to help businesses build smarter solutions. From Power Apps, Power Automate, and Power BI to Azure, SharePoint, Power Virtual Agents, and Power Pages — we streamline processes, boost productivity, and deliver scalable, cloud-driven results with Microsoft’s powerful ecosystem.
          </p>
          <Link href="service/microsoft">
          <button className='white-border transform hover:scale-110 transition-all duration-300  text-white mt-4 lg:mt-0 lg:absolute bottom-0 right-15 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/microsoft2.png"
            width={275}
            height={275}
            alt="microsoft"
            className='absolute right-20 top-65 hidden lg:block'
          />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/microsoft2.png"
              width={220}
              height={220}
              alt="microsoft"
            />
          </div>
        </div>
      </div>
    )}

    {activeSection === 'frontend' && (
      <div className="main flex flex-col lg:flex-row-reverse justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start items-start gap-5 h-auto lg:h-[400px] relative max-lg:justify-center max-lg:items-center ">
          <h1 className='text-4xl lg:text-8xl text-white'>Frontend</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            As a Microsoft Solutions Partner, we craft modern, responsive web apps using top frontend technologies like Angular, React.js, Vue.js, and the MEAN Stack. Our solutions are fast, scalable, and built to deliver an exceptional user experience across all platforms.
          </p>
          <Link href="service/frontend">
          <button onClick={() => router.push('/service/frontend')} className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 text-lg lg:text-xl lg:absolute -bottom-20 -left-20 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/v.png"
            width={295}
            height={295}
            alt="frontend"
            className='absolute left-10 top-40 hidden lg:block'
            />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/v.png"
              width={220}
              height={220}
              alt="frontend"
              />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'business' && (
      <div className="flex justify-center animate-section   items-center flex-col ">
      <div className="main flex flex-col lg:flex-row justify-center items-start min-h-[150px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start items-start gap-5 h-auto lg:h-[300px] relative max-lg:justify-center max-lg:items-center ">
          <h1 className='text-4xl lg:text-6xl text-white'>Business Applications</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            Microsoft offers integrated tools like Dynamics 365, Business Central, NAV, and CRM to streamline operations, sales, service, and project management. These cloud-based solutions deliver real-time insights, automation, and scalability empowering businesses to improve efficiency, customer experience, and growth in a connected, digital environment.
          </p>
          
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service.png"
            width={295}
            height={295}
            alt="frontend"
            className='hidden lg:block'
          />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/service.png"
              width={220}
              height={220}
              alt="frontend"
            />
          </div>
        </div>
      </div>
      <Link href="service/business">
      <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 text-lg lg:text-xl  px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
          </div>
    )}
    {activeSection === 'mobile' && (
      <div className="main flex flex-col lg:flex-row-reverse justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start items-start gap-5 h-auto lg:h-[400px] relative max-lg:justify-center max-lg:items-center ">
          <h1 className='text-4xl lg:text-8xl text-white'>Mobile Apps</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            As a Microsoft-aligned development company, we craft innovative mobile solutions using Flutter, iOS, Android, React Native, and hybrid technologies. From IoT apps to cross-platform systems, we build powerful, scalable apps tailored to your business goals  backed by enterprise-grade performance and modern UI/UX standards.
          </p>
          <Link href="service/mobile">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 text-lg lg:text-xl lg:absolute -bottom-20 -left-20 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service2.png"
            width={295}
            height={295}
            alt="frontend"
            className='absolute left-10 top-40 hidden lg:block'
            />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/service2.png"
              width={220}
              height={220}
              alt="frontend"
              />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'software' && (
      <div className="main flex flex-col lg:flex-row justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start max-lg:justify-center max-lg:items-center items-start gap-5 h-auto lg:h-[400px] relative">
          <h1 className='text-4xl lg:text-6xl text-white'>
            Softwarer Engineering
          </h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            We offer end-to-end software engineering services, from consulting to custom development and enterprise solutions. Our team specializes in software outsourcing, tailored product development, and scalable enterprise applications. Whether you need full-cycle software development or expert guidance, we deliver innovative, reliable, and high-performing solutions built to match your business goals.
          </p>
          <Link href="service/software">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 lg:absolute bottom-0 right-15 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service3.png"
            width={275}
            height={275}
            alt="microsoft"
            className='absolute right-20 top-65 hidden lg:block rounded-xl'
          />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center ">
            <Image
              src="/service3.png"
              width={220}
              height={220}
              alt="microsoft"
              className='rounded-xl'
            />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'backend' && (
      <div className="main flex flex-col lg:flex-row-reverse justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start items-start gap-5 h-auto lg:h-[400px] relative max-lg:justify-center max-lg:items-center ">
          <h1 className='text-4xl lg:text-8xl text-white'>Backend</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            We specialize in robust backend development using powerful technologies like Node.js, Laravel, PHP, and Python. Our solutions ensure speed, scalability, and security, empowering your applications to perform seamlessly. From APIs to complex logic, we build reliable systems tailored to your business goals and user needs.
          </p>
          <Link href="service/backend">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 text-lg lg:text-xl lg:absolute -bottom-20 -left-20 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service4.png"
            width={295}
            height={295}
            alt="frontend"
            className='absolute left-10 top-40 hidden lg:block'
            />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/service4.png"
              width={220}
              height={220}
              alt="frontend"
              />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'uiux' && (
      <div className="main flex flex-col lg:flex-row justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start max-lg:justify-center max-lg:items-center items-start gap-5 h-auto lg:h-[400px] relative">
          <h1 className='text-4xl lg:text-7xl text-white'>UI UX Design</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
            We craft intuitive UI/UX designs, stunning websites, impactful logos, and engaging mobile app interfaces. Our design team also specializes in graphic design and social media branding delivering visually compelling, user-friendly experiences that elevate your brand across every digital touchpoint.
          </p>
          <Link href="service/uiux">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 lg:absolute bottom-0 right-15 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service5.png"
            width={275}
            height={275}
            alt="microsoft"
            className='absolute right-20 top-65 hidden lg:block'
          />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/service5.png"
              width={220}
              height={220}
              alt="microsoft"
            />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'video' && (
      <div className="flex justify-center animate-section items-center flex-col">
  <div className="main flex flex-col justify-center items-center min-h-[150px] gap-5 w-full">
    
    {/* Text Section */}
    <div className="left animate-section w-full flex flex-col gap-5 h-auto relative justify-center items-center">
      <h1 className="text-4xl lg:text-6xl text-white text-center">Video Editing</h1>
      <p className="text-base lg:text-lg text-white font-sans text-center max-w-2xl">
        We offer professional video editing services including basic cuts, audio enhancement, visual effects, and format optimization. From simple edits to advanced custom projects, our team refines every frame with precision adding graphics, visual effects, and dynamic enhancements to deliver polished, platform-ready content that captures attention and elevates your brand.
      </p>
    </div>

    {/* Image Section */}
    <div className="right animate-section w-full flex justify-center mt-4">
      <Image
        src="/service.png"
        width={295}
        height={295}
        alt="frontend"
        className="block"
      />
    </div>
  </div>

  {/* Button */}
  <Link href="service/video">
  <button className="white-border transform hover:scale-110 transition-all duration-300 text-white mt-6 text-lg lg:text-xl px-6 lg:px-8 py-2 rounded-sm">
    DETAILS
  </button>
  </Link>
</div>

    )}
    {activeSection === 'marketing' && (
      <div className="main flex flex-col lg:flex-row-reverse justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start items-start gap-5 h-auto lg:h-[400px] relative max-lg:justify-start max-lg:items-start ">
          <h1 className='text-4xl lg:text-8xl text-white'>Marketing</h1>
          <p className='text-base lg:text-lg text-white font-sans max-lg:text-start'>
           We are a full-service Digital Marketing Agency specializing in local, legal, B2B, e-commerce, SaaS, video, and service-based SEO. Our expertise spans on-page, off-page, and technical SEO, including international and multi-location strategies ensuring your brand ranks higher, reaches the right audience, and grows across all digital touchpoints.
          </p>
          <Link href="/service/marketing">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 text-lg lg:text-xl lg:absolute -bottom-20 -left-20 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section  lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/service7.png"
            width={295}
            height={295}
            alt="frontend"
            className='absolute left-10 top-40 hidden lg:block'
            />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/service7.png"
              width={220}
              height={220}
              alt="frontend"
              />
          </div>
        </div>
      </div>
    )}
    {activeSection === 'ai' && (
      <div className="main flex flex-col lg:flex-row justify-center items-start min-h-[500px] gap-5">
        <div className="left animate-section w-full lg:w-[60%] flex flex-col justify-start max-lg:justify-center max-lg:items-center items-start gap-5 h-auto lg:h-[400px] relative">
          <h1 className='text-4xl lg:text-6xl text-white'>
  Artificial Intelligence
</h1>
<p className='text-base lg:text-lg text-white font-sans max-lg:text-center'>
  We provide comprehensive artificial intelligence solutions, from strategy and consulting to custom AI model development and enterprise-grade implementations. Our expertise covers machine learning, natural language processing, computer vision, and predictive analytics. Whether you require intelligent automation, data-driven decision support, or scalable AI-powered products, we deliver cutting-edge, reliable, and transformative solutions tailored to accelerate your business growth.
</p>

          <Link href="service/ai">
          <button className='white-border transform hover:scale-110 transition-all duration-300 text-white mt-4 lg:mt-0 lg:absolute bottom-0 right-15 px-6 lg:px-8 py-2 rounded-sm'>
            DETAILS
          </button>
          </Link>
        </div>
        <div className="right animate-section w-full lg:w-[40%] relative mt-6 lg:mt-0">
          
          <Image
            src="/ai.png"
            width={355}
            height={355}
            alt="microsoft"
            className='absolute right-20 top-65 hidden lg:block rounded-xl'
          />
          {/* Mobile view me center aligned image */}
          <div className="lg:hidden flex justify-center ">
            <Image
              src="/ai.png"
              width={350}
              height={350}
              alt="microsoft"
              className='rounded-xl'
            />
          </div>
        </div>
      </div>
    )}
    
  </div>
</div>
<div className='main-container'>
<ServicePart/>
<div className='lg:mt-20'>
<Footer/>
</div>
</div>
    </div>)
    }
    </>
  )
}

export default Page
