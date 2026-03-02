"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function RealtimePreloader({ onComplete, onStartExit }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Split text for high-end stagger
    const textElement = textRef.current;
    const content = "NOTHINGREAL";
    textElement.innerHTML = content
      .split("")
      .map(char => `<span class="char inline-block translate-y-[110%] italic">${char}</span>`)
      .join("");

    // 1. Entrance Stagger
    gsap.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.2,
      duration: 1,
      ease: "expo.out"
    });

    // 2. Real-time Monitoring
    let progressValue = 0;
    const update = () => {
      const isReady = document.readyState === "complete";
      const increment = isReady ? 1.5 : 0.3;

      if (progressValue < 100) {
        progressValue = Math.min(progressValue + increment, 100);
        setProgress(Math.floor(progressValue));
        requestAnimationFrame(update);
      } else {
        document.fonts.ready.then(() => startExitSequence());
      }
    };

    update();
  }, []);

  const startExitSequence = () => {
    // Notify layout to start showing the Navbar/Content behind the scenes
    if (onStartExit) onStartExit();

    const tl = gsap.timeline({
      onComplete: () => onComplete && onComplete()
    });

    tl.to(".char", {
      y: "-110%",
      stagger: 0.03,
      duration: 0.8,
      ease: "expo.in"
    })
    .to(containerRef.current, {
      clipPath: "inset(0 0 100% 0)", // Sophisticated shutter reveal
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.4");
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#080808] text-white overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <h1 ref={textRef} className="text-[12vw] font-black tracking-tighter leading-none" />
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-[10px] tracking-[0.5em] text-white uppercase">
        Loading.... : {progress}%
      </div>

      {/* Aesthetic Thin Line */}
      <div 
        className="absolute bottom-0 left-0 h-[1px] bg-blue-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}