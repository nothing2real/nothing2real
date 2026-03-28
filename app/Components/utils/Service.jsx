"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const Service = () => {
  const List = [
    {
      id: "01",
      title: "Brand Identity",
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
      title: "UI/UX Design",
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
      title: "Website Maintenance",
      services: [
        "Speed Optimization",
        "Security Enhancements",
        "Bug Fixes & Cleanup",
        "SEO & Performance Updates",
      ],
    },
  ];

  return (
    <div className="w-full font-[PPNeueMontreal] min-h-screen bg-white text-[#252525] selection:bg-[#FFA500]">
      <section className="max-w-[1400px] mx-auto py-[15vh]  grid md:grid-cols-12 grid-cols-6 gap-2 md:gap-6">

        {/* LEFT: HEADER */}
        <div className="md:col-span-6 col-span-5">
          <span className="text-xs uppercase tracking-[0.3em] text-[#252525]/50 mb-4 block font-medium">
            Capabilities
          </span>

          <h1 className="text-[12vw] md:text-[4vw] font-medium leading-[0.9] tracking-tighter">
            Services We <br />
            <span className="italic font-light text-[#252525]/50">
              Offer
            </span>
            <span className="text-[#FFA500]">.</span>
          </h1>

          <p className="text-[#252525]/50 max-w-[280px] text-sm leading-relaxed mt-6">
            We blend aesthetic excellence with technical precision to build the next generation of digital products.
          </p>
        </div>

        {List.map((item, index) => (
          <div
            key={item.id}
            className={`group relative md:col-span-3 col-span-3 h-[48vh]  flex flex-col transition-all duration-700 
       `}
          >
            <div className="relative w-full h-full bg-red-500 border border-[#252525]/10 flex flex-col justify-between p-2 md:p-8 overflow-hidden hover:border-[#FFA500]/40 transition-all duration-500">

              {/* Background Number */}
              <div className="absolute -bottom-10 -right-4 text-[12vw] font-bold text-[#252525]/[0.03] group-hover:text-[#FFA500]/[0.08] transition-all duration-700">
                {item.id}
              </div>


              <div className="flex flex-col h-full justify-between">
                <h2 className="text-[6vw] md:text-[2.5vw] font-bold leading-[1.01]">
                  {item.title.split(" ").map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </h2>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#252525]/10">
                  {item.services.map((service, i) => (
                    <span
                      key={i}
                      className="text-[8px] uppercase tracking-tight font-semibold px-3 py-1 bg-[#252525]/5 rounded-full text-[#252525]/70 group-hover:bg-[#FFA500] group-hover:text-white transition-all duration-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}


              {/* Tags */}


              {/* Hover Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FFA500] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          </div>
        ))}


      </section>
    </div>
  );
};

export default Service;