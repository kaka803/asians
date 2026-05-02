"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundEffects() {
  const followerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Mouse Follower
    const moveFollower = (e) => {
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveFollower);

    // Canvas Plexus Effect
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 40;
    const connectionDistance = 150;
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.3)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", moveFollower);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
      {/* Grain Overlay for Premium Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

      {/* Mouse Follower Glow */}
      <div
        ref={followerRef}
        className="hidden lg:block absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[120px] mix-blend-screen"
      ></div>

      {/* Plexus Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Shooting Stars */}
      <div className="shooting-star"></div>
      <div className="shooting-star delay-2000"></div>
      <div className="shooting-star delay-5000"></div>
      
      <style jsx>{`
        .shooting-star {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 2px;
          background: linear-gradient(-45deg, rgba(34, 211, 238, 1), rgba(0, 0, 255, 0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 1));
          animation: tail 5s ease-in-out infinite, shooting 5s ease-in-out infinite;
          opacity: 0;
        }

        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }

        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
          100% { transform: translateX(-1000px) translateY(1000px) rotate(45deg); opacity: 0; }
        }

        .delay-2000 { animation-delay: 2s; }
        .delay-5000 { animation-delay: 5s; }
      `}</style>
    </div>
  );
}
