"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ id, title, services, className }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Spotlight effect on mouse move
  const handleMouseMove = (e) => {
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    gsap.to(glowRef.current, {
      opacity: 1,
      x: x,
      y: y,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-[#0D0D0D] border border-white/5 p-8 md:p-12 flex flex-col justify-between min-h-[400px] transition-all duration-500 overflow-hidden ${className}`}
    >
      {/* 1. INTERACTIVE GLOW LAYER */}
      <div 
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(255, 77, 0, 0.06), transparent 40%)`,
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          left: 0,
          top: 0,
        }}
      />

      {/* 2. TOP METADATA */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-[#FF4D00] tracking-[0.3em] uppercase">
                Module_{id}
            </span>
            <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
                Deployment_Ready
            </span>
        </div>
        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all duration-500 group-hover:rotate-45">
          <ArrowUpRight size={20} className="group-hover:text-white text-white/40 transition-colors" />
        </div>
      </div>

      {/* 3. MAIN TITLE */}
      <div className="relative z-10 mt-16">
        <h3 className="text-[9vw] md:text-[3vw] font-bold font-[dbsharp] uppercase leading-[0.85] tracking-tighter transition-transform duration-500 group-hover:-translate-y-2">
          {title}
        </h3>
      </div>

      {/* 4. SERVICE TAGS */}
      <div className="relative z-10 mt-12 flex flex-wrap gap-2">
        {services.map((s, i) => (
          <span key={i} className="font-mono text-[9px] uppercase text-white/30 tracking-widest border border-white/5 px-3 py-1.5 rounded-full group-hover:border-[#FF4D00]/30 group-hover:text-white/60 transition-colors duration-500">
            {s}
          </span>
        ))}
      </div>

      {/* 5. BACKGROUND DEPTH NUMBER */}
      <span className="absolute -bottom-6 -right-4 text-[18vw] font-bold opacity-[0.015] font-[dbsharp] pointer-events-none group-hover:opacity-[0.04] group-hover:scale-110 transition-all duration-700">
        {id}
      </span>
    </div>
  );
};

const ServicesGrid = () => {
  const containerRef = useRef(null);

  const data = [
    {
      id: "01",
      title: "Visual Strategy",
      services: ["Identity", "Typography", "Systems"],
      className: "md:col-span-8" // Extra Wide
    },
    {
      id: "02",
      title: "Motion",
      services: ["GSAP", "Three.js"],
      className: "md:col-span-4"
    },
    {
      id: "03",
      title: "Architectural Dev",
      services: ["Next.js", "Performance", "Scalability"],
      className: "md:col-span-4"
    },
    {
      id: "04",
      title: "Commerce Engine",
      services: ["Payments", "Inventory", "UI"],
      className: "md:col-span-8" // Extra Wide
    }
  ];

  useGSAP(() => {
    gsap.from(".group", {
      y: 60,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section className="bg-[#0A0A0A] py-[10vw] px-[5vw] md:px-[2vw]">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.5em]">Capabilities // 02</span>
            </div>
            <h2 className="text-[12vw] md:text-[6vw] font-bold font-[dbsharp] uppercase leading-none tracking-tighter">
                Our <span className="italic font-light text-white/20">Studio</span> <br /> 
                <span className="text-[#FF4D00]">Ecosystem</span>
            </h2>
        </div>
        <div className="max-w-[300px] border-l border-white/10 pl-6">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                We engineer digital artifacts that balance high-end aesthetics with industrial-grade performance.
            </p>
        </div>
      </div>

      {/* ASYMMETRIC GRID */}
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-2"
      >
        {data.map((item) => (
          <ServiceCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;