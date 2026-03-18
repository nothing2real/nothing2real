import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextY from './TextY';
import { div } from 'three/src/nodes/math/OperatorNode';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const container = useRef(null);
    const bgImage = useRef(null);
    const watermark = useRef(null);
    const section1 = useRef(null);
    const section2 = useRef(null);
    const pathRef = useRef(null);

    useGSAP(() => {
        // 1. Entrance Timeline for Content


        const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        introTl
            .from(bgImage.current, {
                scale: 1.4,
                duration: 2.5,
                filter: "brightness(0) blur(20px)",
            })
            // 2. GRID LINE ENTRANCE (Starts roughly at the same time as the blur)
            .from(".grid-line-v", {
                scaleY: 0,
                duration: 1.5,
                stagger: 0.1,
                transformOrigin: "top"
            }, "-=2")
            .from(".grid-line-h", {
                scaleX: 0,
                duration: 1.5,
                stagger: 0.1,
                transformOrigin: "left"
            }, "-=1.8")
            .from(".hero-ui", {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.1
            }, "-=1");

        // 4. INFINITE LOOPING GRID - Delayed by 2.2s to wait for intro
        const gridLoopTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            delay: 2.2 // <--- This delays the start of the loop
        });

        gridLoopTl
            .to(".grid-line-v", {
                opacity: 0.8,
                duration: 3,
                stagger: 0.2,
                ease: "sine.inOut"
            })
            .to(".grid-line-h", {
                opacity: 0.6,
                duration: 3,
                stagger: 0.15,
                ease: "sine.inOut"
            }, "-=2.5")
            .to(".grid-line-v", {
                scaleY: 1.05, // Slightly more noticeable loop
                duration: 4,
                stagger: 0.1,
                ease: "sine.inOut"
            }, "-=3")
            .to(".grid-line-h", {
                scaleX: 1.02,
                duration: 4,
                stagger: 0.1,
                ease: "sine.inOut"
            }, "-=3.5");

        // 1. SVG Drawing Animation
        const path = pathRef.current;
        const pathLength = path.getTotalLength();

        // Set initial state of path (hidden)
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 1
        });

        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section2.current,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1,
            }
        });

        ScrollTrigger.create({
            trigger: section1.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false, // This allows section2 to overlap
            anticipatePin: 1,
        });

        // Optional: Add a slight scale/opacity fade to Hero as it gets covered
        gsap.to(section1.current, {
            opacity: 0.5,
            y: 500,
            ease: "none",
            scrollTrigger: {
                trigger: section2.current,
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        });





        // 3. Scroll-Based Parallax
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        // gsap.to(section2.current, {
        //     backgroundColor: "#F4F4F4", // Elegant off-white
        //     scrollTrigger: {
        //         trigger: section2.current,
        //         start: "top 80%",
        //         end: "top 20%",
        //         scrub: true,
        //     }
        // });

        scrollTl
            .to(bgImage.current, { y: 150, scale: 1.2 }, 0)
            .to(watermark.current, { xPercent: -10, opacity: 0.1 }, 0)
            .to(".hero-grid-overlay", { opacity: 0.3, y: 50 }, 0); // Subtle grid movement

    }, { scope: container });

    const margin = [
        {
            id: 1,
            count: "$1M",
            desc: "Revenue generated for clients"
        },
        {
            id: 2,
            count: "4",
            desc: "Projects completed successfully"
        },
        {
            id: 3,
            count: "4",
            desc: "Happy clients worldwide"
        }


    ]

    return (
        <div ref={container} className="relative w-full  bg-[#0D0D0D] text-white flex flex-col justify-between overflow-hidden">
            <section ref={section1} className="relative w-full min-h-[100svh] bg-[#0D0D0D] text-white flex flex-col justify-between overflow-hidden">

                {/* --- GRID SYSTEM OVERLAY --- */}
                <div className="hero-grid-overlay absolute inset-0 z-10 pointer-events-none">
                    {/* Vertical Lines */}
                    <div className="absolute inset-0 flex justify-between px-[5vw]">
                        <div className="grid-line-v w-[1px] h-full bg-white/10" />
                        <div className="grid-line-v hidden md:block w-[1px] h-full bg-white/10 ml-[25%]" />
                        <div className="grid-line-v hidden md:block w-[1px] h-full bg-white/10 ml-[50%]" />
                        <div className="grid-line-v w-[1px] h-full bg-white/10" />
                    </div>
                    {/* Horizontal Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between py-[10vh]">
                        <div className="grid-line-h w-full h-[1px] bg-white/10" />
                        <div className="grid-line-h w-full h-[1px] bg-white/10 mt-[30%]" />
                        <div className="grid-line-h w-full h-[1px] bg-white/10" />
                    </div>
                </div>

                {/* 1. LAYERED BACKGROUND */}
                <div className="absolute inset-0 z-0">
                    <img
                        ref={bgImage}
                        src="https://images.unsplash.com/photo-1593283590172-adfce2adf213?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.1]"
                        alt="Hero"
                    />
                    <div ref={watermark} className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                        <h2 className="text-[35vw] font-bold text-white/[0.02] uppercase leading-none">Real</h2>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                </div>

                {/* 3. MAIN CONTENT */}
                <div className="relative z-20 px-[5vw] flex-grow flex flex-col font-[PPNeueMontreal] justify-end pb-[10vw] md:pb-[1vw]">
                    <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">

                        {/* Headline */}
                        <div className="col-span-12 lg:col-span-10  order-1">
                            <div className="overflow-hidden">
                                <TextY delay={2.2}>
                                    <h1 className="text-[19vw] leading-[19vw] md:text-[8vw] xl:text-[15vw]  font-semibold tracking-tighter">
                                        Creative
                                    </h1>
                                </TextY>
                            </div>
                        </div>

                        {/* Subtext */}
                        <div className="col-span-11 md:col-span-4 md:col-start-1 order-3 md:order-2 flex flex-col gap-6">
                            <TextY delay={2.4} animateOnScroll={false}>
                                <p style={{ textIndent: "5%" }} className="text-[4.5vw] md:text-[1.2vw] font-medium leading-tight  text-white">
                                    we turn your Nothing complexity vision into Real revolutionary ideas feels inevitable
                                </p>
                            </TextY>
                        </div>

                        {/* Service List */}
                        <div className="col-span-12 md:col-span-3 md:col-start-11 md:order-1 border-l  border-white/20 pl-4 mb-4 hero-ui">
                            <ul className="grid grid-cols-1 md:flex md:flex-col gap-2 md:gap-0 font-semibold text-[12px] md:text-[15px] md:leading-[1.02] leading-[0.5] text-white/50 md:text-white tracking-tight ">
                                <li>Product Design</li>
                                <li>Content Strategy</li>
                                <li>Brand Identity</li>
                                <li>Front-end Dev</li>
                            </ul>
                        </div>

                        {/* Secondary Headline */}
                        <div className="col-span-12 md:col-span-8 md:col-start-5 md:-mt-[5vw] -mt-[13vw] order-2 md:order-3">
                            <div className="overflow-hidden">
                                <TextY delay={2.2} animateOnScroll={false} >
                                    <h1 className="text-[15vw]  md:text-[8vw] textH xl:text-[10vw] leading-[1.1] md:leading-[1.1] md:-mt-[1vw] font-bold tracking-tighter ">
                                        Design studio
                                    </h1>
                                </TextY>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER UI */}
                <div className="relative z-30 w-full px-[5vw] py-6 border-t border-white/10 backdrop-blur-md flex justify-between items-center hero-ui">

                    <div className="hidden sm:block h-[1px] flex-grow mx-8 bg-white/5" />
                    <div className="text-[12px]  tracking-tight text-white">
                        Scroll to explore
                    </div>
                </div>
            </section>
            <section ref={section2} className="relative w-full py-[4vw] md:px-[2vw] px-[5vw] bg-white text-black z-10 md:rounded-t-[30px] rounded-t-[10px] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">

                {/* BACKGROUND SVG PATH - The "Awwwards" touch */}
                <svg
                    className="absolute -left-10 top-0 w-full h-full pointer-events-none opacity-40"
                    viewBox="0 0 1800 900"
                    fill="none"
                >
                    <defs>
                        <filter id="pathShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="20" stdDeviation="25" floodColor="#000" floodOpacity="0.9" />
                        </filter>
                    </defs>

                    <path
                        ref={pathRef}
                        d="M6.60818 56.8316C196.608 31.4982 575.304 72.8309 674.608 244.832C773.913 416.832 674.608 524.832 566.608 524.832C458.608 524.832 386.608 404.076 456.608 282.832C526.608 161.588 745.111 96.3323 974.608 228.832C1204.1 361.332 1380.61 692.032 1572.61 696.832"
                        stroke="red"
                        strokeWidth="180"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#pathShadow)"
                    />
                </svg>

                <div className="grid md:grid-cols-12 grid-cols-6 border-t border-black/10 relative pt-[5vw] gap-4">
                    <div className="md:col-start-1 md:col-span-4 col-start-1 col-span-2">
                        <span className="font-mono text-[12px] uppercase tracking-widest text-black/40">01 / Concept</span>
                    </div>
                    <div className="md:col-start-1 md:col-span-4 col-start-1 col-span-2">
                        <span className="tracking-tighter font-[PPNeueMontreal] text-[6vw] xl:text-[3.5vw] font-bold   text-black">Lets Talk</span>
                    </div>
                    <div className="md:col-start-4 md:col-span-8 col-start-1 col-span-6 overflow-hidden">
                        <TextY>
                            <h1
                                className="font-[PPNeueMontreal] tracking-tighter font-semibold xl:text-[3vw] xl:leading-[3vw]  md:text-[4vw] text-[5vw] leading-[1.1] text-[#1E1E1E]"
                                style={{ textIndent: "25%" }}
                            >
                                We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#5227FF]">Nothing2Real Studios</span> — where imagination becomes reality
                            </h1>
                        </TextY>
                    </div>
                    <div className="md:col-start-4 md:col-span-8 col-start-1 col-span-6 overflow-hidden">
                        <TextY>
                            <h1
                                className="font-[PPNeueMontreal] tracking-tighter font-semibold xl:text-[3vw] xl:leading-[3vw]  md:text-[4vw] text-[5vw] leading-[1.1] text-[#1E1E1E]"
                            // Responsive indent
                            >
                                Great digital products begin with clarity of vision.
                                <span className="italic font-sans text-indigo-400"> We</span> design
                                experiences that feel simple, intentional, and powerful — turning
                                <span className="text-orange-500 italic font-sans"> complex ideas into interfaces people naturally</span> visuals.
                            </h1>
                        </TextY>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-6 xl:gap-8 md:gap-6 pt-[8vw] items-center">


                    <div className="md:col-start-6 col-span-5 md:col-span-3 col-start-2 overflow-hidden aspect-[16/9] relative">
                        <TextY>
                            <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.02] xl:leading-[1.1] md:mb-6">
                                We dont just build websites.
                                <br />
                                We design digital systems where
                                design, motion, and technology
                                work together to create
                                meaningful user experiences.
                            </p>
                        </TextY>
                    </div>

                    <div className="md:col-start-9 col-span-5 col-start-1 md:col-span-3  overflow-hidden aspect-[16/9] relative">
                        <TextY>
                            <p className="text-black/80 font-[PPNeueMontreal] font-medium text-[4vw] xl:text-[1.1vw] leading-[1.02] xl:leading-[1.1] mb-6">
                                At our studio, every project begins
                                with understanding.
                                <br />
                                We study your brand, your audience,
                                and your vision — then translate it
                                into digital experiences that feel
                                clear, engaging, and memorable.
                            </p>
                        </TextY>
                    </div>
                    <div className="md:col-start-6 col-span-5 col-start-1 md:col-span-6  overflow-hidden  relative">
                        <TextY>
                            <p className="text-black/80 font-[PPNeueMontreal] font-semibold text-[4vw] xl:text-[2.1vw] xl:leading-[2vw] leading-[1.02] ">
                                We partner with founders, startups,
                                and ambitious companies to design
                                products that feel effortless,
                                beautiful, and unforgettable.
                            </p>
                        </TextY>
                    </div>

                    <div className='md:col-start-4 md:col-span-8 grid grid-cols-2 md:grid-cols-3  md:flex-row flex-col items-center justify-start border-t-2 border-gray-300 mt-[5vw] md:mt-0 gap-[5vw] col-span-6'>
                        {margin.map((item) => (
                            <div key={item.id} className="text-center  ">
                                <div className='  items-center font-sans justify-center flex-col '>
                                    <p className="text-[20vw] xl:text-[10vw] md:tracking-[-1.5rem] tracking-[-0.5rem] font-semibold">{item.count}+</p>
                                    <p className="text-sm md:text-[1.2vw] tracking-tighter leading-[0.9] text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>

    );
};

export default Hero;