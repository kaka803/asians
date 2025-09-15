'use client'
import React from 'react'
import Navbar from '../components/navbar'
import { useRef, useEffect } from 'react'
import ContactPage from '../components/Contact'
import MyMap from '../components/map'
import Footer from '../components/footer'
import { useProjectsContext } from '../context/GlobalContext'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeveloperSwiper from '../components/developers'

const AboutPage = () => {
    const titleref = useRef(null)
     const heroRef = useRef(null);
  const consultRef = useRef(null);
  const workRef = useRef(null);
  const secondConsultRef = useRef(null);
  const servicesRef = useRef(null);
  const otherServicesRef = useRef(null);
  const {open, setOpen} = useProjectsContext()

useEffect(() => {
    // import ScrollTrigger only on client
    
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        const sections = [
          heroRef.current,
          consultRef.current,
          workRef.current,
          secondConsultRef.current,
          servicesRef.current,
          otherServicesRef.current,
        ];

        sections.forEach((section) => {
          if (!section) return;

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          tl.from(section.querySelectorAll("h1, p, img, button"), {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          });
        });
      });

      return () => ctx.revert();
    
  }, []);
  return (
    <div className='main-container'>
      <Navbar/>
      <div>
            <section ref={heroRef} className="about-page w-full relative py-5 max-md:mt-25 px-5">
              {/* <div>
                <Image
                  src="/robot1.svg"
                  width={255}
                  height={255}
                  alt="robot1"
                  className="moving-img  moving-img2 max-[1200px]:hidden max-[440px]:block absolute top-23 z-1000 left-4  max-md:-top-18 max-md:-left-5 max-md:w-[150px]"
                />
              </div> */}
      
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
            <section ref={consultRef} className='w-full flex-col flex justify-center items-center gap-3 mt-30'>
                <h1 className='text-2xl w-[90%] md:text-5xl text-white md:w-[70%] text-center'>Driven by core values, powered by the spirit of Asians Technologies</h1>
                <div>
                     <div className="flex justify-center items-center  flex-wrap mt-5 p-4 gap-5">
      <div className="max-w-md min-h-52 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about1.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Our People, Our Power</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          “At Asians technologies, success isnt just about what we do its
          about who makes it happen. Our passionate, skilled, and dedicated
          team is our true pride, and together we achieve greatness.”
        </p>
      </div>
      <div className="max-w-md min-h-52 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about2.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Powered by Client Trust</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          Our work reflects our clients. We listen, understand, and deliver with purpose. For us, true success is measured by your feedback because your satisfaction is always our top priority.
        </p>
      </div>
      <div className="max-w-md min-h-52 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about3.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Quality is Our Identity</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          We dont just aim to make an impact—we empower people to achieve their goals while ensuring top-notch quality every step of the way.  #NoCompromiseOnQuality
        </p>
      </div>
      <div className="max-w-md min-h-52 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about4.png" alt="" width={'50px'}/>
          <h2 className="text-xl "> Always-On Excellence</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          No matter the time, no matter the need — our dedicated services are always here for you. We dont just meet your requirements, we redefine them. With passion, precision, and a promise of excellence.
        </p>
      </div>
    </div>
                </div>
            </section>
            <section ref={workRef} className='w-full flex-col flex justify-center items-center gap-3 mt-30'>
                <h1 className='text-2xl w-[90%] md:text-5xl text-white md:w-[70%] text-center'>Proudly present across global destinations</h1>
                <p className='text-white font-sans text-lg text-center'>With a strong global presence across India, USA, UK, Canada, Norway, and Australia,<br /> we craft cutting-edge user experiences that drive maximum ROI <br />and create impact worldwide</p>
                <div>
                     <div className="flex justify-center items-center  flex-wrap mt-5 p-4 gap-5">
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
      <div className="max-w-md min-h-22 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/usa.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">USA</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          13th Street. 47 W 13th St, New York, NY 10011, USA
        </p>
      </div>
    </div>
                </div>
            </section>
            <section ref={consultRef} className='w-full flex-col flex justify-center items-center gap-3 mt-30'>
                <h1 className='text-2xl w-[90%] md:text-5xl text-white md:w-[70%] text-center'>What Makes Us Different</h1>
                
                <div>
                     <div className="flex justify-center items-center  flex-wrap mt-5 p-4 gap-5">
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about5.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Customer Delight</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          Exceeding expectations with honest communication and smart, expert-driven solutions.
        </p>
      </div>
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about6.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Smart Engagement Options</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          Flexible ways to work with us tailored to your needs for smooth, impactful results.
        </p>
      </div>
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about7.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Trust Through Clarity</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          We build strong bonds with clients through honest collaboration and transparent actions.
        </p>
      </div>
      
    </div>
    <div className="w-full flex justify-center items-center py-5 relative">
  {/* Left Image */}
  <img
    src="/construction1.png"
    alt=""
    className="hidden sm:block w-28 md:w-40 lg:w-70 absolute left-[5%] md:left-[7%]  shadow-lg shadow-black/40"
  />

  {/* Center Image */}
  <img
    src="/construction2.png"
    alt=""
    className="w-full sm:w-72 md:w-96 lg:w-120 lg:shadow-lg lg:shadow-black/40 px-10"
  />

  {/* Right Image */}
  <img
    src="/construction3.png"
    alt=""
    className="hidden sm:block w-28 md:w-40 lg:w-70 absolute right-[5%] md:right-[7%]  shadow-lg shadow-black/40"
  />
</div>
 <div className="flex justify-center items-center  flex-wrap mt-5 p-4 gap-5">
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about5.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">All-in-One Innovation</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          We bring your ideas to life with complete, end-to-end solutions that cover every angle.
        </p>
      </div>
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about6.png" alt="" width={'50px'}/>
          <h2 className="text-xl "> Always On, Always Here</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          Count on us for nonstop support day or night keeping your success running 24/7.
        </p>
      </div>
      <div className="max-w-80 min-h-46 text-white p-6 rounded-xl shadow-lg white-border">
        {/* Icon + Heading */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/about7.png" alt="" width={'50px'}/>
          <h2 className="text-xl ">Smart Pricing & Fast Delivery</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          Dynamic strategies that boost your market edge with competitive rates and on-time delivery.
        </p>
      </div>
      
    </div>


                </div>
            </section>


            <section ref={servicesRef} className="w-full flex justify-center items-center mt-20 mb-20 py-10 px-4 ">
  <div className="flex flex-col md:flex-row items-center gap-6 white-border rounded-xl shadow-lg p-6 max-w-5xl w-full">
    
    {/* Left Side Image */}
    <div className="w-full md:w-1/3">
      <img
        src="/construction4.png"
        alt="Teamwork"
        className="rounded-lg shadow-md w-full h-full object-cover"
      />
    </div>

    {/* Right Side Content */}
    <div className="w-full md:w-2/3 text-white flex flex-col gap-4">
      <h2 className="text-xl md:text-4xl">
        Build Your Dream <br /> App, The Smart Way
      </h2>
      <p className="text-gray-300 text-sm leading-relaxed font-sans">
        We focus on honesty and a streamlined process to give every business the right solution. 
        Our clients keep coming back because we don’t just meet expectations — 
        we surpass them every time.
      </p>
      <div>
        <button className="px-4 py-2 white-border rounded-md text-xs  shadow-md transition">
          GET IN TOUCH
        </button>
      </div>
    </div>
  </div>
</section>


<DeveloperSwiper/>

          </div>
          <ContactPage/>
          <MyMap/>
          <Footer/>

    </div>
  )
}

export default AboutPage
