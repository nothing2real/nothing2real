"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Service = () => {
  const container = useRef(null);

  const List = [
    {
      id: "01",
      title: "Brand Identity",
      description: "Crafting a complete visual identity that defines your brand’s personality and presence.",
      tags: ["Logo", "Typography", "System"],
    },
    {
      id: "02",
      title: "Custom Website",
      description: "High-performance builds with modern frameworks and scalable architecture.",
      tags: ["Next.js", "GSAP", "Tailwind"],
    },
    {
      id: "03",
      title: "UI / UX Design",
      description: "User-centered process transforming ideas into intuitive digital experiences.",
      tags: ["Figma", "Prototyping", "UX"],
    },
    {
      id: "04",
      title: "E-commerce",
      description: "Powerful platforms designed to maximize conversions and performance.",
      tags: ["Stripe", "Shopify", "UX"],
    },
  ];

  useGSAP(() => {
    // Entrance animation
    gsap.from(".service-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "expo.out",
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-[#080808] text-white py-24 px-[5vw] font-[PPNeueMontreal] overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#5227FF]" />
          <span className="text-[#5227FF] uppercase tracking-[0.3em] text-xs font-bold">Capabilities</span>
        </div>
        <h1 className="text-[12vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter">
          Strategic <br /> 
          <span className="italic font-light text-zinc-500">Solutions.</span>
        </h1>
      </div>

      {/* --- KINETIC LIST --- */}
      <div className="flex flex-col border-t border-white/10">
        {List.map((item) => (
          <div 
            key={item.id}
            className="group service-card relative py-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-500 hover:px-8"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-[#5227FF] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[120px] -z-10 pointer-events-none" />

            <div className="flex items-baseline gap-8 z-10">
              <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">{item.id}</span>
              <h2 className="text-4xl md:text-7xl font-medium tracking-tighter group-hover:italic transition-all duration-500">
                {item.title}
              </h2>
            </div>

            {/* Hidden description that slides in on hover */}
            <div className="max-w-xs mt-4 md:mt-0 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
               <p className="text-zinc-400 text-sm leading-relaxed">
                 {item.description}
               </p>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0 z-10">
              <div className="flex gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#5227FF] group-hover:border-[#5227FF] transition-all duration-500 rotate-[-45deg] group-hover:rotate-0">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER MARQUEE --- */}
      <div className="mt-32 opacity-10 select-none pointer-events-none">
        <div className="flex whitespace-nowrap text-[15vw] font-bold uppercase tracking-tighter animate-marquee">
          <span>Design • Development • Strategy •&nbsp;</span>
          <span>Design • Development • Strategy •&nbsp;</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Service;