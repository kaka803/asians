"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/service" },
    { name: "Timeline", href: "/timeline" },
    { name: "About Us", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
    ${scrolled 
      ? "lg:backdrop-blur-lg lg:bg-white/10 lg:shadow-lg bg-transparent" 
      : "bg-transparent"}
  `}
>
  <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? "backdrop-blur-2xl bg-black/30 shadow-lg"
          : "bg-transparent"}
      `}
    >
      <div className="main-container  flex justify-between items-center gap-5 py-2 px-6">
        {/* Logo */}
        <div className="logo">
          <Image src="/logo.svg" width={65} height={65} alt="logo" />
        </div>

        {/* Navlinks - Desktop */}
        <div className="navlinks hidden lg:block">
          <ul className="flex justify-center items-center gap-15 text-white text-xl font-medium">
  {links.map((link) => (
    <li
      key={link.href}
      className={`link nav-link transition-transform duration-300 cursor-pointer 
        ${pathname === link.href ? "bottom-border" : ""}`}
    >
      <Link href={link.href}>
        {link.name}
      </Link>
    </li>
  ))}
</ul>
        </div>

        {/* Buttons - Desktop */}
        <div className="navbtn hidden lg:flex items-center justify-center gap-3 text-white text-lg">
          <a
  href="mailto:www.asianstechnologies.com"
  className="button-nav flex justify-center items-center gap-2 border border-white/80 rounded-lg px-3 py-1 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
>
  <Image src="/mail.svg" width={20} height={20} alt="mail" />
  Email Us
</a>

<a
  href="https://wa.me/923059990279"
  target="_blank"
  rel="noopener noreferrer"
  className="button-nav flex justify-center items-center gap-2 border border-white/80 rounded-lg px-3 py-1 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
>
  Contact Us
  <Image src="/arrow.svg" width={12} height={12} alt="arrow" />
</a>

        </div>

        {/* Hamburger Button - Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-3xl focus:outline-none"
        >
          {"☰"}
        </button>
      </div>
</div>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden z-100  fixed top-0 h-full w-3/4 sm:w-1/2  bg-white/10 backdrop-blur-xl rounded-l-2xl shadow-2xl p-8 transform transition-all duration-500 ease-in-out
    ${open ? "right-0 opacity-100" : "-right-100 opacity-0"}
  `}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-white text-3xl hover:rotate-90 transition-transform duration-300"
        >
          ✖
        </button>

        {/* Navlinks */}
        <ul className="flex flex-col gap-8 mt-16 text-white text-lg tracking-wide  ">
          {links.map((link) => (
    <li
      key={link.href}
      className={`link  transition-transform duration-300 cursor-pointer 
       `}
    >
      <Link href={link.href}>
        {link.name}
      </Link>
    </li>
  ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">
          <a
  href="www.asianstechnologies.com"
  className="flex justify-center items-center gap-2 border border-white/80 rounded-lg px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
>
  <Image src="/mail.svg" width={20} height={20} alt="mail" />
  Email Us
</a>

<a
  href="https://wa.me/923059990279" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex group justify-center items-center gap-2 border border-white/80 rounded-lg px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
>
  Contact Us
  <Image src="/arrow.svg" width={12} height={12} alt="arrow" />
</a>

        </div>
      </div>
    </div>
  );
}
