import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'


gsap.registerPlugin(ScrollTrigger);

const HeroBanner = () => {

    const section2 = useRef(null);
    const studio = useRef(null);
    useGSAP(() => {

        ScrollTrigger.create({
            trigger: section2.current,
            start: "top top",
            end: () => section2.current.offsetHeight + " top",
            pin: true,
            pinSpacing: false,
            scrub: true,
        });

        gsap.set(studio.current, {
            overflow: "hidden",
            x: 600,
            willChange: "transform"
        });

        gsap.to(studio.current, {
            x: 0,
            ease: "power4.out",
            force3D: true,
            scrollTrigger: {
                trigger: section2.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 2,
            }
        });
    });

    return (
        <section ref={section2} className="w-full h-full py-[5vw] md:px-[2vw] px-[5vw] bg-white border-t-2 border-black  ">
            <div className="overflow-hidden w-full">
                <div ref={studio} className="w-full overflow-hidden">
                    <h1 className="text-black xl:text-[7vw] xl:leading-[6.5vw] font-[PPNeueMontreal] font-bold uppercase tracking-tighter">Nothing Real Studio©</h1>
                </div>
            </div>
            <div className="grid md:grid-cols-12 grid-cols-6 xl:gap-8 md:gap-6 py-[5vw] gap-4">
                <div className="md:col-start-1 col-span-2 items-start justify-start ">
                    <div className="border-b border-gray-600/80 pb-1 ">
                        <h1 className="font-mono tracking-tight xl:text-[2vw] text-black">
                            Studio facts
                        </h1>
                    </div>
                </div>

                <div className="md:col-start-5 md:col-span-7 items-start justify-start overflow-hidden col-span-6">
                    <h1 className="font-[Helvetica] font-bold xl:text-[4vw] xl:leading-[3.8vw] text-black ">
                        We Craft preimium digital looks and making nothing to real looks by following principles
                    </h1>


                </div>
                <div className="md:col-start-5 md:col-span-2 pt-[3vw]">
                    <button className="w-full xl:text-[1.2vw] xl:leading-[1.4vw] font-[PPNeueMontreal] font-bold text-black border rounded-full p-2">
                        About Us
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
