"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import { LayoutGrid, List, ArrowUpRight, Minus } from "lucide-react";
import { images } from "@/public/assets/assets";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "netha-silks",
    title: "Netha Silks",
    slug: "netha-silks",
    category: "Heritage E-commerce",
    year: "2025",
    image: images.Nethaposter,
    url: "https://netha-silks-co.vercel.app",
    description: "A digital tapestry weaving heritage with modern commerce."
  },
  {
    id: "naveen-sangewar",
    title: "Naveen S.",
    slug: "naveen-sangewar",
    category: "Professional Archive",
    year: "2024",
    image: images.Nethaposter, // Replace with project image
    url: "#",
    description: "Structured minimalism for financial consulting."
  }
];

export default function EnhancedWorkPage() {
  const [view, setView] = useState("grid");
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    // 1. Custom Smooth Cursor Logic
    const cursor = cursorRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("mousemove", e => {    
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    // 2. Entrance Animation
    const tl = gsap.timeline();
    tl.from(".char-reveal", {
      y: 120,
      skewY: 7,
      duration: 1.4,
      stagger: 0.05,
      ease: "power4.out"
    })
    .from(".nav-ui", {
      opacity: 0,
      y: -20,
      duration: 1
    }, "-=1");

    // 3. Image Hover Physics
    const projectItems = gsap.utils.toArray(".project-wrapper");
    projectItems.forEach(item => {
      const img = item.querySelector(".project-img");
      item.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, duration: 1.2, ease: "power2.out" });
        gsap.to(cursor, { scale: 4, backgroundColor: "#000", mixBlendMode: "difference", duration: 0.3 });
        cursor.innerHTML = '<span class="text-[2px] text-white uppercase font-bold">View</span>';
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 1.2, ease: "power2.out" });
        gsap.to(cursor, { scale: 1, backgroundColor: "#000", mixBlendMode: "normal", duration: 0.3 });
        cursor.innerHTML = '';
      });
    });

  }, { scope: mainRef });

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      {/* Custom Cursor Element */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-transform ease-out overflow-hidden hidden md:flex"
      />

      <main ref={mainRef} className="bg-[#F8F8F8] text-[#1A1A1A] selection:bg-black selection:text-white">
        
        {/* Navigation UI */}
        <nav className="nav-ui fixed top-0 w-full flex justify-between items-center p-10 z-[100] mix-blend-difference">
          <div className="text-sm font-bold tracking-tighter uppercase">Studio Archive©</div>
          <div className="flex gap-4 bg-white/50 backdrop-blur-xl border border-black/5 p-1 rounded-full">
            <button onClick={() => setView("grid")} className={`p-2 rounded-full transition-colors ${view === 'grid' ? 'bg-black text-white' : 'hover:bg-black/5'}`}>
              <LayoutGrid size={18} />
            </button>
            <button onClick={() => setView("list")} className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-black text-white' : 'hover:bg-black/5'}`}>
              <List size={18} />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-[90vh] flex flex-col justify-center px-[5vw]">
          <div className="overflow-hidden">
            <h1 className="text-[14vw] md:text-[11vw] font-black leading-[0.8] tracking-tight uppercase flex flex-col">
              <span className="char-reveal">Uncommon</span>
              <span className="char-reveal text-black/10">Solutions</span>
            </h1>
          </div>
          <div className="mt-20 flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="nav-ui max-w-sm">
                <p className="text-lg leading-relaxed opacity-70">
                    Curating high-performance digital aesthetics. Each project is a commitment to technical precision and visual clarity.
                </p>
            </div>
            <div className="nav-ui flex gap-20">
                <div>
                    <span className="block text-[10px] uppercase opacity-40 mb-4">Location</span>
                    <span className="font-medium uppercase">Hybrid / Remote</span>
                </div>
                <div>
                    <span className="block text-[10px] uppercase opacity-40 mb-4">Availability</span>
                    <span className="font-medium uppercase">Q3 — 2026</span>
                </div>
            </div>
          </div>
        </section>

        {/* Project Section */}
        <section className="px-[5vw] pb-40">
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-40">
              {projects.map((project) => (
                <div key={project.id} className="project-wrapper group">
                  <Link href={`/work/${project.slug}`}>
                    <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-white border border-black/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="project-img object-cover transition-transform duration-1000"
                      />
                    </div>
                    <div className="mt-8 flex justify-between items-end">
                      <div className="max-w-[70%]">
                        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">{project.title}</h2>
                        <p className="text-sm opacity-50">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-bold opacity-30 mb-1">{project.category}</span>
                        <span className="font-mono text-sm">'{project.year.slice(-2)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col border-t border-black/10">
              {projects.map((project) => (
                <Link 
                  href={`/work/${project.slug}`} 
                  key={project.id}
                  className="project-wrapper group flex items-center justify-between py-16 border-b border-black/10 hover:px-10 transition-all duration-700 ease-expo"
                >
                  <div className="flex items-baseline gap-10">
                    <span className="font-mono text-xs opacity-20">0{projects.indexOf(project) + 1}</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-20">
                    <span className="hidden lg:block text-xs uppercase font-bold tracking-[0.2em] opacity-30">{project.category}</span>
                    <ArrowUpRight size={40} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Footer Minimalist */}
        <footer className="bg-white py-20 px-[5vw] border-t border-black/5">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-black tracking-tighter uppercase">Ready to Start?</div>
                <a href="mailto:hello@studio.com" className="group flex items-center gap-4 text-xl overflow-hidden">
                    <span className="group-hover:-translate-y-full transition-transform duration-500 block">hello@studio.com</span>
                    <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-500 block text-black/40">Get in touch</span>
                </a>
            </div>
        </footer>

      </main>

      <style jsx global>{`
        .ease-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        body {
          background-color: #F8F8F8;
        }
      `}</style>
    </ReactLenis>
  );
}