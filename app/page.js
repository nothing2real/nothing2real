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

        <section className="w-full relative py-[1vw] md:px-[2vw] px-[5vw] bg-white overflow-hidden selection:bg-[#5227FF] selection:text-white">

          {/* Header Section */}
          <div className="grid md:grid-cols-12  grid-cols-6 border-t border-black/10 relative pt-[5vw] gap-4">

            <div className="md:col-start-1 md:col-span-4 h-[90vh] col-start-1 col-span-2">
              <Image src="https://plus.unsplash.com/premium_photo-1773152015734-2d164b515ec2?w=600&auto=format&fit=crop&q=60" alt="img" fill priority className="w-full h-full grayscale-50 object-cover" />
            </div>
            <div className="md:col-start-6 md:col-span-7  col-start-1 col-span-6 overflow-hidden">
              <TextY>
                <h1
                  className="font-[PPNeueMontreal] tracking-tighter font-semibold xl:text-[3.5vw] xl:leading-[3.5vw] md:text-[4vw] text-[8vw] leading-[1.1] text-[#1E1E1E]"
                  style={{ textIndent: "20%" }}
                >
                  Nothing2Real helps companies create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#5227FF]">stunning and strategically</span> sound experiences that engage audiences.
                </h1>
              </TextY>
            </div>
            <div className="md:col-start-6 col-span-5 md:col-span-3 col-start-1 overflow-hidden relative">
              <TextY>
                <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.2] mb-6">
                  Our experts work closely with you to ensure that every detail is aligned with your goals. We believe in bridging the gap between imagination and execution.
                </p>
              </TextY>
            </div>

            <div className="md:col-start-9 col-span-5 col-start-1 md:col-span-3 overflow-hidden relative">
              <TextY>
                <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.2] mb-6">
                  From concept to launch, we craft digital solutions that not only look exceptional but also drive results, building connections that last through time.
                </p>
              </TextY>
            </div>

            <div className="md:col-start-6 col-span-6 col-start-1 overflow-hidden relative mt-8 md:mt-12">
              <TextY>
                <div className="flex flex-col gap-2">
                  <h3 className="text-black font-[PPNeueMontreal] font-bold text-[6vw] xl:text-[2.5vw] tracking-tighter leading-none">
                    Naga Ruthwik
                  </h3>
                  <p className="text-[#5227FF] font-mono uppercase text-[3vw] xl:text-[0.9vw] tracking-widest font-semibold">
                    Founder & Creative Lead
                  </p>
                </div>
              </TextY>
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