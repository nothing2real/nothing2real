import { services } from '@/public/assets/assets'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { use, useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger);

const Cards = ({ title, desc, features, img, id }) => {
    return (
        <div id={`card-${id + 1}`} className='w-full h-full cards  border-b border-black overflow-hidden p-[2vw] grid md:grid-cols-12 grid-cols-6 gap-4   justify-center bg-indigo-300'>
            <div className='md:col-start-1 col-start-1 col-span-6 card-inner md:col-span-8 items-end  justufy-between'>
                <div className='w-full xl:text-[4vw] xl:leading-[3.5vw] lg:text-[5vw] lg:leading-[4.5vw] md:text-[5vw] md:leading-[5.5vw] text-[8vw] leading-[7.5vw] font-[PPNeueMontreal] font-bold text-black uppercase tracking-tighter '>
                    <h1 className='text-[#1E1E1E]'>{title}</h1>
                </div>
                <div className='w-full grid grid-cols-6 gap-4 items-center p-[3vw] justify-between'>
                    <div className='xl:text-[1.3vw] col-start-1 col-span-4 md:col-start-1 md:col-span-3  xl:leading-[1.5vw] font-[PPNeueMontreal] text-black font-bold'>
                        {desc}
                    </div>
                    <div className='xl:leading-[1vw] col-start-4 text-[3vw] col-span-3 md:col-start-5  border-black p-[2vw] md:col-span-2 md:text-[1vw] xl:text-[1vw] font-mono text-black'>

                        <div>{features}</div>

                    </div>
                </div>
            </div>
            <div className=' md:col-start-10 col-start-3 col-span-4 items-center justify-center mx-auto md:col-span-4 overflow-hidden rounded-sm bg-red-500 '>
                <img src={img.src} className='w-full h-full object-center object-cover  bg-indigo-400 ' alt="" />
            </div>
        </div>
    )
}

const Service = () => {

    useGSAP(() => {
        const cards = gsap.utils.toArray(".cards");

        // Base style setup
        gsap.set(cards, {
            transformOrigin: "center top",
            scale: 1,
            y: 0,
            z: 0.1,
        });

        cards.forEach((card, i) => {
            const next = cards[i + 1];
            const isLast = i === cards.length - 1;

            // Pin each card
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
                scrub: 1,
            });

            // Animate the previous card upward as next card enters
            if (!isLast) {
                ScrollTrigger.create({
                    trigger: next,
                    start: "top 85%",   // smoother entry
                    end: "top 40%",     // better overlap zone
                    scrub: 1,
                    onUpdate: (self) => {
                        gsap.to(card, {
                            y: 120 * self.progress,   // smooth rise
                            scale: 1 - self.progress * 0.03, // subtle depth feel
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                    }
                });
            }
        });
    });




    return (
        <div className='w-full min-h-screen bg-white '>
            {services.map((item, id) => (
                <Cards id={id} {...item} key={id} />
            ))}
        </div>
    )
}

export default Service;
