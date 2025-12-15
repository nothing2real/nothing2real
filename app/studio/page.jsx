"use client"
import React, { useEffect, useRef } from "react"
import { ReactLenis } from "@studio-freight/react-lenis"
import { images, profile } from "@/public/assets/assets"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { FaArrowRight } from "react-icons/fa"
import { ArrowBigRight, ArrowRight } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TextY from "../Components/TextY"
import Footer from "../Components/Footer"
import Accordion from "../Components/utils/Accordion"
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
                <section className="bg-white  text-black w-screen min-h-screen pt-[15vw] py-[10vw] px-[2vw] flex items-center justify-center ">
                    <div className="w-full  py-10  overflow-hidden">
                        <div className="flex flex-col gap-[1vw]">

                            <div className="overflow-hidden ">
                                <h1
                                    style={{ fontStretch: "75%" }}
                                    className="text-[4vw] md:text-[3vw] textF text-end xl:text-[1.5vw] font-[dbsharp] font-bold leading-tight"
                                >
                                    Estd in 2025
                                </h1>
                            </div>
                            <div className="text-center uppercase tracking-tight">

                                <div className="overflow-hidden">
                                    <h1 style={{ fontStretch: "75%" }} className="text-[11vw] will-change-transform leading-[11vw] textA xl:text-[8vw] 2xl:text-[7.5vw] md:text-[8vw] md:leading-[7vw] lg:text-[8vw] lg:leading-[7.5vw] xl:leading-[6vw] font-[dbsharp] font-bold " > A self-owned</h1>
                                </div>
                                <div className="overflow-hidden">
                                    <h1 style={{ fontStretch: "75%" }} className="text-[8vw] will-change-transform leading-[7vw] textA xl:text-[8vw] md:text-[8vw] 2xl:text-[7.5vw] xl:leading-[6vw] md:leading-[7vw] lg:text-[7vw] lg:leading-[6vw] font-[dbsharp] font-bold " > well-driven creative web Studio </h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="w-full md:px-[2vw] px-[5vw] min-h-screen   mt-[5vw] flex items-start justify-start  overflow-hidden">
                    <div className="  ">
                        <h1 style={{ fontStretch: "75%" }} className="text-[12vw] leading-[10vw] uppercase sm:text-5xl lg:text-6xl xl:text-[7vw] font-bold flex items-center justify-start gap-2 font-[dbsharp] ">
                            About Us
                        </h1>


                        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 space-y-2  mt-[3vw] pt-[5vw] md:pt-[2vw] items-start">
                            <div className="md:col-start-1 col-start-2 col-span-5 md:col-span-5 text-[6vw] leading-[5.5vw] xl:text-[3vw] xl:leading-[2.5vw] font-[PPNeueMontreal] font-light ">
                                <TextY>
                                    <h1>The Story Behind Us With Our Passion To Raise </h1>
                                </TextY>
                            </div>
                            <div className="md:col-start-7 col-start-1 col-span-5 md:col-span-6 pt-[5vw] md:pt-[2vw] ">
                                <TextY>
                                    <p className="text-base w-full sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4.5vw] leading-[4.5vw] md:text-[2.5vw]  md:leading-[3vw] lg:text-[2.2vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.5vw]   ">
                                        At <span style={{ fontStretch: "75%" }} className="text-red-500 font-bold tracking-wide font-[dbsharp]">NR Studios</span>, we bring ideas to life through powerful, responsive, and beautifully designed websites. We're a creative web studio passionate about crafting digital experiences that not only look great but also deliver real results.
                                    </p>
                                </TextY>
                            </div>
                        </div>

                        <div className="grid grid-cols-6  md:grid-cols-12 gap-4 space-y-2 mt-[3vw]  items-start">

                            <div className="md:col-start-7 col-start-2 col-span-5 md:col-span-6  pt-[5vw] md:pt-[2vw]">
                                <TextY>
                                    <p className="text-base w-full sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4.5vw] leading-[4.5vw] md:text-[2.5vw]  md:leading-[3vw] lg:text-[2.2vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.5vw]   ">
                                        We belive in the power of creativity and technology to transform ideas into impactful digital experiences. we focus more on the emotion and story telling experience to connect, we belive that every innovation need right and toughtul impactfull team and that we are the right to choose
                                    </p>
                                </TextY>
                            </div>
                        </div>

                        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 space-y-2 mt-[3vw]  items-start">

                            <div className="md:col-start-7 col-start-1 col-span-5 md:col-span-6  pt-[5vw] md:pt-[2vw]">
                                <TextY>
                                    <p className="text-base w-full sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4.5vw] leading-[4.5vw] md:text-[2.5vw]  md:leading-[3vw] lg:text-[2.2vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.5vw]   ">
                                        Our team of skilled designers, developers, and strategists work closely with clients to understand their vision and goals. We believe that a great website is more than just aesthetics; it's about creating an engaging user experience that drives conversions and builds brand loyalty.
                                    </p>
                                </TextY>
                            </div>
                        </div>

                        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 space-y-2 mt-[3vw]  items-start">

                            <div className="md:col-start-7 col-start-2 col-span-5 md:col-span-6  pt-[5vw] md:pt-[2vw]">
                                <TextY>
                                    <p className="text-base w-full sm:text-lg font-[PPNeueMontreal] font-medium pb-[1vw] text-[4.5vw] leading-[4.5vw] md:text-[2.5vw]  md:leading-[3vw] lg:text-[2.2vw] lg:leading-[2.5vw] xl:leading-[1.5vw] xl:text-[1.5vw] text-white/80 2xl:text-[1.5vw] 2xl:leading-[1.5vw]   ">
                                        We collaborate with startups, brands, and creators to craft tailor-made web solutions that tell their story and drive real impact.
                                        From clean portfolio sites to complete web applications, we build with purpose, precision, and passion.
                                    </p>
                                </TextY>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="w-full h-screen  flex flex-col items-center justify-center ">
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] mt-[10vw] -rotate-2 font-[dbsharp] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text1Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                We don’t just  chase
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2 font-[dbsharp] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text2Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                <span style={{ fontStretch: "85%" }} className="text-white">attention</span> —we craft
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2  font-[dbsharp] text-white/50 leading-[10vw] uppercase font-bold text-center">
                        <div className="overflow-hidden">
                            <h1 ref={text3Ref} className=" overflow-hidden will-change-transform" style={{ fontStretch: "85%" }}>
                                with <span style={{ fontStretch: "85%" }} className="text-white">principles</span>
                            </h1>
                        </div>
                    </div>
                    <div className="w-full  xl:text-[8vw] text-[11vw] xl:leading-[7vw] -rotate-2  font-[dbsharp] text-white/50 leading-[10vw] uppercase font-bold text-center">
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
                    <div className="overflow-hidden md:pt-[10vw] pt-[20vw] py-[2vw]  w-full">
                        <h1 className="uppercase xl:text-[4vw] text-[8vw] font-bold flex items-center justify-start gap-2 md:items-center md:justify-start font-[PPNeueMontreal] text-white"><span>Services</span><img src={images.arrow.src} className="inline-block w-[15%] h-[15%] mix-blend-difference bg-white md:w-[5%] md:h-[5%] border rounded-full p-1 md:p-2 -rotate-135" />
                        </h1>
                    </div>
                    <div className="grid md:grid-cols-12 grid-cols-6 gap-4 md:gap-8 pt-[15vw] md:pt-[5vw] pb-[10vw]">
                        <div className="md:col-start-6 md:col-span-8 col-start-1 text-white col-span-6">
                            <Accordion />
                        </div>
                    </div>

                </section>

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
                                <h1 className="xl:text-[1vw] text-[4vw] text-white mix-blend-difference">Naresh</h1>
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
