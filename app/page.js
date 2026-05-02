'use client'
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import About from "./components/About";
import Showcase from "./components/showcase";
import ContactPage from "./components/Contact";
import MyMap from "./components/map";
import Footer from "./components/footer";
import { useProjectsContext } from "./context/GlobalContext";
import Minifoam from "./components/minifoam";
import { HashLoader } from "react-spinners";

export default function Home() {
  

  return (
    <>
      
        <div className="main-container">
          <Minifoam/>
          <Navbar />
          <Hero />
          <About />
          <Showcase />
          <ContactPage />
          <MyMap />
          <Footer />
        </div>
      
    </>
  );
}
