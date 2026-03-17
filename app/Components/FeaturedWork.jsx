'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { images } from "@/public/assets/assets";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const container = useRef(null);

  const projects = [
    {
      title: "Netha Silks",
      category: "Heritage E-commerce",
      year: "2025",
      image: images.Nethaposter,
      color: "#1a1a1a"
    },
    {
      title: "Naveen Sangewar",
      category: "Finance Architecture",
      year: "2025",
      image: images.studioipad,
      color: "#0d0d0d"
    },
    {
      title: "NothingReal",
      category: "Motion Design",
      year: "2026",
      image: images.bharath, 
      color: "#000000"
    }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card, i) => {
      // 1. Pinning Logic
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: "bottom top",
        id: `pin-${i}`,
      });

      // 2. The "Recede" Effect
      // When the NEXT card starts coming in, we scale and fade the current one
      if (i < cards.length - 1) {
        gsap.to(card.querySelector('.card-inner'), {
          scale: 0.9,
          opacity: 0.3,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-black">
      {/* Header for the section */}
      <div className="px-[5vw] py-[10vh]">
        <h2 className="text-[12vw] font-black uppercase tracking-tighter text-white leading-none">
          Selected <br /> <span className="italic font-serif opacity-20">Works</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="project-card h-screen w-full flex items-center justify-center px-[5vw]"
          >
            <div 
              className="card-inner relative w-full h-[80vh] rounded-[2vw] overflow-hidden group shadow-2xl border border-white/10"
              style={{ backgroundColor: project.color }}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
              </div>

              {/* Text Content Overlay */}
              <div className="absolute inset-0 p-[4vw] flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Project 0{index + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase text-white w-fit backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 pointer-events-auto cursor-pointer">
                    <ArrowUpRight size={32} />
                  </div>
                </div>

                <div className="flex flex-col">
                    <h3 className="text-[8vw] md:text-[6vw] font-bold uppercase tracking-tighter leading-none text-white">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-end mt-4">
                        <p className="font-mono text-xs text-white/40 italic">{project.year} Edition</p>
                        <button className="text-white border-b border-white/30 pb-1 text-xs uppercase tracking-widest hover:border-white transition-all pointer-events-auto">
                            View Case Study
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* spacer to ensure the last card can be seen before the next section */}
      <div className="h-[30vh]" />
    </section>
  );
};

export default FeaturedWork;