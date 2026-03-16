"use client"
import React, { useEffect, useRef } from "react"
import { ReactLenis } from "@studio-freight/react-lenis"
import { images, profile } from "@/public/assets/assets"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { FaArrowRight } from "react-icons/fa"
import { ArrowBigRight, ArrowDown, ArrowRight } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TextY from "../Components/TextY"
import Footer from "../Components/Footer"
import Accordion from "../Components/utils/Accordion"
import ServicesGrid from "../Components/utils/ServicesGrid"
gsap.registerPlugin(SplitText, ScrollTrigger)

const Page = () => {

    const imageDiv = useRef(null);
    const mainbanner = useRef(null);
    const button = useRef(null)
    const hoverFill = useRef(null)
    const textHover = useRef(null)
    const arrow = useRef(null)
    const textRef = useRef(null)
    const container = useRef(null);
    const text1Ref = useRef(null)
    const text2Ref = useRef(null)
    const text3Ref = useRef(null)
    const text4Ref = useRef(null)
    const team2Ref = useRef(null)
    const team1Ref = useRef(null)

    useGSAP(() => {

        document.fonts.ready.then(() => {
            const charSplit = new SplitText(".textS", {
                type: "words,chars",
                charsClass: "char++",
            })
            const charSplit2 = new SplitText(".textA", {
                type: "words,chars",
                charsClass: "char++",
            })

            const our = new SplitText(".our", {
                type: "words,chars",
                charsClass: "char++",
            })

            const split = new SplitText(textRef.current, {
                type: "words,chars",
                charsClass: "word++",
            })

            // Wrap each character in overflow-hidden span
            split.words.forEach((word) => {
                const wrapper = document.createElement("span")
                wrapper.classList.add("inline-block", "overflow-hidden")
                word.parentNode.insertBefore(wrapper, word)
                wrapper.appendChild(word)
            })

            // Animate only when scrolled into view
            gsap.from(split.words, {
                y: 130,
                duration: 1.8,
                stagger: 0.015,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 95%",
                },
            })

            charSplit2.chars.forEach((word) => {
                const wrapper = document.createElement("span")
                wrapper.classList.add("inline-block", "overflow-hidden")
                word.parentNode.insertBefore(wrapper, word)
                wrapper.appendChild(word)
            })

            // Animate only when scrolled into view
            gsap.from(charSplit2.chars, {
                y: 130,
                delay: 0.85,
                duration: 1.6,
                stagger: 0.015,
                ease: "power4.inOut",
                force3D: true

            })

            imageDiv.current.onmouseenter = () => {
                gsap.to(mainbanner.current, {
                    scale: 1.05,
                    duration: 0.8,
                    ease: "power4.out",
                    force3D: true
                })
            }

            imageDiv.current.onmouseleave = () => {
                gsap.to(mainbanner.current, {
                    scale: 1,
                    duration: 0.8,
                    ease: "power4.out",

                    force3D: true
                })
            }


            charSplit2.words.forEach((word) => {
                const wrapper = document.createElement("span")
                wrapper.classList.add("inline-block", "overflow-hidden")
                word.parentNode.insertBefore(wrapper, word)
                wrapper.appendChild(word)
            })

            gsap.from(our.chars, {
                y: 130,
                duration: 1.8,
                stagger: 0.018,
                ease: "power4.inOut",
                force3D: true,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 95%",
                    force3D: true
                },
            })

            our.chars.forEach((word) => {
                const wrapper = document.createElement("span")
                wrapper.classList.add("inline-block", "overflow-hidden")
                word.parentNode.insertBefore(wrapper, word)
                wrapper.appendChild(word)
            })



            gsap.from(".textF", {
                y: 100,
                delay: 1,
                duration: 2,
                ease: "power4.inOut",
                force3D: true
            })



        })

    });

    useGSAP(() => {

        gsap.set(container.current, { backgroundColor: "#16181B" });

        gsap.to(container.current, {
            backgroundColor: "white",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "top 20%",
                scrub: true,
            },
        });

        const btn = button.current
        const dot = hoverFill.current
        const text = textHover.current
        const arrowEl = arrow.current

        gsap.set(dot, { width: 0, height: 0, scale: 0, transformOrigin: "center center" })
        gsap.set(text, { yPercent: 0 })
        gsap.set(arrowEl, { x: 0 })

        // Mouse move — follow cursor
        const moveHandler = (e) => {
            const rect = btn.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            gsap.to(dot, {
                x,
                y,
                duration: 0.3,
                ease: "power3.out",
                force3D: true
            })
        }

        // Mouse enter — expand fill + move text & arrow
        const enterHandler = () => {
            gsap.to(dot, {
                width: 50, height: 50,
                scale: 10,
                duration: 0.8,
                ease: "power4.out",
                force3D: true
            })
            gsap.to(text, {
                duration: 0.5,
                ease: "power4.inOut",
                force3D: true
            })
            gsap.to(arrowEl, {
                x: 10,
                duration: 0.5,
                ease: "power4.inOut",
                force3D: true
            })
        }

        // Mouse leave — shrink fill + reset text & arrow
        const leaveHandler = () => {
            gsap.to(dot, {
                width: 0, height: 0,
                scale: 0,
                duration: 0.6,
                ease: "power4.inOut",
                force3D: true
            })
            gsap.to(text, {
                duration: 0.6,
                ease: "power4.inOut",
                force3D: true
            })
            gsap.to(arrowEl, {
                x: 0,
                duration: 0.5,
                ease: "power4.inOut",
                force3D: true
            })
        }



        btn.addEventListener("mousemove", moveHandler)
        btn.addEventListener("mouseenter", enterHandler)
        btn.addEventListener("mouseleave", leaveHandler)

        return () => {
            btn.removeEventListener("mousemove", moveHandler)
            btn.removeEventListener("mouseenter", enterHandler)
            btn.removeEventListener("mouseleave", leaveHandler)
        }
    }, [])

    useGSAP(() => {

        // Initial positions

        gsap.set([text1Ref.current, text3Ref.current], { x: 300, willChange: "transform" });

        gsap.set(text4Ref.current, { x: -300, willChange: "transform" });

        gsap.set(text2Ref.current, { x: -100, willChange: "transform" });



        const tl = gsap.timeline({

            scrollTrigger: {

                trigger: text1Ref.current,

                start: "top 85%",

                end: "top -80%",

                scrub: 1.5,

                ease: "none",

            }

        });



        tl.to(text1Ref.current, { x: -300, ease: "none" }, 0)

            .to(text2Ref.current, { x: 100, ease: "none" }, 0)

            .to(text3Ref.current, { x: -250, ease: "none" }, 0)

            .to(text4Ref.current, { x: 300, ease: "none" }, 0);







        gsap.set(team1Ref.current, { x: -300, willChange: "transform" });

        gsap.set(team2Ref.current, { x: 300, willChange: "transform" });



        const tl2 = gsap.timeline({

            scrollTrigger: {

                trigger: team1Ref.current,

                start: "top 98%",

                end: "top -80%",

                scrub: 1.5,

                ease: "none",

            }

        });



        tl2.to(team1Ref.current, { x: 300, ease: "none" }, 0)

            .to(team2Ref.current, { x: -300, ease: "none" }, 0)



    });



    useGSAP(() => {

        const cards = gsap.utils.toArray(".cards");

        gsap.set(cards, { transformOrigin: "center top", scale: 1 });

        cards.forEach((card, i) => {
            const tl = gsap.timeline({
                scale: 0.9, // adjust scale
                ease: "power1.out",
                force3D: true,
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cards[cards.length - 1],
                    end: "top top",
                },
            });

            if (i < cards.length - 1) {
                ScrollTrigger.create({
                    trigger: cards[i + 1],
                    start: "top bottom",
                    force3D: true,
                    end: "top top ",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.15;
                        gsap.set(card, {
                            scale: scale,
                            force3D: true,
                        })
                    }
                })
            }


        });
    }, { scope: container });

    useEffect(() => {
        document.fonts.ready.then(() => {
        });
    }, []);



    return (
        <ReactLenis root>
            {/* Full Page Section */}
            <div className="bg-[#16181B] text-white w-full min-h-screen   mx-auto overflow-hidden">
                <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-between z-0 overflow-hidden">

                    {/* 1. CINEMATIC BACKGROUND ASSET */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A] z-1" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-1 opacity-40" />

                        {/* Main Asset with Scale-on-Scroll Trigger */}
                        <img
                            src="https://images.unsplash.com/photo-1593283590172-adfce2adf213?auto=format&fit=crop&q=80"
                            className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-110"
                            alt="Hero Background"
                        />
                        {/* LARGE BACKGROUND WATERMARK TEXT */}
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[0.8] text-[20vw] font-bold opacity-[0.03]  pointer-events-none uppercase">
                            NOTHING <br />
                            <span className="flex items-center justify-center text-[30vw]">
                                2
                            </span> <br />
                            Real
                        </h1>
                    </div>


                    {/* 3. MAIN TITULAR CONTENT */}
                    <div className="relative z-20 px-[5vw] flex-grow flex flex-col justify-end pb-[5vw]">
                        <div className="grid md:grid-cols-12 gap-8 items-end">

                            {/* Left: Service List */}
                            <div className="md:col-span-3 hidden md:block border-l border-white/20 pl-4 mb-4">
                                <ul className="font-mono text-[10px] uppercase leading-relaxed text-white/40">
                                    <li>Product Design</li>
                                    <li>Content Strategy</li>
                                    <li>Brand Identity</li>
                                    <li>Front-end Development</li>
                                </ul>
                            </div>

                            {/* Center: Hero Headline */}
                            <div className="md:col-span-6 col-span-12">
                                <TextY>
                                    <h1 className="text-[14vw] md:text-[8vw] leading-[0.85] font-[PPNeueMontreal] font-semibold tracking-tighter">
                                        Creative studio <br />
                                        <span className="italic font-light opacity-80">for founders</span>
                                    </h1>
                                </TextY>
                            </div>

                            {/* Right: Sub-text & CTA */}
                            <div className="md:col-span-3 col-span-12 flex flex-col gap-6">
                                <p className="font-[PPNeueMontreal] text-[4.5vw] md:text-[1.1vw] leading-tight text-white/60">
                                    We partner with brands to create digital design that drives conversion and commands attention.
                                </p>
                                <div className="flex items-center gap-4">
                                    <button className="bg-[#FF4D00] text-white px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                                        Start Project
                                    </button>
                                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" className="-rotate-45">
                                            <path d="M7.5 2V13M7.5 13L12 8.5M7.5 13L3 8.5" stroke="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full min-h-screen bg-white text-black pt-[25vw] md:pt-[15vw] pb-[10vw] px-[5vw] md:px-[2vw] overflow-hidden">

                    {/* SECTION HEADER: The Bold Statement */}
                    <div className="w-full border-b border-black/10 pb-[5vw] mb-[10vw]">
                        <div className="flex items-baseline justify-between">
                            <h1
                                style={{ fontStretch: "75%" }}
                                className="text-[18vw] md:text-[12vw] leading-none uppercase font-bold font-[dbsharp] tracking-tighter"
                            >
                                About <span className="text-black/10">Us</span>
                            </h1>
                            <span className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-black/40 hidden md:block">
                                02 // Philosophy
                            </span>
                        </div>
                    </div>

                    {/* CORE STORY: Asymmetrical Grid */}
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-y-[15vw] md:gap-y-[10vw]">
                        <div className="md:col-start-1 md:col-span-12 col-start-1 col-span-6 overflow-hidden">
                            <TextY>
                                <h1
                                    className="font-[PPNeueMontreal] tracking-tighter font-semibold xl:text-[4.5vw] xl:leading-[4.5vw]  md:text-[4vw] text-[8vw] leading-[1.1] text-[#1E1E1E]"
                                    style={{ textIndent: "25%" }} // Responsive indent
                                >
                                    The Story Behind Us With Our Passion To
                                    <span className="italic font-sans text-indigo-400"> Raise</span> Digital Standards.

                                </h1>
                            </TextY>
                        </div>
                        {/* Paragraph 1: The Intro (Shifted Right) */}
                        <div className="col-span-6 md:col-start-6 md:col-span-4">
                            <div className="flex flex-col gap-6">
                                <span className="font-[dbsharp] font-bold text-red-500 uppercase tracking-widest text-[12px]">
                                    [ Our Identity ]
                                </span>

                                <TextY delay={0.2}>
                                    <p className="font-[PPNeueMontreal] text-[5vw] md:text-[1.5vw] leading-[1.01] text-black/80 font-medium mt-4 max-w-[90%]">
                                        At <span style={{ fontStretch: "75%" }} className="text-black font-bold font-[dbsharp] uppercase">NR Studios</span>, we bring ideas to life through powerful, responsive, and beautifully designed websites. We're a creative web studio passionate about crafting digital experiences that deliver real results.
                                    </p>
                                </TextY>
                            </div>
                            <div className="md:col-start-1 md:col-span-12 col-start-1 col-span-6 overflow-hidden">

                            </div>
                        </div>

                        {/* Paragraph 2: Emotion & Storytelling (Shifted Left) */}
                        <div className="col-span-5 md:col-span-6 border-l border-black/5 pl-[5vw] md:pl-[2vw]">
                            <TextY>
                                <span className="font-mono text-[10px] text-black/30 block mb-6">// 001</span>
                                <p className="font-[PPNeueMontreal] text-[5.5vw] md:text-[1.8vw] leading-tight font-medium text-black/80  tracking-tight">
                                    We believe in the power of <span className="text-red-500 italic">emotion</span>. Every innovation needs a thoughtful, impactful team to bridge the gap between human feeling and digital logic.
                                </p>
                            </TextY>
                        </div>

                        {/* Paragraph 3: Experience & Strategy (Shifted Right) */}
                        <div className="col-start-2 col-span-5 md:col-start-8 md:col-span-5 flex flex-col items-start">
                            <div className="w-full h-[1px] bg-black/10 mb-8"></div>
                            <TextY>
                                <p className="font-[PPNeueMontreal] text-[4.5vw] md:text-[1.2vw] leading-[1.02] font-medium text-black/70">
                                    Our team of designers, developers, and strategists work closely with clients to understand their vision. We believe a great website is more than aesthetics; it's about brand loyalty and conversion-driven UX.
                                </p>
                            </TextY>
                        </div>

                        {/* Paragraph 4: Final Impact (Center-Wide) */}
                        <div className="col-span-6 md:col-start-3 md:col-span-8 py-[10vw] border-y border-black/5 mt-[5vw]">
                            <TextY>
                                <h3
                                    style={{ fontStretch: "75%" }}
                                    className="font-[PPNeueMontreal] font-bold text-[10vw] md:text-[6vw] leading-[0.9] uppercase text-center"
                                >
                                    Purpose, <span className="text-black/20">Precision,</span> & Passion.
                                </h3>
                            </TextY>
                            <div className="flex justify-center mt-12">
                                <button className="group relative px-10 py-5 border border-black rounded-full overflow-hidden transition-colors hover:text-white">
                                    <span className="relative z-10 font-bold uppercase text-[3.5vw] md:text-[0.9vw] tracking-widest">Start a Project</span>
                                    <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="w-full h-screen  flex flex-col items-center justify-center ">
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] mt-[10vw] -rotate-2 font-[PPNeueMontreal] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text1Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                We don’t just  chase
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2 font-[PPNeueMontreal] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text2Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                <span style={{ fontStretch: "85%" }} className="text-white">attention</span> —we craft
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2  font-[PPNeueMontreal] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text3Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                with <span style={{ fontStretch: "85%" }} className="text-white">principles</span>
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2  font-[PPNeueMontreal] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text4Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                and
                                <span style={{ fontStretch: "85%" }} className="text-white">perfection</span>.
                            </h1>
                        </div>
                    </div>
                </section>



                <section className="w-full min-h-screen px-[5vw] md:px-[2vw] flex items-start justify-start   overflow-hidden">
                    <div className="pt-[5vw] md:pt-[3vw] ">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 space-y-2   items-start">
                            <div className="xl:col-start-1 xl:col-span-4 md:col-start-1 md:col-span-9 border-t border-gray-100/50 pt-[1vw] ">
                                <h1 className=""><span style={{ fontStretch: "75%" }} className="text-white font-semibold tracking-tight  xl:text-[4vw] text-[7vw] leading-[6vw] md:text-[4vw] md:leading-[3vw] lg:text-[3vw] lg:leading-[2.5vw] font-[dbsharp]">NR Studios</span></h1>
                                <h1 style={{ fontStretch: "75%" }} className=" sm:text-lg md:text-[3vw] md:leading-[3vw] lg:text-[2.5vw] lg:leading-[2.5vw] font-[Alliance-meduim] text-[4vw] leading-[4.5vw] 2xl:text-[1.7vw]  text-white/80 xl:leading-[2vw]">
                                    Is a Young Talent Crafting Knowledge
                                </h1>


                                <TextY>
                                    <p className="text-base tracking-tighter sm:text-lg pt-[5vw] font-[MyFont2] text-[4vw] max-w-md leading-[4.5vw]  md:text-[3vw] md:leading-[3vw] lg:text-[2vw] lg:leading-[2vw] xl:text-[1.5vw] text-white/80 xl:leading-[2vw]    ">
                                        Our 7-stage Agile flow blends design principles with development precision. We build in cycles of clarity and collaboration — keeping your vision alive at every step.
                                    </p>
                                </TextY>

                                <div className="xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] text-[4vw] md:mt-[2vw] mt-[5vw] ">
                                    <h1 className="text-white/50 border-b w-[30%] md:w-[30%] xl:w-[25%]"> (Our Process)</h1>
                                </div>

                                <TextY>
                                    <div className="overflow-hidden  w-full">
                                        {[" Concept & Requirement Gathering", " Sprint Planning", " Design & Development", "Testing & Quality Assurance", " Sprint Review & Feedback", " Deployment & Release", " User Feedback & Iteration"].map((items, id) => (
                                            <div key={id} className="border-b border-gray-200/50 max-w-md">
                                                <h1 className="xl:text-[1.2vw] lg:text-[1.5vw] md:text-[1.8vw] text-[4.5vw] py-2"><span className="text-white/60 text-[3vw] md:text-[1.2vw]">({id + 1})</span> &nbsp; {items}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </TextY>
                                <div className="overflow-hidden md:mt-[2vw] mt-[5vw]">
                                    <button ref={button} className="relative lg:w-[70%] md:w-[75%] w-[70%] xl:w-[50%] h-[45px] md:h-[51px]  border border-white rounded-full font-[dbsharp] font-semibold overflow-hidden uppercase tracking-wider">
                                        <span ref={hoverFill} className="absolute w-[30px] h-[30px] bg-white inset-0 rounded-full will-change-transform scale-0"></span>
                                        <span ref={textHover} className="relative z-10 text-white flex items-center justify-center gap-3 mix-blend-difference"><a href="/process">View Our Process</a> <ArrowRight ref={arrow} strokeWidth={2} /> </span>
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-start-5 lg:col-span-8 md:col-start-4 md:col-span-9 ">
                                <div ref={imageDiv} className="w-full h-full overflow-hidden  rounded-sm">
                                    <img ref={mainbanner} className="w-full h-full object-center object-cover  rounded-sm" loading="lazy-loading" src={images.mainbanner1.src} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What we Do?? */}
                <section className="w-full min-h-screen px-[5vw] md:px-[2vw] ">
                    <div className="overflow-hidden   mt-[5vw]">
                        <h1 className="uppercase xl:text-[4vw] text-[8vw] font-bold flex items-center justify-start gap-2 md:items-center md:justify-start font-[PPNeueMontreal] text-white"><span>What we do?</span><img src={images.arrow.src} className="inline-block w-[15%] h-[15%] mix-blend-difference bg-white md:w-[5%] md:h-[5%] border rounded-full p-1 md:p-2 -rotate-135" />
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 space-y-2 mt-[3vw]  items-start">
                        <div className="md:col-start-6 md:col-span-2    ">
                            <h1 style={{ fontStretch: "75%" }} className=" sm:text-lg pt-[1vw] md:text-[3vw] md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2.5vw] text-start font-[PPNeueMontreal] tracking-wide font-bold uppercase text-[5vw] leading-[5vw] xl:text-[1.5vw]  text-white/80 xl:leading-[2vw]"> Aim
                            </h1>
                        </div>
                        <div className="md:col-start-6 md:col-span-6 ">
                            <TextY>
                                <p className="text-base tracking-tight sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4vw] leading-[4.5vw] md:text-[3vw] md:leading-[3vw] lg:text-[2.5vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.7vw]   ">
                                    We craft digital experiences that combine creativity with precision. From designing intuitive UI/UX and developing custom web solutions to deploying scalable full-stack applications, we turn ideas into high-performing, visually stunning websites that drive real results.
                                </p>
                            </TextY>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-12 bg-white grid-cols-6 gap-4 md:gap-8 pt-[15vw] md:pt-[5vw] pb-[10vw]">
                    <h1 className="md:col-start-1 xl:text-[5vw] font-bold tracking-tight md:col-span-6 col-start-1 col-span-6 text-black">Services</h1>
                    <div className="md:col-start- md:col-span-12 col-start-1 text-white col-span-6">

                        <ServicesGrid />
                    </div>
                </div>

                {/* Why Us?? */}
                <section className="w-full px-[5vw] md:px-[2vw] h-full ">
                    <div className="overflow-hidden   mt-[5vw]">
                        <h1 className="uppercase xl:text-[4vw] text-[8vw] font-bold flex items-center justify-start gap-2 md:items-center md:justify-start font-[PPNeueMontreal] text-white"><span>Why Us</span><img src={images.arrow.src} className="inline-block w-[15%] h-[15%] mix-blend-difference bg-white md:w-[5%] md:h-[5%] border rounded-full p-1 md:p-2 -rotate-135" />
                        </h1>
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-4 space-y-2 mt-[3vw]  items-start">
                        <div className="md:col-start-6 md:col-span-2 col-start-1 col-span-2 w-full  ">
                            <h1 style={{ fontStretch: "75%" }} className=" sm:text-lg pt-[1vw] md:text-[3vw] md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2.5vw] text-start font-[Alliance-meduim] text-[5vw] leading-[5vw] xl:text-[2vw]  text-white/80 xl:leading-[2vw]"> Our Work
                            </h1>
                        </div>
                        <div className="md:col-start-6 col-start-1 w-full col-span-6 md:col-span-6 ">
                            <TextY>
                                <p className="text-base tracking-tight sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4vw] leading-[4vw] md:text-[3vw] md:leading-[3vw] lg:text-[2.5vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.7vw]   ">
                                    At our studio, creativity meets precision. We’re a team of passionate developers and designers who believe every digital experience should feel as good as it looks. From crafting seamless UI/UX flows to building powerful full-stack applications, we handle every step with care — design, development, testing, and deployment.
                                </p>
                            </TextY>
                        </div>
                    </div>
                </section>

                <section className="w-full h-full py-[5vw] md:px-[2vw] px-[5vw]">
                    <div className="w-full  xl:text-[8vw] pt-[10vw]  text-[13vw] xl:leading-[7vw] mt-[10vw] -rotate-2 font-[dbsharp] text-red-500 leading-[13vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={team1Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                Meet Our
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[13vw] xl:leading-[7vw]  -rotate-2 font-[dbsharp] text-white leading-[13vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={team2Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                Team Members
                            </h1>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-12 xl:gap-8 md:pt-[5vw] font-[PPNeueMontreal] font-bold pt-[10vw] gap-6 py-2 grid-cols-6">
                        <div className="md:col-start-1 col-start-1 col-span-3 w-full h-full md:col-span-2">
                            <img src={images.ruthwik.src} className="w-full h-full object-center object-cover" alt="" />
                            <div className="flex items-center justify-between">
                                <h1 className="xl:text-[1vw] text-[4vw] text-white mix-blend-difference">Nagaruthik</h1>
                                <h1 className="xl:text-[0.7vw] text-[2vw] text-white mix-blend-difference">Full-Stack Developer</h1>
                            </div>
                        </div>
                        <div className="xl:col-start-3 col-start-4 col-span-3 xl:col-span-2">
                            <img src={images.varshit.src} className="w-full h-full object-center object-cover" alt="" />
                            <div className="flex items-center justify-between">
                                <h1 className="xl:text-[1vw] text-[4vw] text-white mix-blend-difference">Varshith</h1>
                                <h1 className="xl:text-[0.7vw] text-[2vw] text-white mix-blend-difference">Art Director</h1>
                            </div>
                        </div>
                        <div className="xl:col-start-9 col-start-3 col-span-3 xl:col-span-2">
                            <img src={images.Rohith.src} className="w-full h-full object-center object-cover" alt="" />
                            <div className="flex items-center justify-between">
                                <h1 className="xl:text-[1vw] text-[4vw] text-white mix-blend-difference">Rohith</h1>
                                <h1 className="xl:text-[0.7vw] text-[2vw] text-white mix-blend-difference">Frontend Developer</h1>
                            </div>
                        </div>
                        <div className="xl:col-start-11 col-start-4 col-span-3 xl:col-span-2">
                            <img src={images.gopi.src} className="w-full h-full object-center object-cover" alt="" />
                            <div className="flex items-center justify-between">
                                <h1 className="xl:text-[1vw] text-[4vw] text-white mix-blend-difference">Gopi Krishna</h1>
                                <h1 className="xl:text-[0.7vw] text-[2vw] text-white mix-blend-difference">Backend Developer</h1>
                            </div>
                        </div>

                    </div>

                </section>

                <section className="w-full h-full  overflow-hidden ">
                    <Footer />
                </section>

            </div>

        </ReactLenis>
    )
}

export default Page
