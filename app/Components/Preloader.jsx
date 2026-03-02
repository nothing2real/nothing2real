'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function RealtimePreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Split text for character-by-character animation
    const text = textRef.current;
    if (text && text.textContent) {
      const chars = text.textContent.split("");
      text.innerHTML = chars
        .map((char) => `<span class="inline-block char">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
    }

    // 2. Real-time Loading Logic (Fonts + Document)
    let progressValue = 0;
    const updateProgress = () => {
      // Logic: Fast start, slow down at 90% until document.readyState is 'complete'
      const isDocComplete = document.readyState === 'complete';
      const increment = isDocComplete ? 2 : 0.4;
      
      if (progressValue < 100) {
        progressValue = Math.min(progressValue + increment, 100);
        setProgress(Math.floor(progressValue));
        requestAnimationFrame(updateProgress);
      } else {
        // Wait for Fonts to be actually ready before triggering the exit
        document.fonts.ready.then(() => {
          triggerExitAnimation();
        });
      }
    };

    const triggerExitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => setIsFinished(true)
      });

      tl.to(".char", {
        y: -100,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.inOut"
      })
      .to(counterRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5
      }, "-=0.8")
      .to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)", // Sophisticated Shutter Lift
        duration: 1.2,
        ease: "expo.inOut"
      });
    };

    updateProgress();
  }, []);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Texture: Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative w-full max-w-7xl px-8 flex flex-col items-start">
        
        {/* Agency Metadata (Top Left) */}
        <div className="absolute top-10 left-10 flex gap-8 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-mono">
          <span>Status: {progress < 100 ? 'Syncing_Core' : 'Ready'}</span>
          <span className="hidden md:block">Engine: v3.0.4</span>
        </div>

        {/* Big Brand Typography */}
        <h1 
          ref={textRef}
          className="text-[12vw] font-black leading-[0.9] tracking-tighter uppercase italic select-none"
        >
          NOTHINGREAL
        </h1>

        {/* Real-time Counter (Bottom Right) */}
        <div className="absolute bottom-10 right-10 flex items-baseline overflow-hidden">
          <span 
            ref={counterRef}
            className="text-[10vw] font-light leading-none tabular-nums"
          >
            {progress}
          </span>
          <span className="text-xl ml-2 text-blue-600 font-bold">%</span>
        </div>
      </div>

      {/* Aesthetic Progress Bar (Minimalist) */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-150 ease-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}