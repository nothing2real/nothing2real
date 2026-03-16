"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Zap, Layers, Globe, Smartphone, ShieldCheck } from "lucide-react";
import Accordion from "./Accordion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand Strategy & Identity",
    description: "We don't just design logos; we architect visual legacies. We define the sonic and visual frequency of your brand to ensure it resonates in a crowded market.",
    tags: ["Logo Design", "Visual Language", "Brand Voice"],
    icon: <Layers size={32} strokeWidth={1} />,
    color: "#f3f3f3"
  },
  {
    id: "02",
    title: "Cinematic Web Engineering",
    description: "Using Next.js and high-end GSAP orchestration, we build digital environments that feel fluid, responsive, and inevitably premium.",
    tags: ["Next.js", "GSAP Animations", "WebGL"],
    icon: <Zap size={32} strokeWidth={1} />,
    color: "#ffffff"
  },
  {
    id: "03",
    title: "E-Commerce Ecosystems",
    description: "Transforming transactions into experiences. We build high-conversion storefronts that maintain aesthetic integrity while driving massive ROI.",
    tags: ["Shopify", "Custom Checkout", "Inventory UX"],
    icon: <Globe size={32} strokeWidth={1} />,
    color: "#f9f9f9"
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const leftContentRef = useRef(null);

  useGSAP(() => {
    // Pin the left side heading while the right side scrolls
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftContentRef.current,
      pinSpacing: false,
    });

    // Animate service cards on entry
    gsap.utils.toArray(".service-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        rotateX: -10,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-white text-black min-h-screen">
      <div ref={triggerRef} className="flex flex-col md:flex-row px-[5vw] md:px-[2vw]">
        
        {/* LEFT SIDE: PINNED CONTENT */}
        <div ref={leftContentRef} className="w-full md:w-1/3 h-fit md:h-screen flex flex-col justify-start pt-[10vw]">
          <span className="font-mono text-[12px] uppercase tracking-widest text-black/40 mb-4">02 / Expertise</span>
          <h2 className="text-[12vw] md:text-[5vw] font-bold leading-[0.9] tracking-tighter uppercase font-[PPNeueMontreal]">
            Services <br /> <span className="italic font-serif opacity-30">Provided</span>
          </h2>
          <p className="mt-8 text-[4vw] md:text-[1.2vw] text-black/60 max-w-[250px] leading-tight">
            We provide technical gravity to your creative vision. 
          </p>
          <div className="hidden md:block mt-12 w-20 h-20 border border-black/10 rounded-full flex items-center justify-center animate-spin-slow">
             <ArrowUpRight className="rotate-45" />
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLING DETAILS */}
        <div className="w-full md:w-2/3 flex flex-col gap-[10vh] py-[10vw]">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="service-card group relative p-8 md:p-16 rounded-[2rem] border border-black/5 hover:border-black/20 transition-colors duration-500"
              style={{ backgroundColor: service.color }}
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[1.5vw] opacity-20">{service.id}</span>
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-[8vw] md:text-[3.5vw] font-bold tracking-tighter mb-6 leading-none">
                {service.title}
              </h3>
              
              <p className="text-[4.5vw] md:text-[1.5vw] leading-tight text-black/70 mb-10 max-w-xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {service.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-black/10 font-mono text-[10px] uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {/* Detailed Accordion for Technical Cleanup */}
          <div className="mt-20">
            <h4 className="font-mono uppercase text-[12px] mb-10 opacity-40 text-center italic">Deep Dive Into Technicals</h4>
            <Accordion />
          </div>
        </div>
      </div>
    </section>
  );
}