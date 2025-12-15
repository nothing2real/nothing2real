"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, PlusIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ index, title, content, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  const linksRef = useRef([]);
  const titleWrapperRef = useRef(null);
  const lineRef = useRef(null);

  // GSAP Reveal Animations
  useGSAP(() => {
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      titleWrapperRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleWrapperRef.current,
          start: "top 90%",
        },
      }
    );

    gsap.fromTo(
      lineRef.current,
      { width: "20%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleWrapperRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  // Accordion Open / Close Animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      {/* Title */}
      <div ref={titleWrapperRef} className="overflow-hidden">
        <button
          onClick={onClick}
          className="w-full flex justify-between items-center py-4 text-left xl:text-[1.5vw] lg:text-[2.5vw] md:text-[3.5vw] font-[PPNeueMontreal] font-meduim text-[5vw] tracking-tight font-medium text-black"
        >
          {title}

          <span
            ref={iconRef}
            className="text-xl border border-gray-600/50 p-2 md:p-5 rounded-full inline-block"
          >
            <PlusIcon />
          </span>
        </button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="overflow-hidden opacity-0 h-0 "
      >
        <div className="pb-4 text-black leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {React.Children.map(content.props.children, (child, id) => (
              <div
                key={id}
                ref={(el) => (linksRef.current[id] = el)}
                className="xl:text-[1vw] font-mono tracking-tighter lg:text-[1.5vw] md:text-[2vw] text-[4vw] flex items-center"
              >
                •&nbsp;{child}
                <ArrowRight
                  className="inline-block ml-2 transition-all"
                  strokeWidth={1.1}
                  rotate={45}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div ref={lineRef} className="w-full h-[1px] bg-black/80"></div>
    </div>
  );
};

// Main Component
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
    },
    {
      title: "Custom Website Design & Development",
      content: (
        <>
          <p>Custom Layouts & Component Library</p>
          <p>GSAP / Framer Animations</p>
          <p>Next.js High-Performance Build</p>
          <p>SEO-ready Structure</p>
        </>
      ),
    },
    {
      title: "Responsive & Mobile-First Websites",
      content: (
        <>
          <p>100% Mobile-first layouts</p>
          <p>Adaptive UI for all screen sizes</p>
          <p>High-performance optimization</p>
          <p>Smooth animations across devices</p>
        </>
      ),
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
    },
    {
      title: "Website Maintenance & Optimization",
      desc:"",
      content: (
        <>
          <p>Speed Optimization</p>
          <p>Security Enhancements</p>
          <p>Bug Fixes & Cleanup</p>
          <p>SEO & Performance Updates</p>
        </>
      ),
    },
  ];

  return (
    <div className="w-full font-[Helvetica]">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default Accordion;
