"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react"; // Optional: npm i lucide-react

const Service = () => {


  const List = [
    {
      id: "01",
      title: "Brand Identity",
      description:
        "Crafting a complete visual identity that defines your brand’s personality, voice, and presence across all platforms.",
      services: [
        "Brand Logo",
        "Colors Patterns",
        "Brand Typography",
        "Poster Designs",
        "Banner Designs",
      ],
    },
    {
      id: "02",
      title: "Custom Website",
      description:
        "High-performance custom websites built with modern frameworks, advanced animations, and clean, scalable architecture.",
      services: [
        "Custom Layouts & Component Library",
        "GSAP / Framer Animations",
        "Next.js High-Performance Build",
        "SEO-ready Structure",
      ],
    },
    {
      id: "03",
      title: "Mobile-First Websites",
      description:
        "Fully responsive websites designed with a mobile-first approach to ensure a seamless experience on all devices.",
      services: [
        "100% Mobile-first layouts",
        "Adaptive UI for all screen sizes",
        "High-performance optimization",
        "Smooth animations across devices",
      ],
    },
    {
      id: "04",
      title: "E-commerce",
      description:
        "Powerful e-commerce platforms designed to maximize conversions with intuitive UX, fast performance, and secure transactions.",
      services: [
        "Product pages & category UI",
        "Cart, Checkout, Secure Payments",
        "Admin Dashboard",
        "Search, Filters, Recommendations",
        "Conversion-optimized layouts",
      ],
    },
    {
      id: "05",
      title: "UI / UX Design",
      description:
        "User-centered design process that transforms ideas into beautiful, intuitive, and high-fidelity digital experiences.",
      services: [
        "Logo, Mockups, Colors, Typography",
        "Wireframes & User Flows",
        "High-fidelity Screens",
        "Interactive Prototypes",
        "Design System",
      ],
    },
    {
      id: "06",
      title: "Website Maintenance & Optimization",
      description:
        "Keeping your website fast, secure, updated, and error-free with continuous improvements and performance monitoring.",
      services: [
        "Speed Optimization",
        "Security Enhancements",
        "Bug Fixes & Cleanup",
        "SEO & Performance Updates",
      ],
    },
  ];

  return (
    <div className="w-full font-[PPNeueMontreal] min-h-screen bg-white text-white selection:bg-[#5227FF]">
      <section className="max-w-[1400px] mx-auto py-[15vh] px-[5vw]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4 block font-medium">
              Capabilities
            </span>
            <h1 className="text-[10vw] md:text-[6vw] font-medium text-black leading-[0.9] tracking-tighter">
              Services We <br />
              <span className="italic font-light text-black/50">Offer</span>
              <span className="text-[#5227FF]">.</span>
            </h1>
          </div>
          <p className="text-black/40 max-w-[300px] text-sm md:text-base leading-relaxed mb-4">
            We blend aesthetic excellence with technical precision to build the next generation of digital products.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {List.map((item, index) => (
            <div
              key={item.id}
              className={`group relative h-[65vh] md:h-[50vh] flex flex-col transition-all duration-700 ease-out 
                ${index % 2 !== 0 ? "md:translate-y-12" : ""}`} // Asymmetric Offset
            >
              <div className="relative w-full h-full bg-white border border-black/5 flex flex-col justify-between p-8 overflow-hidden hover:border-white/20 transition-colors duration-500">

                {/* Background Number Reveal */}
                <div className="absolute -bottom-10 -right-4 text-[15vw] font-bold text-black/[0.02] pointer-events-none group-hover:text-[#5227FF]/[0.05] transition-colors duration-700">
                  {item.id}
                </div>

                {/* Top: ID & Icon */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm text-[#5227FF]">{item.id} /</span>
                  <div className="p-2 border border-black/10 rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="relative z-10">
                  <h2 className="text-[8vw] md:text-[2vw] font-medium text-black leading-tight mb-6">
                    {item.title.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h2>

                </div>

                {/* Bottom: Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-black/5">
                  {item.services.map((service, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-widest px-3 py-1 bg-black/5 rounded-full text-black/60 group-hover:bg-white group-hover:text-black transition-all duration-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Subtle Progress Hover Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5227FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;