"use client"
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis"
import { images } from "@/public/assets/assets";
import TextY from "../Components/TextY";
import ParallaxImage from "../Components/ParallaxImage";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Footer from "../Components/Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Page = () => {

    const containerRef = useRef(null);

    const processList = [
        {
            title: "Concept & Requirement Gathering",
            desc: "In this stage, we collaborate closely with you to understand your goals, ideas, and expectations. We gather all creative and technical requirements to set a clear direction and build a strong foundation for the project.",
            bg: images.processBanner.src,
        },
        {
            title: "Sprint Planning",
            desc: "At this stage, we break the project into agile sprints, defining specific goals, deliverables, and timelines for each. From the previous stage’s gathered requirements, we translate insights into structured, actionable plans.",
            bg: images.mainbanner1.src,
        },
        {
            title: "Design & Development",
            desc: "Building on the sprint plan, this stage focuses on turning concepts into reality. Our designers and developers work hand-in-hand to create an engaging interface and seamless functionality — ensuring both beauty and performance.",
            bg: images.twoBanner.src,
        },
        {
            title: "Testing & Quality Assurance",
            desc: "In this stage, every element is rigorously tested for performance, responsiveness, and consistency. From the previous development stage, we ensure all components meet quality benchmarks and deliver a flawless user experience.",
            bg: images.mainbanner1.src,
        },
        {
            title: "Sprint Review & Feedback",
            desc: "At this stage, we review the completed sprint with you, discuss results, and gather your valuable feedback. From the testing outcomes, we refine features and ensure the product aligns perfectly with your expectations.",
            bg: images.processBanner.src,
        },
        {
            title: "Deployment & Release",
            desc: "In this stage, your product moves from development to the live environment. From the refined build, we handle deployment with precision — ensuring stability, security, and an uninterrupted launch experience.",
            bg: images.twoBanner.src,
        },
        {
            title: "User Feedback & Iteration",
            desc: "At this final stage, we observe user interactions, gather real-world insights, and iterate for continuous improvement. From the live deployment, this stage ensures your product evolves with user needs and long-term growth goals.",
            bg: images.mainbanner1.src,
        },
    ];


    useGSAP(() => {
        const cards = gsap.utils.toArray(".cards");

        gsap.set(cards, { transformOrigin: "center top", scale: 1, force3D: true });

        cards.forEach((card, i) => {
            const tl = gsap.timeline({
                scale: 0.9, // adjust scale
                ease: "power3.out",
                force3D: true,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    endTrigger: cards[cards.length - 1],
                    end: "top top",
                    onEnter: () => gsap.set(card, { willChange: "transform, opacity" }),
                    onLeaveBack: () => gsap.set(card, { willChange: "auto" }),
                },
            });

            if (i < cards.length - 1) {
                ScrollTrigger.create({
                    trigger: cards[i + 1],
                    start: "top bottom",
                    end: "top top ",

                    force3D: true,
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
    }, { scope: containerRef });

    useEffect(() => {
        document.fonts.ready.then(() => {
        });
    }, []);

    return (
        <ReactLenis root>

            <div className="w-full h-full overflow-hidden bg-white text-black  mx-auto">

                <section className="relative w-full min-h-[120vh] px-[5vw] md:px-[2vw] flex flex-col justify-center">
                    {/* Background Large Outlined Text - High-end Brand Feel */}
                    <div className="absolute top-[15%] left-0 w-full pointer-events-none overflow-hidden select-none opacity-5 md:block hidden">
                        <h1 className="text-[25vw] leading-none font-bold uppercase tracking-tighter whitespace-nowrap">
                            Process / Process / Process
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-4 relative z-10">

                        {/* Left Column: Technical Metadata */}
                        <div className="md:col-span-3 flex flex-col justify-between py-10">
                            <div className="overflow-hidden">
                                <TextY>
                                    <span className="dm-mono-medium uppercase text-[12px] md:text-[0.8vw] tracking-[0.2em] text-black/40 flex items-center gap-2">
                                        <span className="w-8 h-[1px] bg-black/20"></span>
                                        Methodology 2026
                                    </span>
                                </TextY>
                            </div>

                            <div className="mt-auto md:block hidden">
                                <div className="flex flex-col gap-4">
                                    <div className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center animate-bounce">
                                        <ArrowDown size={18} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[0.7vw] uppercase tracking-widest text-black/50 leading-relaxed max-w-[150px]">
                                        Scroll to explore the seven stages of creation
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Hero Content & Visual */}
                        <div className="md:col-span-12">
                            <div className="relative">
                                {/* Main Headline */}
                                <div className="overflow-hidden mb-12">
                                    <TextY delay={2}>
                                        <h1 style={{ textIndent: "25%" }} className="font-[PPNeueMontreal] tracking-tighter font-semibold text-[5vw] md:text-[3vw] leading-[0.95] text-[#1E1E1E]">
                                            Every product begins with a clear vision.
                                            Through research, strategy, and thoughtful design, we transform ideas into digital experiences that are meaningful, scalable, and built to last.
                                        </h1>
                                    </TextY>
                                </div>

                                {/* Floating Feature Image with Parallax Mask */}
                                <div className="grid grid-cols-1 md:grid-cols-8 gap-8 items-start">
                                    <div className="md:col-span-5 relative group">

                                        {/* Subtle Label */}
                                        <div className="absolute -bottom-6 right-0 text-[10px] dm-mono-medium uppercase text-black/30">
                                            Visualizing Structure // 001
                                        </div>
                                    </div>

                                    <div className="md:col-span-3 pt-4">
                                        <TextY>
                                            <p className="font-[PPNeueMontreal] text-[4.5vw] md:text-[1.2vw] leading-snug text-black/70">
                                                Every product begins with a clear vision. Through research, strategy, and thoughtful design, we transform ideas into digital experiences that are meaningful and built to last.
                                            </p>
                                        </TextY>
                                        <div className="h-[1px] w-full bg-black/10 mt-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Section 2 */}

                <section className="w-full min-h-screen px-[5vw] md:px-[2vw]   flex items-start justify-start   overflow-hidden">
                    <div className=" pt-[3vw]  w-full ">
                        <div className="grid grid-cols-1 md:grid-cols-12  gap-4 space-y-2   items-start">
                            <div className="md:col-start-1 md:col-span-4 border-t border-gray-100/50 pt-[1vw] ">
                                <div className="space-y-6">
                                    <div className="overflow-hidden">
                                        <span className="dm-mono-medium text-[10px] md:text-[0.7vw] tracking-[0.3em] text-black/40 uppercase flex items-center gap-3">
                                            <span className="w-6 h-[1px] bg-black/20"></span>
                                            Phase 02 / Strategic Execution
                                        </span>
                                    </div>

                                    <h2 className="font-[PPNeueMontreal] text-[18vw] md:text-[8vw] leading-[0.8] tracking-tighter text-black font-bold">
                                        07 <span className="italic font-light text-black/30">Stages</span>
                                    </h2>
                                </div>


                                <TextY>
                                    <p className="text-base sm:text-lg pt-[5vw] font-[PPNeueMontreal] font-semibold text-[5vw] max-w-md leading-[5vw]  md:text-[3vw] md:leading-[3vw] lg:text-[2vw] lg:leading-[2vw] xl:text-[1.8vw] text-black/80 xl:leading-[1.8vw]    ">
                                        Our 7-stage Agile flow blends design principles with development precision. We build in cycles of clarity and collaboration — keeping your vision alive at every step.
                                    </p>
                                </TextY>

                                <div className="xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] text-[4vw] md:mt-[2vw] mt-[5vw] ">
                                    <h1 className="text-white/50 border-b w-[30%] md:w-[30%] xl:w-[25%]"> (Our Process)</h1>
                                </div>

                                <div className="overflow-hidden  w-full">
                                    {[" Concept & Requirement Gathering", " Sprint Planning", " Design & Development", "Testing & Quality Assurance", " Sprint Review & Feedback", " Deployment & Release", " User Feedback & Iteration"].map((items, id) => (
                                        <div key={id} className="border-b border-black/70 max-w-md">
                                            <h1 className="xl:text-[1.2vw] lg:text-[1.5vw] font-[PPNeueMontreal] text-black/70 font-semibold md:text-[1.8vw] text-[4.5vw] py-2"><span className="text-black/60 text-[3vw] md:text-[1.2vw]">({id + 1})</span> &nbsp; {items}</h1>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="md:col-start-5 md:col-span-8   ">
                                <div className="w-full h-[500px] md:h-[1000px] overflow-hidden bg-red-600 rounded-sm">
                                    <img className="w-full h-full object-center object-cover  rounded-sm" loading="lazy-loading" src={images.mainbanner1.src} alt="" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-4">
                                        <div className="h-[1px] w-full bg-black/10"></div>
                                        <p className="dm-mono-medium text-[10px] text-black/40 uppercase tracking-widest">[ The Outcome ]</p>
                                        <p className="font-[PPNeueMontreal] text-[4vw] md:text-[0.9vw] text-black/60 leading-relaxed">
                                            We ensure scalability and performance are baked into the core of the product from stage one.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-[1px] w-full bg-black/10"></div>
                                        <p className="dm-mono-medium text-[10px] text-black/40 uppercase tracking-widest">[ Collaboration ]</p>
                                        <p className="font-[PPNeueMontreal] text-[4vw] md:text-[0.9vw] text-black/60 leading-relaxed">
                                            Transparent workflows with bi-weekly reviews and direct access to our design system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section ref={containerRef} className="w-full bg-white py-[15vw] md:py-[10vw]">
                    {/* Section Header */}
                    <div className="px-[5vw] mb-[10vw] md:mb-[5vw]">
                        <h2 className="font-[PPNeueMontreal] text-[12vw] md:text-[5vw] text-black tracking-tighter leading-none">
                            The <span className="italic font-light text-black/40">Blueprint</span>
                        </h2>
                        <p className="dm-mono-medium text-[3.5vw] md:text-[0.8vw] uppercase tracking-widest text-black/30 mt-4">
                            [ Phase 03 // Production Cycle ]
                        </p>
                    </div>

                    {processList.map((stage, index) => (
                        <div
                            key={index}
                            className="cards w-full min-h-[80vh] md:h-screen sticky top-0 flex items-center justify-center overflow-hidden border-t border-black/5 bg-white px-[5vw] md:px-[2vw]"
                        >
                            {/* Mobile-Specific Layout (Block) */}
                            <div className="flex flex-col w-full h-full md:hidden pt-[10vw] pb-[20vw] gap-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-[dbsharp] text-[15vw] leading-none text-black/10">
                                        0{index + 1}
                                    </h3>
                                    <span className="dm-mono-medium text-[3vw] tracking-[0.2em] text-black/40 uppercase">
                                        Stage .0{index + 1}
                                    </span>
                                </div>

                                <div className="w-full aspect-square overflow-hidden rounded-sm bg-gray-100">
                                    <img
                                        src={stage.bg}
                                        alt={stage.title}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h1 className="font-[PPNeueMontreal] text-[8vw] leading-[1] font-bold text-black uppercase tracking-tighter">
                                        {stage.title}
                                    </h1>
                                    <TextY>
                                        <p className="font-[PPNeueMontreal] text-[4.5vw] leading-relaxed text-black/60">
                                            {stage.desc}
                                        </p>
                                    </TextY>
                                </div>

                                <div className="mt-auto border-b border-black/10 pb-4">
                                    <p className="dm-mono-medium text-[3vw] text-black/30 uppercase flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Verified Outcome
                                    </p>
                                </div>
                            </div>

                            {/* Desktop-Specific Layout (Grid) */}
                            <div className="hidden md:grid grid-cols-12 w-full h-full items-center relative z-20">
                                <div className="col-span-2">
                                    <h3 className="font-[dbsharp] text-[12vw] leading-none text-black/10 uppercase">
                                        0{index + 1}
                                    </h3>
                                </div>

                                <div className="col-span-5 pr-[5vw]">
                                    <div className="space-y-6">
                                        <span className="dm-mono-medium text-[0.7vw] tracking-[0.4em] text-black/40 uppercase">
                                            Current Stage // .0{index + 1}
                                        </span>
                                        <h1 className="font-[PPNeueMontreal] text-[4vw] leading-[1] font-bold text-black uppercase tracking-tighter">
                                            {stage.title}
                                        </h1>
                                        <div className="w-12 h-[2px] bg-black/20"></div>
                                        <TextY>
                                            <p className="font-[PPNeueMontreal] text-[1.2vw] leading-relaxed text-black/60 max-w-md">
                                                {stage.desc}
                                            </p>
                                        </TextY>
                                        <div className="pt-8">
                                            <p className="dm-mono-medium text-[0.6vw] text-black/30 uppercase flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                Production Ready Output
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-5 h-[70vh] relative group overflow-hidden rounded-sm">
                                    <img
                                        src={stage.bg}
                                        alt={stage.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-in-out scale-110 group-hover:scale-100"
                                    />
                                    <div className="absolute bottom-6 right-6 mix-blend-difference">
                                        <p className="text-white font-[PPNeueMontreal] text-[0.8vw] opacity-40 uppercase tracking-widest">
                                            Nothing2Real Studio ©
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Mobile Section */}
                <section className="w-full h-full md:hidden block px-[5vw] bg-white">
                    <div className="grid grid-cols-6 gap-4 pt-[20vw] ">
                        <div className="pt-[5vw] font-[PPNeueMontreal] col-start-2 col-span-5">
                            <h1 className="text-[10vw] leading-[9vw] text-black/70 font-bold">Steps Involved In Our Process</h1>
                        </div>
                        {/* card1 */}
                        <div className="col-start-1 col-span-5 font-[PPNeueMontreal] pt-[15vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[1] &nbsp; Concept & Requirement Gathering</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        In this stage, we collaborate closely with you to understand your goals, ideas, and expectations. We gather all creative and technical requirements to set a clear direction and build a strong foundation for the project.
                                    </p>
                                </TextY>
                            </div>
                        </div>

                        {/* card2 */}
                        <div className="col-start-2 col-span-5 pt-[5vw] font-[PPNeueMontreal] ">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[2] &nbsp; Sprint Planning</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        At this stage, we break the project into agile sprints, defining specific goals, deliverables, and timelines for each. From the previous stage’s gathered requirements, we translate insights into structured, actionable plans.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                        {/* card3 */}
                        <div className="col-start-1 col-span-5 font-[PPNeueMontreal] pt-[5vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[3] &nbsp; Design & Development</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        Building on the sprint plan, this stage focuses on turning concepts into reality. Our designers and developers work hand-in-hand to create an engaging interface and seamless functionality — ensuring both beauty and performance.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                        {/* card4 */}
                        <div className="col-start-2 col-span-5 font-[PPNeueMontreal] pt-[5vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[4] &nbsp; Testing & Quality Assurance</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        In this stage, every element is rigorously tested for performance, responsiveness, and consistency. From the previous development stage, we ensure all components meet quality benchmarks and deliver a flawless user experience.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                        <div className="col-start-1 col-span-5 font-[PPNeueMontreal] pt-[5vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[5] &nbsp; Sprint Review & Feedback</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        At this stage, we review the completed sprint with you, discuss results, and gather your valuable feedback. From the testing outcomes, we refine features and ensure the product aligns perfectly with your expectations.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                        <div className="col-start-2 col-span-5 font-[PPNeueMontreal] pt-[5vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[6] &nbsp; Deployment & Release</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        In this stage, your product moves from development to the live environment. From the refined build, we handle deployment with precision — ensuring stability, security, and an uninterrupted launch experience.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                        <div className="col-start-1 col-span-5 font-[PPNeueMontreal] pt-[5vw]">
                            <div className="overflow-hidden">
                                <h1 className="text-[6vw] leading-[6vw] font-bold">[7] &nbsp; User Feedback & Iteration</h1>
                            </div>
                            <div className="overflow-hidden w-full pt-[5vw]  h-[60%]">
                                <img src={images.mainbanner1.src} className="w-full h-full object-cover object-center" alt="" />
                            </div>
                            <div className="overflow-hidden w-full h-full pt-[5vw]">
                                <TextY>
                                    <p className="text-[4vw] leading-[4vw] font-semibold">
                                        At this final stage, we observe user interactions, gather real-world insights, and iterate for continuous improvement. From the live deployment, this stage ensures your product evolves with user needs and long-term growth goals.
                                    </p>
                                </TextY>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="w-full h-full">
                    <Footer />
                </section>

            </div>
        </ReactLenis>
    );
};

export default Page;
