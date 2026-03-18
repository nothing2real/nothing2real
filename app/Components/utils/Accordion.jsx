"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { PlusIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ title, content, images, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);

  // 1. Entrance Animations
  useGSAP(() => {
    gsap.fromTo(lineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  // 2. The Infinite Loop Logic
  useGSAP(() => {
    if (isOpen && marqueeRef.current) {
      const marquee = marqueeRef.current;
      const scrollWidth = marquee.scrollWidth;

      // Infinite horizontal scroll
      gsap.to(marquee, {
        x: `-${scrollWidth / 2}px`,
        duration: 20, // Adjust speed here
        ease: "none",
        repeat: -1,
      });
    } else {
      gsap.killTweensOf(marqueeRef.current);
    }
  }, [isOpen]);

  // 3. Accordion Toggle Logic
  useEffect(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.6,
      ease: "expo.inOut",
    });

    gsap.to(iconRef.current, {
      rotate: isOpen ? 135 : 0, // Rotates Plus into an 'X'
      duration: 0.4,
    });
  }, [isOpen]);

  return (
    <div className="w-full border-b border-black/10">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-2 text-left font-[PPNeueMontreal] font-semibold xl:text-[3vw] text-[7vw] tracking-tighter text-black hover:opacity-50 transition-opacity"
      >
        {title}
        <span ref={iconRef} className="transition-transform">
          <PlusIcon size={32} strokeWidth={1.5} />
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <div className="pb-10">
          {/* Text Services List */}
          <div className="flex flex-wrap gap-3 mb-8 px-2">
            {React.Children.map(content.props.children, (child, i) => (
              <span key={i} className="xl:text-[0.9vw] text-[3vw] font-sans font-semibold  tracking-tighter border text-black border-black/10 px-4 py-1 rounded-full bg-black/5">
                {child.props.children}
              </span>
            ))}
          </div>

          {/* INFINITE IMAGE LOOP */}
          <div className="relative w-full overflow-hidden py-1 pointer-events-none">
            <div ref={marqueeRef} className="flex gap-4 w-fit whitespace-nowrap">
              {/* Render images twice to create seamless loop */}
              {[...images, ...images, ...images].map((img, id) => (
                <div key={id} className="xl:w-[10vw] xl:h-[12vw] w-[60vw] h-[40vw] flex-shrink-0 overflow-hidden rounded bg-zinc-100">
                  <img
                    src={img}
                    alt="Work"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>

            {/* Gradient Fades for a premium look */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          </div>
        </div>
      </div>
      <div ref={lineRef} className="h-[1.2px] bg-black"></div>
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    {
      title: "Brand Identity",
      content: (
        <>
          <p>Brand Logo</p>
          <p>Colors Patterns</p>
          <p>Brand Typography</p>
          <p>Poster Designs</p>
          <p>Banner Designs</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
    {
      title: "Custom Website Design ",
      content: (
        <>
          <p>Custom Layouts & Component Library</p>
          <p>GSAP / Framer Animations</p>
          <p>Next.js High-Performance Build</p>
          <p>Wordpress & Elementor Build</p>
          <p>SEO-ready Structure</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
    {
      title: "Responsive Websites",
      content: (
        <>
          <p>100% Mobile-first layouts</p>
          <p>Adaptive UI for all screen sizes</p>
          <p>High-performance optimization</p>
          <p>Smooth animations across devices</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
    {
      title: "E-commerce Development",
      content: (
        <>
          <p>Product pages & category UI</p>
          <p>Cart, Checkout, Secure Payments</p>
          <p>Admin Dashboard</p>
          <p>Search, Filters, Recommendations</p>
          <p>Conversion-optimized layouts</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
    {
      title: "UI / UX Design",
      content: (
        <>
          <p>Logo, Mockups, Colors, Typography</p>
          <p>Wireframes & User Flows</p>
          <p>High-fidelity Screens</p>
          <p>Interactive Prototypes</p>
          <p>Design System</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
    {
      title: " Maintenance & Optimization",
      desc: "",
      content: (
        <>
          <p>Speed Optimization</p>
          <p>Security Enhancements</p>
          <p>Bug Fixes & Cleanup</p>
          <p>SEO & Performance Updates</p>
        </>
      ),
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60",
      ]
    },
  ];


  return (
    <div className="w-full px-[5vw] py-20 bg-white">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          images={item.images}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;