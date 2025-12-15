import { images } from '@/public/assets/assets'
import React from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

useGSAP(() => {
    // GPU acceleration
    gsap.set("*", { force3D: true, willChange: "transform" })


    gsap.from(".textH", {
        y: 200,
        duration: 1.8,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.85,
        force3D: true
    })
})

const Hero = () => {
    return (
        <div>
            <section className="w-full min-h-screen relative flex flex-col px-[2vw] bg-white justify-center">

                {/* Hero Text */}
                <div className="overflow-hidden w-full h-full grid grid-cols-12 gap-8 xl:pt-[5vw] ">


                    <div className="border-wrapper md:col-start-1 col-span-4 flex flex-col text-black overflow-hidden">
                        {/* Hero Text */}
                        <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw]  font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[3vw] lg:leading-[3vw] md:text-[5vw] text-[8vw] leading-[8vw] md:leading-[5vw] ">
                            <div className="textH">
                                <h1>Every Innovation</h1>
                            </div>

                        </div>
                        <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw] xl:-mt-[1vw] font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[4vw] lg:leading-[3vw] md:text-[5vw] text-[8vw] leading-[8vw] md:leading-[5vw] ">
                            <div className="textH">
                                Deserves Thoughtful
                            </div>
                        </div>
                        <div className="overflow-hidden xl:text-[3vw] xl:leading-[3vw] 2xl:text-[3vw] xl:-mt-[1vw] font-[PPNeueMontreal] font-semibold lg:text-[3vw] 2xl:leading-[3vw] lg:leading-[3vw] md:text-[5vw] text-[8vw] leading-[8vw] md:leading-[5vw] ">
                            <h1 className="textH">
                                Developers
                            </h1>
                        </div>



                    </div>

                    <div className="w-full h-full justify-end items-end pt-[8vw] text-black md:col-start-6  col-span-2">
                        <p className="textH xl:text-[5vw] xl:leading-[4.5vw] pt-[10vw] lg:text-[5vw] font-[PPNeueMontreal] font-bold lg:leading-[5.5vw]">
                            2025©
                        </p>
                    </div>
                    <div className="w-full md:col-start-9 mix-blend-normal col-span-4 overflow-hidden bg-red-500 h-full">
                        <img
                            className="w-full h-full object-center object-cover overflow-hidden"
                            src={images.studioipad.src}  // image path
                            alt="description"
                            width={500}             // required
                            height={500}            // required
                        />

                    </div>


                    <div className="w-full col-start-1 text-black pt-[2vw] col-span-3">
                        <p className="xl:text-[1.2vw]">
                            We turn your vision into meaningful digital experiences.
                        </p>
                    </div>
                    <div className="w-full col-start-6 text-black pt-[2vw] col-span-3">
                        <p className="xl:text-[1.2vw]">
                            Crafting intuitive, human-focused interfaces — from pixels to backend logic
                        </p>
                    </div>
                    <div className="w-full col-start-11 text-black pt-[2vw] col-span-2">
                        <h1 className="xl:text-[2.2vw] font-[PPNeueMontreal] font-bold justify-start uppercase">PERFECTION</h1>
                    </div>
                    <div className="w-full col-start-6 text-black relative col-span-6">
                        <h1 className="xl:text-[9.2vw] lg:text-[9vw] tracking-wide font-[PPNeueMontreal] font-bold uppercase">ELEGANCE*</h1>
                        <h1 className="xl:text-[2.2vw] absolute bottom-0 right-0 font-[PPNeueMontreal] font-bold ">Speaks</h1>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Hero
