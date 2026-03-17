'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AppLoader() {
  const loaderRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);
  
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let pageLoaded = false;
    let fontsLoaded = false;

    // Signals
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
      // If system isn't ready, target 90% to leave room for the final snap.
      // If ready, target 100%.
      const target = isSystemReady ? 100 : 90;
      const speed = isSystemReady ? 0.1 : 0.01;

      progressRef.current += (target - progressRef.current) * speed;

      // --- THE FIX: HARD SNAP ---
      // If we are at 99.5% or higher, just finish it.
      if (isSystemReady && progressRef.current > 99.5) {
        progressRef.current = 100;
      }

      const currentProgress = progressRef.current;
      const roundedProgress = Math.floor(currentProgress);
      
      setProgress(roundedProgress);

      // Sync SVG
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { 
          strokeDashoffset: length - (currentProgress / 100) * length 
        });
      }

      // EXIT TRIGGER
      if (roundedProgress >= 100) {
        const tl = gsap.timeline({
          onComplete: () => setVisible(false)
        });

        tl.to(contentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        })
        .to(loaderRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "expo.inOut"
        }, "-=0.2");

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden font-[PPNeueMontreal]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* SVG Wireframe Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
        viewBox="0 0 1000 1000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M-50,400 L 250,400 L 350,200 L 650,200 L 750,500 L 1100,500"
          stroke="black"
          strokeWidth="2"
        />
        <circle cx="350" cy="200" r="3" fill="black" />
        <circle cx="650" cy="200" r="3" fill="black" />
      </svg>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <h1 className="text-[10vw] md:text-[6vw] font-bold tracking-tighter text-black uppercase">
          Nothing2Real
        </h1>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-[1px] bg-black/10 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-black origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase opacity-50">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}