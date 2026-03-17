import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextY from './TextY';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const container = useRef(null);
    const bgImage = useRef(null);
    const watermark = useRef(null);
    const particlesRef = useRef([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Interactive Particle System (Pure CSS/JavaScript)
    useEffect(() => {
        const createParticles = () => {
            const particleCount = 80;
            const particles = [];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'hero-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

                // Random colors for particles
                const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff6b6b', '#4ecdc4'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.opacity = Math.random() * 0.6 + 0.2;

                particlesRef.current.push(particle);
                container.current.appendChild(particle);
            }

            return particles;
        };

        const updateParticles = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            particlesRef.current.forEach((particle, index) => {
                const rect = particle.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    const moveX = deltaX * force * 0.5;
                    const moveY = deltaY * force * 0.5;

                    gsap.to(particle, {
                        x: moveX,
                        y: moveY,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(particle, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        };

        createParticles();
        window.addEventListener('mousemove', updateParticles);

        return () => {
            window.removeEventListener('mousemove', updateParticles);
            particlesRef.current.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            particlesRef.current = [];
        };
    }, []);

    useGSAP(() => {
        // Advanced Entrance Animation
        const introTl = gsap.timeline({
            defaults: { ease: "power4.out" }
        });

        introTl
            .from(bgImage.current, {
                scale: 1.3,
                duration: 2.5,
                filter: "brightness(0) blur(20px) saturate(0)",
                ease: "power2.out"
            })
            .to(bgImage.current, {
                filter: "brightness(0.5) blur(0px) saturate(1.3) contrast(1.2)",
                duration: 2,
                ease: "power2.out"
            }, "-=2")

            // Animated grid lines with glow
            .from(".grid-line-v", {
                scaleY: 0,
                duration: 1.8,
                stagger: 0.12,
                transformOrigin: "top",
                ease: "power3.out"
            }, "-=2.2")
            .from(".grid-line-h", {
                scaleX: 0,
                duration: 1.8,
                stagger: 0.12,
                transformOrigin: "left",
                ease: "power3.out"
            }, "-=2")

            // Watermark animation
            .fromTo(watermark.current, {
                scale: 0.7,
                opacity: 0,
                rotation: -15
            }, {
                scale: 1,
                opacity: 0.04,
                rotation: 0,
                duration: 2.2,
                ease: "power3.out"
            }, "-=2")

            // Content animations
            .from(".hero-ui", {
                opacity: 0,
                y: 50,
                rotationX: -20,
                transformOrigin: "bottom",
                duration: 1.5,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=1.2");

        // Scroll-based animations
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });

        scrollTl
            .to(bgImage.current, {
                y: 250,
                scale: 1.4,
                filter: "brightness(0.3) blur(8px) saturate(1.6)"
            }, 0)
            .to(watermark.current, {
                xPercent: -25,
                opacity: 0.02,
                scale: 1.2
            }, 0)
            .to(".hero-grid-overlay", {
                opacity: 0.05,
                y: 120,
                scale: 1.1
            }, 0)
            .to(".hero-content", {
                y: -60,
                opacity: 0.9
            }, 0)
            .to(".hero-particle", {
                opacity: 0.1,
                scale: 0.8
            }, 0);

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full min-h-[100svh] bg-[#0A0A0A] text-white flex flex-col justify-between overflow-hidden">

            {/* Interactive Particle System */}
            <style jsx>{`
                .hero-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    pointer-events: none;
                    will-change: transform;
                    animation: float linear infinite;
                    box-shadow: 0 0 10px currentColor;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-20px) rotate(90deg);
                    }
                    50% {
                        transform: translateY(-40px) rotate(180deg);
                    }
                    75% {
                        transform: translateY(-20px) rotate(270deg);
                    }
                }

                .grid-glow {
                    animation: gridPulse 4s ease-in-out infinite;
                }

                @keyframes gridPulse {
                    0%, 100% {
                        opacity: 0.1;
                        box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
                    }
                    50% {
                        opacity: 0.3;
                        box-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
                    }
                }
            `}</style>

            {/* Advanced Grid System */}
            <div className="hero-grid-overlay absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 flex justify-between px-[5vw]">
                    <div className="grid-line-v w-[3px] h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent grid-glow" />
                    <div className="grid-line-v hidden md:block w-[3px] h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent grid-glow ml-[25%]" />
                    <div className="grid-line-v hidden md:block w-[3px] h-full bg-gradient-to-b from-transparent via-pink-400/40 to-transparent grid-glow ml-[50%]" />
                    <div className="grid-line-v w-[3px] h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent grid-glow" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between py-[10vh]">
                    <div className="grid-line-h w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent grid-glow" />
                    <div className="grid-line-h w-full h-[3px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent grid-glow mt-[30%]" />
                    <div className="grid-line-h w-full h-[3px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent grid-glow" />
                </div>
            </div>

            {/* Multi-layered Background */}
            <div className="absolute inset-0 z-0">
                <img
                    ref={bgImage}
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover"
                    alt="Hero Background"
                />

                <div ref={watermark} className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                    <h2 className="text-[45vw] font-black text-white/[0.03] uppercase leading-none tracking-[-0.02em]">
                        REAL
                    </h2>
                </div>

                {/* Advanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/90 via-transparent to-[#1A1A1A]/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(0,255,255,0.1),transparent,rgba(255,0,255,0.1),transparent)]" />
            </div>

            {/* Main Content */}
            <div className="relative z-20 px-[5vw] flex-grow flex flex-col font-[PPNeueMontreal] justify-end pb-[10vw] md:pb-[5vw] hero-content">

                <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">

                    {/* Primary Headline with Advanced Effects */}
                    <div className="col-span-12 lg:col-span-10 order-1">
                        <div className="overflow-hidden">
                            <TextY delay={2.2}>
                                <h1 className="text-[20vw] md:text-[12vw] xl:text-[14vw] leading-[0.75] font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200 transform-gpu">
                                    <span className="inline-block hover:scale-110 transition-transform duration-700 cursor-hover relative">
                                        Creative
                                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                    </span>
                                    <br />
                                    <span className="inline-block hover:scale-110 transition-transform duration-700 cursor-hover relative ml-8">
                                        Motion
                                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                    </span>
                                </h1>
                            </TextY>
                        </div>
                    </div>

                    {/* Enhanced Description */}
                    <div className="col-span-11 md:col-span-4 md:col-start-1 order-3 md:order-2 flex flex-col gap-8">
                        <TextY delay={2.4} animateOnScroll={false}>
                            <p className="text-[6vw] md:text-[1.6vw] font-medium leading-tight text-white/90 max-w-lg">
                                We transcend digital boundaries, merging cutting-edge innovation with human-centered storytelling to create experiences that resonate on a profound level.
                            </p>
                        </TextY>

                        {/* Interactive Service Cards */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            {[
                                { name: 'Digital Innovation', desc: 'Future-forward solutions', color: 'from-cyan-400 to-blue-500' },
                                { name: 'Creative Strategy', desc: 'Compelling narratives', color: 'from-purple-400 to-pink-500' },
                                { name: 'Technical Excellence', desc: 'Performance driven', color: 'from-emerald-400 to-teal-500' },
                                { name: 'Brand Evolution', desc: 'Identity transformation', color: 'from-orange-400 to-red-500' }
                            ].map((service, index) => (
                                <div
                                    key={service.name}
                                    className="group relative px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl cursor-hover hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="text-base font-bold text-white/95 group-hover:text-white transition-colors duration-300">
                                            {service.name}
                                        </div>
                                        <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 mt-2">
                                            {service.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Service List */}
                    <div className="col-span-12 md:col-span-3 md:col-start-10 md:order-1 border-l border-white/20 pl-8 mb-6 hero-ui">
                        <div className="space-y-6">
                            {[
                                { name: 'Motion Design', desc: 'Dynamic storytelling', icon: '🎬' },
                                { name: 'Interactive Dev', desc: 'Engaging experiences', icon: '💻' },
                                { name: 'Brand Strategy', desc: 'Market leadership', icon: '🎯' },
                                { name: 'Creative Direction', desc: 'Vision execution', icon: '✨' }
                            ].map((service, index) => (
                                <div key={service.name} className="group flex items-start gap-4 cursor-hover">
                                    <div className="text-2xl opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                                        {service.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                                            {service.name}
                                        </div>
                                        <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300 mt-1">
                                            {service.desc}
                                        </div>
                                        <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 mt-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Headline */}
                    <div className="col-span-12 md:col-span-8 md:col-start-5 order-2 md:order-3">
                        <div className="overflow-hidden">
                            <TextY delay={2.8} animateOnScroll={false}>
                                <h1 className="text-[20vw] md:text-[12vw] xl:text-[14vw] leading-[0.8] font-black tracking-[-0.03em] text-white/70 hover:text-white/90 transition-colors duration-700">
                                    <span className="inline-block hover:rotate-2 transition-transform duration-700 cursor-hover">
                                        Design
                                    </span>
                                    <br />
                                    <span className="inline-block hover:-rotate-2 transition-transform duration-700 cursor-hover ml-12">
                                        Studio
                                    </span>
                                </h1>
                            </TextY>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <div className="relative z-30 w-full px-[5vw] py-10 border-t border-white/10 backdrop-blur-2xl bg-black/30 flex justify-between items-center hero-ui">

                {/* Interactive Scroll Indicator */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center cursor-hover hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-110">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping"></div>
                    </div>
                    <div className="text-lg tracking-wide text-white/80 font-medium">
                        Explore our work
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="text-sm text-white/60 uppercase tracking-wider font-medium">01</div>
                    <div className="relative w-32 h-[2px] bg-white/20 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 animate-pulse rounded-full" style={{animationDelay: '1s'}}></div>
                    </div>
                    <div className="text-sm text-white/40 uppercase tracking-wider font-medium">08</div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                    {[
                        { name: 'Twitter', color: 'hover:shadow-[0_0_25px_cyan]' },
                        { name: 'LinkedIn', color: 'hover:shadow-[0_0_25px_purple]' },
                        { name: 'GitHub', color: 'hover:shadow-[0_0_25px_pink]' }
                    ].map((platform) => (
                        <div
                            key={platform.name}
                            className={`w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-hover hover:bg-white/10 transition-all duration-300 ${platform.color} hover:scale-110`}
                        >
                            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;