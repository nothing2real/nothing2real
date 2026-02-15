'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function RealtimePreloader() {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // This ref tracks the actual percentage loaded (0-100)
  const loadingStatus = useRef({ visual: 0, actual: 0 });

  useEffect(() => {
    // 1. Get all heavy assets
    const images = document.querySelectorAll('img');
    const totalAssets = images.length;
    let assetsLoaded = 0;

    const updateProgress = () => {
      assetsLoaded++;
      const targetPerc = totalAssets === 0 ? 100 : Math.round((assetsLoaded / totalAssets) * 100);
      loadingStatus.current.actual = targetPerc;
    };

    // Attach listeners to images
    if (totalAssets === 0) {
        loadingStatus.current.actual = 100;
    } else {
        images.forEach((img) => {
            if (img.complete) updateProgress();
            else {
                img.addEventListener('load', updateProgress);
                img.addEventListener('error', updateProgress); // count errors so we don't get stuck
            }
        });
    }

    // 2. GSAP "Smoother" - glides the visual state toward the actual state
    const ctx = gsap.context(() => {
      gsap.to(loadingStatus.current, {
        visual: 100,
        duration: 3, // Fallback duration if assets are instant
        ease: "none",
        onUpdate: () => {
          // If the actual loading is faster than the animation, 
          // we can accelerate, but we never let visual > actual
          const currentVisual = loadingStatus.current.visual;
          const currentActual = loadingStatus.current.actual;
          
          // Smooth the display
          setProgress(Math.round(currentVisual));

          // Reveal animation when finished
          if (currentVisual >= 100) {
            handleExit();
          }
        },
        // This ensures the bar only hits 100 if assets are actually ready
        modifiers: {
          visual: (value) => {
            return Math.min(value, loadingStatus.current.actual);
          }
        }
      });

      // Liquid text fill effect
      gsap.to(textRef.current, {
        backgroundSize: '100% 100%',
        ease: "power1.inOut",
        scrollTrigger: null, // Just a standalone tween
        duration: 2.5
      });
    });

    const handleExit = () => {
      const exitTl = gsap.timeline({
        onComplete: () => setIsVisible(false)
      });

      exitTl
        .to(".loading-content", { y: -20, opacity: 0, duration: 0.8, ease: "power4.in" })
        .to(containerRef.current, { 
            clipPath: "inset(0 0 100% 0)", 
            duration: 1.2, 
            ease: "expo.inOut" 
        });
    };

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F8F8]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="loading-content flex flex-col items-center">
        {/* Minimalist Counter */}
        <div className="mb-4 overflow-hidden">
            <span className="block font-mono text-xs tracking-tighter text-black/40">
                LOADING ARCHIVE — {progress}%
            </span>
        </div>

        {/* The Text Fill (Awwwards Style) */}
        <div className="relative">
          <div
            ref={textRef}
            className="text-[12vw] font-black tracking-tighter leading-none uppercase"
            style={{
              backgroundImage: 'linear-gradient(to top, #000 50%, #e5e5e5 50%)',
              backgroundSize: '100% 0%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,0,0,0.1)'
            }}
          >
            NOTHINGREAL
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-10 w-[20vw] h-[1px] bg-black/5 relative overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-black transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
      </div>
    </div>
  );
}