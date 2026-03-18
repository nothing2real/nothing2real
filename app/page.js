"use client"
import React, { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis } from "@studio-freight/react-lenis"
import { images } from "../public/assets/assets"
import { SplitText } from "gsap/SplitText"
import Footer from "./Components/Footer"
import TextY from "./Components/TextY"
import { ArrowRight } from "lucide-react"
import Hero from "./Components/Hero"
import Service from "./Components/utils/Service"
import FeaturedWork from "./Components/FeaturedWork"
import Accordion from "./Components/utils/Accordion"
import Image from "next/image"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export default function Page() {
  const mainRef = useRef(null)
  const introRef = useRef(null);
  const arrow1Ref = useRef(null);
  const introRef2 = useRef(null);
  const arrow2Ref = useRef(null);
  const studio = useRef(null);
  const section2 = useRef(null);
  const section1 = useRef(null);

  const pathRef = useRef(null); // New ref for SVG path
  const bannerImgRef = useRef(null); // New ref for image parallax


  useGSAP(() => {
    gsap.set(studio.current, { overflow: "hidden", x: 600, willChange: "transform" });
    gsap.to(studio.current, {
      x: 0,
      duration: 5,
      ease: "power4.out",
      force3D: true,
      scrollTrigger: {
        trigger: studio.current,
        start: "top 90%",
        end: "bottom -80%",
        scrub: 2

      }
    })




  });



  useGSAP(() => {

    gsap.ticker.fps(60)



    // GPU acceleration
    gsap.set("*", { force3D: true, willChange: "transform" })

    const splitNum = new SplitText(".text2025", {
      type: "words,chars",
      wordsClass: "word++",
      charsClass: "char++"
    })



    gsap.set(".char", { y: 200, force3D: true });
    gsap.to(splitNum.chars, {
      y: 0,
      duration: 1.8,
      ease: "power4.out",
      stagger: 0.03,
      delay: 0.85,
      force3D: true,
      scrollTrigger: {
        trigger: ".text2025",
        start: "top 80%",
      }
    })



    gsap.from(".textH", {
      y: 200,
      duration: 1.8,
      ease: "power4.out",
      stagger: 0.08,
      delay: 0.85,
      force3D: true
    })


  }, { scope: mainRef })

  useEffect(() => {
    document.fonts.ready.then(() => {
    });
  }, []);


  useGSAP(() => {
    gsap.set(".image", {
      scale: 1.3,
    });

    const charSplit = new SplitText(".textf", {
      type: "chars",
      charsClass: "char",
    });

    charSplit.chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("inline-block", "overflow-hidden");
      char.parentNode.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    gsap.from(charSplit.chars, {
      x: -80,
      opacity: 0,
      delay: 0.7,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
      force3D: true,
      scrollTrigger: {
        start: "top 80%",
        trigger: ".footer",

      }

    });





    // 2. Parallax effect for the image
    gsap.to(bannerImgRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section2.current,
        scrub: true,
      }
    });
  });

  return (
    <ReactLenis root>
      <div ref={mainRef} className="w-full overflow-hidden min-h-screen main  bg-[#16181B] text-white">
        <section ref={section1} className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-between z-0 overflow-hidden">
          <Hero />
        </section>


        <section className="min-h-screen w-full   bg-white">

          <FeaturedWork />
        </section>

        <section className="min-h-screen w-full font-[PPNeueMontreal] px-[5vw] md:px-[2vw] bg-white">
          <div className="grid grid-cols-6 gap-5 md:grid-cols-12 ">
            <div className="col-span-6 md:col-span-4 grid grid-cols-5 gap-1  h-full">
              <h1 className="col-span-6 md:col-span-4 xl:text-[3vw] text-[11vw] font-bold text-black tracking-tighter" >[ Our Services ]</h1>
              <p className="col-span-5 xl:text-[1vw] text-black">
                We define the foundation of your brand voice, visuals, and values shaped into a system built for long-term clarity.
              </p>
              <div className="md:col-span-3 col-span-3 col-start-3  h-[35vh] md:h-[50vh]">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1773152015734-2d164b515ec2?w=600&auto=format&fit=crop&q=60"
                  alt="img"
                  fill
                  priority
                  className="w-full h-full grayscale-50 object-cover"
                />
              </div>
            </div>
            <div className="col-span-6 md:mt-[8vw] md:col-start-7 ">
              <Accordion />
            </div>
          </div>
        </section>


        <section className="w-full relative py-[1vw] md:px-[2vw] px-[5vw] bg-white overflow-hidden">


          <div className="grid md:grid-cols-12 grid-cols-6 border-t border-black/10 relative pt-[5vw] gap-4">
            <div className="md:col-start-1 md:col-span-4 col-start-1 col-span-2">
              <span className="font-mono text-[12px] uppercase tracking-widest text-black/40">02 / About Nothing2Real</span>
            </div>
            <div className="md:col-start-1 md:col-span-12 col-start-1 col-span-6 overflow-hidden">
              <TextY>
                <h1
                  className="font-[PPNeueMontreal] tracking-tighter font-semibold xl:text-[4.5vw] xl:leading-[4.5vw]  md:text-[4vw] text-[8vw] leading-[1.1] text-[#1E1E1E]"
                  style={{ textIndent: "25%" }}
                >
                  We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#5227FF]">Nothing2Real Studios</span> — where imagination becomes reality
                </h1>
              </TextY>
            </div>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-6 xl:gap-8 md:gap-6 pt-[8vw] items-end">
            <div className="md:col-start-6 col-span-5 md:col-span-3 col-start-2 overflow-hidden aspect-[16/9] relative">
              <TextY>
                <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.02] xl:leading-[1.1] md:mb-6">
                  Founded on the belief that every idea deserves to be brought to life, Nothing2Real Studios specializes in transforming concepts into extraordinary digital experiences that captivate and inspire.
                </p>
              </TextY>
            </div>

            <div className="md:col-start-9 col-span-5 col-start-1 md:col-span-3  overflow-hidden aspect-[16/9] relative">
              <TextY>
                <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.02] xl:leading-[1.1] mb-6">
                  Our team of visionary creators, strategic thinkers, and technical experts work in perfect harmony to deliver solutions that not only meet expectations but exceed them.
                </p>
              </TextY>
            </div>

            <div className="md:col-start-6 col-span-5 col-start-1 md:col-span-6  overflow-hidden aspect-[16/9] relative">
              <TextY>
                <p className="text-black/80 font-[PPNeueMontreal] font-semibold text-[4vw] xl:text-[2.1vw] xl:leading-[2vw] leading-[1.02]  mb-6">
                  From cutting-edge web development to immersive brand experiences, we craft digital solutions that tell your story, engage your audience, and drive meaningful results for your business.
                </p>
              </TextY>
            </div>
          </div>

          {/* Enhanced Services & Stats Sidebar */}
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4 md:gap-6  border-t border-black/5">
            <div className="md:col-start-1 md:col-span-3 col-start-1 col-span-3">
              <div className="border-b border-gray-600/80 pb-2 mb-4">
                <h3 className="font-mono tracking-tight xl:text-[1.2vw] text-black font-semibold">
                  Our Expertise
                </h3>
              </div>
              <TextY>
                <ul className="xl:text-[1vw] pt-[0.5vw] xl:leading-[0.9vw] tracking-tight md:text-[2.5vw] md:leading-[2.2vw] lg:text-[1.8vw] lg:leading-[2.2vw] text-[3.5vw] leading-[4vw] text-black/70 space-y-2">
                  {["Brand Strategy & Identity", "Digital Product Design", "Full-Stack Development", "Motion Graphics & 3D", "Performance Optimization", "Creative Direction"].map((service, id) => (
                    <li key={id} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </TextY>
            </div>

            <div className="md:col-start-5 md:col-span-4 col-start-4 col-span-3">
              <TextY>
                <p className="text-black/70 font-[PPNeueMontreal] font-medium xl:text-[1.3vw] md:text-[2.2vw] text-[3.8vw] leading-tight mb-6">
                  Nothing2Real Studios was born from a simple philosophy: turn the impossible into possible. We bridge the gap between creative vision and technical execution, delivering work that stands out in an increasingly digital world.
                </p>
              </TextY>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-[#FFA500]/5 to-[#5227FF]/5 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#5227FF]">50+</div>
                  <div className="text-xs font-mono text-black/60 uppercase tracking-wider">Projects</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#5227FF]/5 to-[#FFA500]/5 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#FFA500]">5+</div>
                  <div className="text-xs font-mono text-black/60 uppercase tracking-wider">Years</div>
                </div>
              </div>
            </div>

            <div className="md:col-start-10 md:col-span-3 col-start-1 col-span-6 md:col-span-3 flex justify-center md:justify-end">
              <div className="text-center md:text-right">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#5227FF] mb-2">
                  2025
                </div>
                <div className="text-sm font-mono text-black/50 uppercase tracking-wider mb-4">
                  © Nothing2Real Studios
                </div>
                <div className="text-xs text-black/40 font-[PPNeueMontreal] italic">
                  Where ideas become reality
                </div>
              </div>
            </div>
          </div>
        </section>





        <section className="min-h-screen w-full   bg-white">

          <Service />
        </section>


        <section className="w-full  bg-white h-full">
          <Footer />
        </section>


      </div >
    </ReactLenis >
  )
}