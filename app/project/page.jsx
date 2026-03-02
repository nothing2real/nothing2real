"use client";

import React, { useRef } from "react";
import Footer from "../Components/Footer";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { images } from "@/public/assets/assets";
import Image from "next/image";

const Page = () => {

  const mainref = useRef(null);

  useGSAP(() => {

    gsap.from(".textH", {
      y: 200,
      duration: 1.8,
      ease: "power4.out",
      stagger: 0.08,
      delay: 0.85,
      force3D: true
    })
  }, { scope: mainref })
  const projects = [
    {
      title: "Netha Silks",
      description: "E-commerce & brand experience for a heritage textile house.",
      year: "2025",
      category: "E-commerce / Branding",
      image: images.Nethaposter,
      link: "https://nethasilksandco.com/"
    },
    {
      title: "Naveen Sangewar",
      description: "Minimal portfolio for a Chartered Accountant.",
      year: "2025",
      category: "Portfolio Website",
      link: "https://nethasilks.com/"
    },
    {
      title: "Bharath Reddy Mulli",
      description: "Minimal portfolio for a Social Media Influencer.",
      year: "2026",
      category: "Portfolio Website",
      image: images.bharath,
      link: "https://bharath-reddy.vercel.app"
    },
  ];

  return (
    <ReactLenis root>
      <main ref={mainref} className="bg-white text-black">

        {/* ================= HERO ================= */}
        <section className="min-h-screen flex flex-col justify-center px-[5vw]">
          <div className="overflow-hidden">
            <p className="uppercase tracking-widest textH text-sm opacity-60 mb-6">
              Selected Work
            </p>
          </div>

          <div className="bg-white overflow-hidden">
            <div className="overflow-hidden">
              <h1 className="font-[Helvetica] textH font-bold leading-[16vw] text-[15vw] md:leading-[10.5vw] md:text-[10vw] xl:leading-[9vw] xl:text-[8vw]">
                Projects
              </h1>
            </div>
          </div>

          <div className="overflow-hidden">
            <p className="max-w-[40ch] mt-8 textH text-lg opacity-70">
              A curated selection of digital experiences crafted with clarity,
              restraint, and purpose.
            </p>
          </div>
        </section>


        <section className="w-full h-full p-[2vw]">
          <div className="w-full h-full  items-center justify-between border-t border-gray-300 grid gap-8 grid-cols-6 md:grid-cols-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="col-span-6  gap-6  border-b p-5 border-black/20"
              >
                {/* INDEX */}
                <div className=" text-md opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* TITLE */}
                <div className="">
                  <h2 className="font-[Helvetica] font-bold text-[8vw] md:text-[2vw]">
                    {project.title}
                  </h2>

                  <p className="mt-4 max-w-[45vh] text-[4vw] md:text-[1vw]  opacity-70">
                    {project.description}
                  </p>
                </div>

                <div className="w-full md:h-[98vh] h-[60vh]  ">
                  <Image
                    src={project.image} className="object-cover w-full h-full" />
                </div>

                {/* META */}
                <div className=" flex items-center justify-between text-black pt-[2vw]  text-sm opacity-60">
                  <p>{project.category}</p>
                  <p className="mt-2">{project.year}</p>
                </div>

                <button onClick={() => window.open(project.link, '_blank')}>
                  <h1 className="text-sm">View Project</h1>
                </button>
              </div>
            ))}
          </div>
        </section>


        {/* ================= FOOTER ================= */}
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default Page;
