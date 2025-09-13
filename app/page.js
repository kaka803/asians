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
  const { projectloading, loading } = useProjectsContext();

  return (
    <>
      {projectloading ? (
        // Loader
        <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-xl">
          <HashLoader color="white"/>
        </div>
      ) : (
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
      )}
    </>
  );
}
