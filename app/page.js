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
import Accordion from "./Components/utils/Accordion"
import Service from "./Components/utils/Service"

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





    const intro = introRef.current;
    const arrow1 = arrow1Ref.current;

    const intro2 = introRef2.current;
    const arrow2 = arrow2Ref.current;

    gsap.set(arrow1, { transformOrigin: "50% 50%", willChange: "transform" });
    gsap.set(arrow2, { transformOrigin: "50% 50%", willChange: "transform" });

    intro.onmouseenter = () => {
      gsap.to(arrow1, {
        rotate: 0,
        duration: 1.1,
        ease: "power4.inOut",
        force3D: true,
      });
    };

    intro.onmouseleave = () => {
      gsap.to(arrow1, {
        rotate: -135,
        duration: 0.8,
        ease: "power4.inOut",
        force3D: true,
      });
    };

    intro2.onmouseenter = () => {
      gsap.to(arrow2, {
        rotate: 0,
        duration: 1.1,
        ease: "power4.inOut",
        force3D: true,
      });
    };

    intro2.onmouseleave = () => {
      gsap.to(arrow2, {
        rotate: -135,
        duration: 0.8,
        ease: "power4.inOut",
        force3D: true,
      });
    };
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

  return (
    <ReactLenis root>
      <div ref={mainRef} className="w-full overflow-hidden min-h-screen main  bg-[#16181B] text-white">
        <section ref={section1} className="w-full lg:h-screen xl:h-screen relative  md:px-[2vw] bg-white px-[5vw]">
          {/* Hero Text */}
          <div className="overflow-hidden w-full h-full grid grid-cols-6 md:grid-cols-12  gap-4 md:gap-6 xl:gap-8 pt-[20vw] md:pt-[10vw] xl:pt-[5vw] ">
            <div className="grid md:grid-cols-12 md:gap-8 gap-4 grid-cols-6 col-start-1 col-span-6 md:col-span-12 border-b border-black/60">
              <div className="border-wrapper col-start-1 md:col-start-1 col-span-4 md:col-span-7 lg:col-start-1 lg:col-span-4 xl:col-span-4 flex flex-col text-black overflow-hidden">
                {/* Hero Text */}
                <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw]  font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[3vw] lg:leading-[3vw] md:text-[5vw] text-[6vw] leading-[6vw] md:leading-[5vw] ">
                  <h1 className="textH ">
                    Every Innovation
                  </h1>
                </div>
                <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw] xl:-mt-[1vw] font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[4vw] lg:leading-[3vw] md:text-[5vw] text-[6vw] leading-[6vw] md:leading-[5vw] ">
                  <h1 className="textH">
                    Deserves Thoughtful
                  </h1>
                </div>
                <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw] xl:-mt-[1vw] font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[3vw] lg:leading-[3vw] md:text-[5vw] text-[6vw] leading-[6vw] md:leading-[5vw] ">
                  <h1 className="textH">
                    Developers
                  </h1>
                </div>
              </div>

              <div className="w-full h-full justify-end items-end pt-[5vw] md:mt-0 lg:pt-[8vw] xl:pt-[8vw] text-black col-start-1 lg:col-start-5 lg:col-span-3 md:col-start-4 md:col-span-4 xl:col-start-6  col-span-3 xl:col-span-3">
                <div className="overflow-hidden">
                  <p className="textH xl:text-[5vw] text-[7vw] leading-[7vw] xl:leading-[4.5vw]  md:pt-0 xl:pt-[9vw] lg:pt-[16vw] lg:text-[5vw] font-[PPNeueMontreal] font-bold lg:leading-[5.5vw]">
                    2025©
                  </p>
                </div>
              </div>
              <div className="w-full md:col-start-8 xl:col-start-9 col-start-3 mix-blend-normal md:col-span-5 xl:col-span-4 col-span-4 overflow-hidden  h-full">
                <img
                  className="w-full h-full object-center object-cover overflow-hidden"
                  src={images.studioipad.src}  // image path
                  alt="description"
                  width={500}             // required
                  height={500}            // required
                  loading="lazy"
                />

              </div>
              <div className="w-full col-start-1 lg:pt-[8vw] font-[PPNeueMontreal] xl:pt-0 overflow-hidden text-black/70 pt-[2vw] col-span-4 md:col-span-5 xl:col-span-3">
                <TextY>
                  <p className="xl:text-[1vw] lg:text-[2vw] font-semibold lg:leading-[2vw] xl:leading-[1.1vw] text-[4vw] leading-[4vw] ">
                    We turn your <span className="text-black">“NOTHING”</span>  complexity vision
                    into <span className="text-black">“REAL”</span> revolutionary ideas feels inevitable
                  </p>
                </TextY>
              </div>
              <div className="w-full col-start-3 md:col-start-8 font-[PPNeueMontreal] xl:pt-0 lg:pt-[8vw] xl:col-start-6 overflow-hidden text-black/70 pt-[2vw] col-span-4 md:col-span-5 xl:col-span-3">
                <TextY>
                  <p className="xl:text-[1vw] lg:text-[2vw] font-semibold lg:leading-[2vw] xl:leading-[1.1vw] text-[4vw] leading-[4vw] ">
                    Crafting intuitive, human-focused interfaces — from pixels to backend logic
                  </p>
                </TextY>
              </div>
              <div className="w-full col-start-3 md:col-start-5 xl:col-start-11 lg:pt-[8vw] xl:pt-0 text-black/70 pt-[2vw] overflow-hidden col-span-4 md:col-span-4 xl:col-span-2">
                <TextY>
                  <h1 className="xl:text-[2.2vw] text-[8.5vw]  font-[PPNeueMontreal] font-semibold justify-start ">Asthetic</h1>
                </TextY>
              </div>
            </div>
            <div className="w-full col-start-2 lg:col-start-5 lg:col-span-7 md:col-start-3 xl:col-start-6 text-black relative col-span-4 md:col-span-6">
              <h1 className="xl:text-[9.2vw]  lg:text-[11vw] md:text-[14vw] text-[13.5vw] tracking-tight font-[PPNeueMontreal] font-bold uppercase">ELEGANCE*</h1>
              <h1 className="xl:text-[2.2vw] text-[4vw] lg:text-[4vw] absolute bottom-0 right-0 font-[PPNeueMontreal] font-bold ">Speaks</h1>
            </div>
          </div>
        </section>


        <section ref={section2} className="w-full h-full py-[5vw] md:px-[2vw] px-[5vw] bg-white  pt-[15vw] md:pt-[5vw]  ">

          <div className="grid md:grid-cols-12 grid-cols-6 border-y border-black/60 xl:gap-8 md:gap-6 pt-[5vw] gap-4">
            <div className="md:col-start-6 md:col-span-8 col-start-1 col-span-5  items-start justify-start overflow-hidden ">
              <TextY>
                <h1 className="font-[Helvetica] font-bold xl:text-[3.4vw] xl:leading-[3.6vw] text-[7vw] leading-[7vw] text-[#1E1E1E]/70 ">
                  Crafting premium digital aesthetics and transforming your nothing vision into real, exceptional visuals guided by our design principles.
                </h1>
              </TextY>
            </div>
            <div className="md:col-start-5 md:col-span-9 xl:-mt-[2.5vw] items-start justify-start overflow-hidden col-span-6">
              <TextY>
                <h1 className="font-[Helvetica] font-bold  xl:text-[3.4vw] xl:leading-[3.8vw] text-[7vw] leading-[7vw] text-[#1E1E1E] ">
                </h1>
              </TextY>
            </div>
          </div>
          <div className="grid md:grid-cols-12 grid-cols-6 xl:gap-8 md:gap-6 pt-[2vw]  gap-4">
            <div className="md:col-start-6 md:col-span-2 col-start-3 col-span-3 ">
              <button className="w-full xl:text-[1.2vw] xl:leading-[1.4vw] font-[PPNeueMontreal] font-bold text-black border rounded-full p-2">
                About Us
              </button>
            </div>
            <div className="md:col-start-8 col-start-3 col-span-4  md:col-span-5 rounded-sm overflow-hidden">
              <img src={images.mainbanner1.src} className="w-full h-full object-center object-cover" />
            </div>
          </div>
        </section>




        <section className="w-full lg:min-h-screen xl:min-h-screen  bg-white px-[5vw] md:px-[2vw]  ">

          <div ref={introRef} className="overflow-hidden pt-[20vw] md:pt-[8vw] lg:pt-[15vw] xl:pt-[5vw]">
            <h1 className="uppercase xl:text-[5vw] text-[8vw] font-bold flex items-center justify-start gap-2 md:items-center md:justify-start font-[PPNeueMontreal] text-black"><span>Intro</span><img ref={arrow1Ref} src={images.arrow.src} className="inline-block w-[15%] h-[15%] md:w-[5%] md:h-[5%] border rounded-full p-1 md:p-2 -rotate-135" /></h1>
          </div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-5 lg:gap-6 xl:gap-8 ">
            <div className="md:col-start-1 md:col-span-2 xl:col-start-1 xl:col-span-2 lg:col-start-1 lg:col-span-2 col-start-5 col-span-2 overflow-hidden pt-[5vw]">
              <img src={images.feviconico.src} className="w-full h-full object-center object-cover" />
            </div>
            <div className="md:col-start-4 xl:col-start-4 xl:col-span-4 lg:col-start-4 lg:col-span-6 col-start-1 col-span-5 md:col-span-4 overflow-hidden pt-[5vw]">
              <TextY>
                <p className="xl:text-[1.2vw] xl:leading-tight lg:text-[2.5vw] md:text-[2vw] md:leading-[2.5vw] font-[PPNeueMontreal] font-semibold lg:leading-[2.5vw] text-[4vw] leading-[4.5vw]  w-full    text-black/70">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  At our approach, we transform ideas into powerful digital experiences. Whether we build your website from the ground up or elevate your existing design, every decision we make is intentional
                </p>
              </TextY>
            </div>
            <div className="md:col-start-9 lg:col-start-7 xl:col-start-11 xl:col-span-2 md:col-span-4 lg:col-span-4 col-start-4 col-span-3 overflow-hidden pt-[5vw]">
              <div className="border-b border-gray-600/80 pb-1 ">
                <h1 className="font-mono tracking-tight xl:text-[1.5vw] text-black">
                  Studio Provides
                </h1>
              </div>
              <TextY>
                <ul className="xl:text-[1.1vw] pt-[1vw] xl:leading-[1.2vw] tracking-tight md:text-[3vw] md:leading-[3vw] lg:text-[2vw] lg:leading-[2vw] text-[4vw] leading-[4.2vw] dm-mono-medium  text-black/70">
                  <li>Brand Identity</li>
                  <li>Brand Strategy</li>
                  <li>Web Design</li>
                  <li>Web Dev</li>
                  <li>Web SEO Friendly</li>

                </ul>
              </TextY>
              <TextY>
                <ul className="xl:text-[1.2vw] mt-[1vw] xl:leading-[1.3vw] tracking-tight md:text-[3vw] md:leading-[3vw] lg:text-[2vw] lg:leading-[2vw] text-[11vw] font-mono font-bold text-black/70">
                  <h1>
                    2025©
                  </h1>
                </ul>
              </TextY>
            </div>
            <div className="md:col-start-1 hidden lg:hidden md:pt-0 pt-[25vw] xl:block md:hidden lg:col-start-1 lg:col-span-2 col-start-1 col-span-2 items-start justify-start overflow-hidden ">
              <h1 className="xl:text-[4vw] text-[7vw] md:text-[4vw] lg:text-[4vw] text2025 text-start font-[Helvetica] text-black font-bold">2025©</h1>
            </div>
            <div className="md:col-start-9 xl:col-start-6  xl:col-span-8 lg:col-start-7 lg:col-span-6 col-start-2 col-span-5 overflow-hidden pt-[5vw]">
              <TextY>
                <p className="xl:text-[2.5vw]  lg:text-[2.5vw] md:text-[2vw] md:leading-[2.5vw] lg:leading-[2.5vw] xl:leading-[2.6vw] text-[5vw] leading-[5.5vw] font-[PPNeueMontreal] font-bold  text-black/70">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; crafted to delight, engage, and convert your audience. We design not just for today, but for long-term impact, helping your brand attract more clients and create meaningful results.
                </p>
              </TextY>
            </div>

            <div className="md:col-start-1 md:col-span-4 hidden md:block lg:block xl:hidden lg:col-start-1 lg:col-span-2 col-start-1 col-span-2 items-start justify-start overflow-hidden pt-[5vw]">
              <h1 className="xl:text-[4vw] text-[7vw] md:text-[7vw] lg:text-[4vw] text2025 text-start font-[Helvetica] text-black/70 font-bold">2025©</h1>
            </div>
          </div>
        </section>





        <section className="min-h-screen w-full md:px-[2vw] px-[5vw]  bg-white">
          <div ref={introRef2} className="overflow-hidden  md:pt-[10vw] pt-[20vw] py-[2vw]  w-full">
            <h1 className="uppercase xl:text-[4vw] text-[8vw] font-bold flex items-center justify-start gap-2 md:items-center md:justify-start font-[PPNeueMontreal] text-black"><span>Services</span><img ref={arrow2Ref} src={images.arrow.src} className="inline-block w-[15%] h-[15%] md:w-[5%] md:h-[5%] border rounded-full p-1 md:p-2 -rotate-135" />
            </h1>
          </div>
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4 md:gap-8 pt-[15vw] md:pt-[5vw] pb-[10vw]">
            <div className="md:col-start-5 md:col-span-8  col-start-1 col-span-6">
              <Accordion />
            </div>
          </div>
        </section>

        <section className="w-full  bg-white h-full">
          <Footer />
        </section>


      </div>
    </ReactLenis>
  )
}
