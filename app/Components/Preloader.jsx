"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = loaderRef.current;

    // Start fully visible (mask from bottom)
    gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)", willChange: "clip-path, opacity" });

    // Simulate loading progress (until window load completes)
    let current = 0;
    const simulateProgress = () => {
      if (current < 95) {
        current += Math.random() * 3;
        setCount(Math.floor(current));
        requestAnimationFrame(simulateProgress);
      }
    };
    simulateProgress();

    // Reveal animation after full page load
    const reveal = () => {
      setCount(100); // complete instantly

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
      tl.to(el, {
        clipPath: "inset(100% 0% 0% 0%)", // slide up reveal
        duration: 1.2,
      }).to(el, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          el.style.display = "none";
        },
      });
    };

    // Wait until all assets (images, fonts, etc.) are fully loaded
    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal);
    }

    return () => {
      window.removeEventListener("load", reveal);
    };
  }, []);

  // Update counter text efficiently (avoiding excessive re-renders)
  useEffect(() => {
    if (counterRef.current) counterRef.current.textContent = `${count}%`;
  }, [count]);

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <h1 className="text-4xl font-bold tracking-wider mb-4 uppercase">NR STUDIO</h1>
      <span ref={counterRef} className="text-3xl font-mono">
        0%
      </span>
    </div>
  );
}
