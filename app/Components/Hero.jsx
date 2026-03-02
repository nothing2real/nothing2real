import { images } from '@/public/assets/assets'
import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Hero = () => {
    const container = useRef(null);

    useGSAP(() => {
        // GPU acceleration & initial states
        gsap.set(".textH", { yPercent: 110 });
        gsap.set(".hero-image-inner", { scale: 1.5 });
        
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.to(".textH", {
            yPercent: 0,
            duration: 1.8,
            stagger: 0.1,
            delay: 0.5
        })
        .to(".image-reveal-box", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "expo.inOut"
        }, "-=1.5")
        .to(".hero-image-inner", {
            scale: 1,
            duration: 2,
            ease: "expo.out"
        }, "-=1.5")
        .from(".sub-info", {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.1
        }, "-=1");

        // Subtle Parallax on Scroll
        gsap.to(".hero-image-inner", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: container });

    return (
        <section ref={container} className="w-full min-h-screen relative bg-[#F8F8F8] px-[4vw] py-[2vw] flex flex-col justify-between overflow-hidden selection:bg-black selection:text-white">
            
            {/* Top Navigation-like Row */}
            <div className="flex justify-between items-start w-full z-10">
                <div className="overflow-hidden">
                    <p className="sub-info font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
                        Based in Earth / Available 2026
                    </p>
                </div>
                <div className="overflow-hidden text-right">
                    <p className="sub-info font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
                        Studio Archive© / 001
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-12 gap-4 items-end mb-[5vw]">
                
                {/* Left Column: Huge Headlines */}
                <div className="col-span-12 lg:col-span-8 relative z-20">
                    <div className="overflow-hidden">
                        <h1 className="textH text-[13vw] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase font-[PPNeueMontreal]">
                            Every <span className="italic font-light opacity-30">Innovation</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="textH text-[13vw] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase font-[PPNeueMontreal]">
                            Deserves <span className="text-black/20">Thoughtful</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="textH text-[13vw] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase font-[PPNeueMontreal]">
                            Developers*
                        </h1>
                    </div>
                </div>

                {/* Center Column: Date/Year */}
                <div className="hidden lg:block lg:col-span-1">
                    <p className="sub-info font-bold text-[4vw] leading-none mb-4 rotate-[-90deg] origin-bottom-left inline-block">
                        2025
                    </p>
                </div>

                {/* Right Column: Floating Image Reveal */}
                <div className="col-span-12 lg:col-span-3">
                    <div className="image-reveal-box w-full aspect-[3/4] overflow-hidden relative shadow-2xl" 
                         style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
                        <img
                            className="hero-image-inner w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            src={images.studioipad.src}
                            alt="Process"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Detailed Description & Editorial Flair */}
            <div className="grid grid-cols-12 gap-8 items-end pt-10 border-t border-black/5">
                <div className="col-span-12 md:col-span-4 lg:col-span-3 overflow-hidden">
                    <p className="sub-info text-sm leading-relaxed opacity-60">
                        We bridge the gap between human intuition and digital complexity, turning vision into high-performance experiences.
                    </p>
                </div>
                
                <div className="col-span-12 md:col-span-4 lg:col-span-3 overflow-hidden">
                    <p className="sub-info text-sm leading-relaxed opacity-60">
                        From pixel-perfect interfaces to robust backend architectures—we build with restraint and purpose.
                    </p>
                </div>

                <div className="hidden lg:block lg:col-start-10 lg:col-span-3 text-right">
                    <h2 className="sub-info text-[2.5vw] font-bold uppercase leading-none tracking-tighter">
                        Perfection <br/> 
                        <span className="text-black/10">Through Elegance</span>
                    </h2>
                </div>
            </div>

            {/* Floating Subtle Element */}
            <div className="absolute top-[30%] right-[5%] w-px h-24 bg-gradient-to-b from-black/20 to-transparent hidden lg:block" />
        </section>
    )
}

export default Hero