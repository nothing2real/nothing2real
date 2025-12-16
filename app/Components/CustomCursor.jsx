"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // ❌ Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;

        gsap.set([dot, ring], {
            xPercent: -50,
            yPercent: -50,
            force3D: true,
            willChange: "transform",
        });

        let mouseX = 0;
        let mouseY = 0;

        const move = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot → instant
            gsap.set(dot, {
                x: mouseX,
                y: mouseY,
            });

            // Ring → smooth
            gsap.to(ring, {
                x: mouseX,
                y: mouseY,
                duration: 0.35,
                ease: "power3.out",
            });
        };

        const hoverables = document.querySelectorAll(".cursor-hover");

        hoverables.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                gsap.to(ringRef.current, {
                    scale: 2,
                    borderWidth: 0,
                    backgroundColor: "black",
                    duration: 0.3,
                });
            });

            el.addEventListener("mouseleave", () => {
                gsap.to(ringRef.current, {
                    scale: 1,
                    borderWidth: 1,
                    backgroundColor: "transparent",
                    duration: 0.3,
                });
            });
        });


        window.addEventListener("mousemove", move);

        // ---------- HOVER INTERACTIONS ----------
        const addHover = () => {
            document.querySelectorAll(
                "a, button, .cursor-hover"
            ).forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    gsap.to(ring, {
                        scale: 2.4,
                        backgroundColor: "#000",
                        borderWidth: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    });
                });

                el.addEventListener("mouseleave", () => {
                    gsap.to(ring, {
                        scale: 1,
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        duration: 0.3,
                        ease: "power3.out",
                    });
                });
            });
        };

        addHover();

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <>
            {/* DOT */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-black pointer-events-none"
            />

            {/* RING */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] w-[36px] h-[36px] rounded-full border border-black pointer-events-none mix-blend-difference"
            />
        </>
    );
}
