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

                <section className="w-full min-h-screen px-[5vw] md:px-[2vw] md:mt-[5vw] mt-[10vw]   ">
                    <div className="grid grid-cols-1 w-full  md:grid-cols-12 gap-4 pt-[10vw] md:pt-[1vw]">
                        <div className=" md:col-span-3 md:col-start-1">
                            <h1 sty className="xl:text-[1.5vw] xl:leading-[2vw] lg:text-[2vw] lg:leading-[2vw] md:text-[2.5vw] md:leading-[3vw] text-[5vw] dm-mono-medium uppercase font-bold ">(Our Process)</h1>
                        </div>
                        <div className=" md:col-span-8 md:col-start-5 font-[PPNeueMontreal] font-bold w-full ">
                            <TextY>
                                <p className="text-[7vw] tracking-tight xl:leading-[3.2vw] xl:text-[3vw] lg:text-[3.5vw] lg:leading-[4vw] md:text-[4.5vw]   leading-[7.5vw] md:leading-[5vw]  text-black/60 ">
                                    We believe in building lasting partnerships —
                                    not just delivering projects.
                                    Every website we craft carries your story, your emotion, and your identity.
                                </p>
                            </TextY>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-12 w-full h-full gap-4 mt-[5vw]   items-end justify-end md:items-start md:justify-start pt-[30vw] md:pt-[1vw] ">
                        <div className="col-span-4 col-start-1 md:block hidden md:col-span-5 md:pt-0 pt-[10vw] w-full h-[220px] md:h-[380px]">
                            <img src={images.processBanner.src} className="w-full h-full object-right object-cover " alt="" />
                        </div>
                        <div className="col-start-3 col-span-4 md:hidden block md:col-start-8 md:col-span-4 w-full h-[150px] md:h-[400px]">
                            <img src={images.processBanner.src} className="w-full h-full object-cover object-right " alt="" />
                        </div>
                    </div>
                </section>

                {/* Section 2 */}

                <section className="w-screen h-full px-[5vw] md:px-[2vw] md:h-screen overflow-hidden  mt-[2vw]">
                    <div className="w-full h-full object-cover object-bottom relative overflow-hidden">
                        <h1 className="text-white xl:text-[8vw] xl:leading-[7vw] text-[8vw] leading-[7vw]  mix-blend-difference font-[PPNeueMontreal] font-semibold absolute top-6  left-6 w-[60%] z-10">View Our 7 Stage Process </h1>
                        <ParallaxImage src={images.twoBanner.src} />
                        <h1 className="xl:text-[8vw] absolute bottom-5 right-5 font-[PPNeueMontreal] font-semibold text-white z-10">(<ArrowDown className="inline-block  xl:w-25 xl:h-35" strokeWidth={2} />)</h1>
                    </div>

                </section>
                <section className="w-full min-h-screen px-[5vw] md:px-[2vw]   flex items-start justify-start   overflow-hidden">
                    <div className=" pt-[3vw]  w-full ">
                        <div className="grid grid-cols-1 md:grid-cols-12  gap-4 space-y-2   items-start">
                            <div className="md:col-start-1 md:col-span-4 border-t border-gray-100/50 pt-[1vw] ">
                                <h1 className=""><span style={{ fontStretch: "75%" }} className="text-black font-semibold tracking-tight  xl:text-[4vw] text-[7vw] leading-[6vw] md:text-[4vw] md:leading-[3vw] lg:text-[3vw] lg:leading-[2.5vw] font-[dbsharp]">7 Stages</span></h1>



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
                            </div>
                        </div>
                    </div>
                </section>
                <section ref={containerRef} className="w-screen min-h-screen py-[5vw] md:block hidden bg-white  mt-[5vw]  ">
                    {processList.map((stage, index) => (
                        <div
                            key={index}
                            className="w-full  min-h-screen border-t-2 border-black md:h-screen cards mt-[5vw]  bg-white p-[2vw] font-[PPNeueMontreal]  grid grid-cols-1 md:grid-cols-12 gap-4 relative  items-start justify-start overflow-hidden"
                        >

                            <div className="md:col-start-1 pt-[5vw] md:col-span-1">
                                <h1 className="text-white font-[dbsharp] mix-blend-difference uppercase tracking-tight xl:text-[6vw] lg:text-[8vw] md:text-[9vw] text-[10vw] leading-[8vw] mb-6">
                                    [{index + 1}]
                                </h1>
                            </div>

                            <div className="md:col-start-4  md:col-span-7  pt-[5vw] items-start justify-start">
                                <div className="">
                                    <h1 className="text-white   mix-blend-difference uppercase tracking-tight xl:text-[3vw] xl:leading-[3vw] font-bold lg:text-[5vw] lg:leading-[5vw] md:text-[7vw] md:leading-[7vw] text-[8vw] leading-[8vw] mb-1">
                                        {stage.title}
                                    </h1>
                                </div>
                            </div>
                            <div className="md:col-start-4 md:col-span-4 gap-3 w-full    items-start justify-start">
                                <img src={stage.bg} alt={stage.title} className=" w-full h-full  object-cover mix-blend-normal object-center" />
                            </div>
                            <div className="md:col-start-9 md:col-span-4 gap-3 items-start justify-start">
                                <div className="relative  mix-blend-difference  text-start ">
                                    <TextY>
                                        <p className="text-white/70  font-[MyFont]  xl:text-[1.5vw] xl:leading-[1.5vw] lg:text-[1.8vw] lg:leading-[1.8vw] md:leading-[2vw] md:text-[2vw] text-[4vw] leading-[4vw]">
                                            {stage.desc}
                                        </p>
                                    </TextY>
                                </div>
                            </div>

                            <div className="md:col-start-9 md:col-span-4 gap-3 items-start justify-start">
                                <div className="relative  mix-blend-difference  text-start ">

                                    <p className="text-white uppercase text-end  font-[MyFont2]  xl:text-[1.5vw] xl:leading-[1.5vw] lg:text-[1.8vw] lg:leading-[1.8vw] md:leading-[2vw] md:text-[2vw] text-[4vw] leading-[4vw]">
                                        -Nr.Studio©
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </section>
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
