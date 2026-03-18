'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AppLoader() {
  const loaderRef = useRef(null);
  const pathRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let pageLoaded = false;
    let fontsLoaded = false;

    // Split text into characters for a premium entrance
    const characters = titleRef.current.innerText.split("");
    titleRef.current.innerHTML = characters
      .map(char => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    // Initial character state
    gsap.set(".char", { y: 100, opacity: 0 });
    gsap.to(".char", {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.2
    });

    const onWindowLoad = () => { pageLoaded = true; };
    if (document.readyState === 'complete') pageLoaded = true;
    else window.addEventListener('load', onWindowLoad);

    if (document.fonts) {
      document.fonts.ready.then(() => { fontsLoaded = true; });
    } else {
      fontsLoaded = true;
    }

    const update = () => {
      const isSystemReady = pageLoaded && fontsLoaded;
      
      // TARGET LOGIC
      const target = isSystemReady ? 100 : 90;
      const speed = isSystemReady ? 0.08 : 0.005; // Slightly slower for smoothness

      progressRef.current += (target - progressRef.current) * speed;

      if (isSystemReady && progressRef.current > 99.7) {
        progressRef.current = 100;
      }

      const currentProgress = progressRef.current;
      const roundedProgress = Math.floor(currentProgress);
      
      setProgress(roundedProgress);



      if (roundedProgress >= 100) {
        const tl = gsap.timeline({
          onComplete: () => setVisible(false)
        });

        tl.to(".char", {
          y: -100,
          stagger: 0.02,
          duration: 0.8,
          ease: "expo.in"
        })
        .to(contentRef.current, {
          opacity: 0,
          duration: 0.4
        }, "-=0.6")
        .to(loaderRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.2,
          ease: "expo.inOut"
        }, "-=0.4");

        cancelAnimationFrame(rafRef.current);
        return;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    }

    update();

    return () => {
      window.removeEventListener('load', onWindowLoad);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#252525] overflow-hidden font-['PP_Neue_Montreal','Neue_Montreal',sans-serif]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >

      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        {/* Main Title - Semibold styling */}
        <div className="overflow-hidden py-2">
          <h1 
            ref={titleRef}
            className="text-[12vw] md:text-[5.5vw] font-bold tracking-[-0.04em] text-white  leading-none"
          >
            Nothing 2 Real
          </h1>
        </div>
        
        {/* Progress Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-[200px] h-[2px] bg-white/10 relative">
            <div 
              className="absolute inset-0 bg-white origin-left transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          
          <div className="flex justify-between w-[200px]">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
              Initializing Studio
            </span>
            <span className="text-[10px] font-semibold tracking-[0.1em] text-white tabular-nums">
              {progress.toString().padStart(3, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Aesthetic Bottom Tag */}
      <div className="absolute bottom-10 flex gap-10 opacity-20 text-white text-[9px] uppercase tracking-[0.4em] font-medium">
        <span>© 2026</span>
        <span>Creative Direction</span>
        <span>Digital Reality</span>
      </div>
    </div>
  );
}