"use client";

import React, { useRef } from "react";
import Footer from "../Components/Footer";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/public/assets/assets";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const mainref = useRef(null);

  useGSAP(() => {
    // 1. Premium Entrance Animation for Hero
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

    heroTl
      .from(".hero-bg", {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      })
      .from(".textH", {
        y: 120,
        opacity: 0,
        duration: 1.8,
        stagger: 0.15,
        delay: 0.3,
      }, "-=1.5")
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.2")
      .from(".hero-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.out",
        transformOrigin: "left"
      }, "-=1");

    // 2. Advanced Project Cards Animation with Stagger & Parallax
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card, index) => {
      const img = card.querySelector(".project-img");
      const content = card.querySelector(".project-content");
      const overlay = card.querySelector(".project-overlay");

      // Enhanced Image Parallax with depth
      gsap.to(img, {
        yPercent: 25,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Content Reveal with Magnetic Effect
      gsap.from(content, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover Overlay Animation
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(content.querySelectorAll([".project-title, .project-desc, .project-meta"]), {
          y: -10,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.2");

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // 3. Premium Scroll Indicators
    gsap.to(".scroll-indicator", {
      y: 20,
      opacity: 0.3,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2
    });

    // 4. Background Elements Animation
    gsap.to(".bg-shape", {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    gsap.to(".floating-element", {
      y: -30,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

  }, { scope: mainref });

  const projects = [
    {
      title: "Netha Silks",
      description: "E-commerce & brand experience for a heritage textile house.",
      year: "2025",
      category: "E-commerce / Branding",
      image: images.Nethaposter,
      link: "https://nethasilksandco.com/",
      size: "col-span-12 md:col-span-7", // Larger focus
    },
    {
      title: "Naveen Sangewar",
      description: "Minimal portfolio for a Chartered Accountant.",
      year: "2025",
      category: "Finance Portfolio",
      image: images.studioipad, // Fallback image if needed
      link: "https://naveensangewarca.vercel.app/",
      size: "col-span-7 col-start-5 md:col-start-8 md:col-span-5 mt-[10vw]", // Offset and smaller
    },
    {
      title: "Bharath Reddy Mulli",
      description: "Minimal portfolio for a Social Media Influencer.",
      year: "2026",
      category: "Creator Space",
      image: images.bharath,
      link: "https://bharath-reddy.vercel.app",
      size: "col-span-12 md:col-span-5 md:ml-[10%]", // Pushed to the right
    },
    {
      title: "Netha Silks",
      description: "E-commerce & brand experience for a heritage textile house.",
      year: "2025",
      category: "E-commerce / Branding",
      image: images.Nethaposter,
      link: "https://nethasilksandco.com/",
      size: "col-span-10 md:col-span-7", // Larger focus
    },
  ];

  return (
    <ReactLenis root>
      <main ref={mainref} className="bg-white mix-blend-difference text-white">

        {/* ================= HERO ================= */}
        <section className="h-[80vh] flex flex-col justify-center px-[5vw] border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-[20%] right-[-5%] text-[20vw] font-black opacity-[0.02] pointer-events-none uppercase italic">
            Archive
          </div>

          <div className="relative z-10">
            <span className="textH block font-mono text-xs uppercase tracking-[0.5em] text-black mb-4">
              Case Studies / 2025 — 2026
            </span>
            <h1 className="textH font-bold leading-[0.9] text-[15vw] md:text-[10vw] text-black uppercase tracking-tighter">
              Selected <br /> <span className="italic font-serif text-black lowercase">Portfolios.</span>
            </h1>
            <p className="textH max-w-[450px] mt-10 text-lg md:text-xl text-black leading-relaxed">
              Merging technical precision with aesthetic intuition to build digital identities that last.
            </p>
          </div>
        </section>

        {/* ================= PROJECTS GRID ================= */}
        {/* ================= PROJECTS GRID ================= */}
        <section className="px-[5vw] py-[10vw]">
          <div className="grid grid-cols-12 gap-y-[5vw] md:gap-x-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${project.size} project-card group cursor-pointer`}
                onClick={() => window.open(project.link, '_blank')}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/13] overflow-hidden rounded-[1vw] bg-zinc-900">
                  <div className="project-img absolute inset-0 w-full h-[140%] top-[-20%]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  </div>
                  {/* --- ADDED project-overlay CLASS --- */}
                  <div className="project-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black">
                      <ArrowUpRight size={32} />
                    </div>
                  </div>
                </div>

                {/* --- ADDED project-content CLASS --- */}
                <div className="project-content mt-8 flex flex-col md:flex-row justify-between text-black items-start gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-30">{String(index + 1).padStart(2, "0")}</span>
                      {/* --- ADDED project-title CLASS --- */}
                      <h2 className="project-title text-3xl md:text-4xl font-semibold tracking-tighter">
                        {project.title}
                      </h2>
                    </div>
                    {/* --- ADDED project-desc CLASS --- */}
                    <p className="project-desc max-w-[400px] text-sm md:text-base font-medium leading-tight">
                      {project.description}
                    </p>
                  </div>

                  {/* --- ADDED project-meta CLASS --- */}
                  <div className="project-meta flex flex-col items-end gap-2 text-right">
                    <span className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest bg-white/5">
                      {project.category}
                    </span>
                    <span className="font-bold text-xl opacity-80">{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="px-[5vw] py-[20vw] text-black border-t border-white/5 text-center">
          <h2 className="text-[10vw] font-bold uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default">
            Next Vision?
          </h2>
          <button className="mt-10 group relative inline-flex items-center gap-4 text-2xl uppercase font-bold tracking-widest overflow-hidden">
            <span className="relative z-10">Start a Project</span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight />
            </div>
          </button>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
};

export default Page;