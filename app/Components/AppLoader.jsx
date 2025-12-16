'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AppLoader() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let pageLoaded = false;
    let fontsLoaded = false;

    // ---------- LOAD SIGNALS ----------
    const onWindowLoad = () => {
      pageLoaded = true;
    };

    if (document.readyState === 'complete') {
      pageLoaded = true;
    } else {
      window.addEventListener('load', onWindowLoad);
    }

    // Fonts loading (VERY IMPORTANT)
    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
      });
    } else {
      fontsLoaded = true;
    }

    // ---------- RESOURCE TRACKING ----------
    const getNetworkProgress = () => {
      const entries = performance.getEntriesByType('resource');
      const pending = entries.filter(
        e => !e.responseEnd || e.responseEnd === 0
      ).length;

      return pending === 0;
    };

    // Initial text state
    if (textRef.current) {
      gsap.set(textRef.current, { backgroundSize: '0% 100%' });
    }

    const update = () => {
      const networkDone = getNetworkProgress();
      const fullyLoaded = pageLoaded && fontsLoaded && networkDone;

      if (fullyLoaded) {
        progressRef.current += (100 - progressRef.current) * 0.15;
      } else {
        progressRef.current += (90 - progressRef.current) * 0.04;
      }

      const value = Math.min(100, Math.round(progressRef.current));
      setProgress(value);

      // Sync text reveal
      if (textRef.current) {
        gsap.set(textRef.current, {
          backgroundSize: `${value}% 100%`,
        });
      }

      if (value >= 100) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => setVisible(false),
        });
        cancelAnimationFrame(rafRef.current);
        return;
      }

      rafRef.current = requestAnimationFrame(update);
    };

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black px-[2vw] font-[PPNeueMontreal]"
    >
      {/* Text */}
      <div className="relative xl:text-[8vw] text-[13vw] md:text-[10vw] tracking-tighter font-bold mb-6">
        <span className="block text-[#f0eee9]/50">NOTHINGREAL</span>
        <span
          ref={textRef}
          className="absolute inset-0 block"
          style={{
            backgroundImage: 'linear-gradient(#fff, #fff)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '0% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          NOTHINGREAL
        </span>
      </div>


      {/* Percentage */}
      <div className="absolute bottom-5 right-5 font-bold xl:text-[5vw] text-white">
        {progress}%
      </div>
    </div>
  );
}
