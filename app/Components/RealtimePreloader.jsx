// components/RealtimePreloader.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function RealtimePreloader({ 
  minLoadTime = 2000,
  reloadThreshold = 300000 // 5 minutes default
}) {
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [browserUsageTime, setBrowserUsageTime] = useState(0);
  const router = useRouter();

  // Track browser usage time
  useEffect(() => {
    let startTime = Date.now();
    let intervalId;

    const updateUsageTime = () => {
      const currentTime = Date.now();
      const usageTime = currentTime - startTime;
      setBrowserUsageTime(usageTime);

      // Check if we should reload based on usage time
      if (usageTime >= reloadThreshold) {
        console.log(`Browser used for ${usageTime}ms, triggering reload...`);
        handleReload();
      }
    };

    // Update every second
    intervalId = setInterval(updateUsageTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [reloadThreshold]);

  // Handle the reload logic
  const handleReload = () => {
    // You can choose to either:
    // 1. Force a full page reload
    // window.location.reload();
    
    // 2. Or do a Next.js router refresh (better for SPA)
    router.refresh();
    
    // 3. Or redirect to home
    // router.push('/');
  };

  useEffect(() => {
    if (!textRef.current || !progressRef.current) return;

    // Reset animation
    gsap.set(textRef.current, {
      backgroundSize: '0% 100%',
      backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      backgroundRepeat: 'no-repeat',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    });

    // Create animation timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onUpdate: () => {
        if (progressRef.current) {
          const progress = tl.progress() * 100;
          setProgress(Math.round(progress));
        }
      },
      onComplete: () => {
        // Wait for minimum load time
        setTimeout(() => {
          setIsVisible(false);
        }, minLoadTime - 2000); // Subtract animation duration
      }
    });

    // Animate text background fill
    tl.to(textRef.current, {
      backgroundSize: '100% 100%',
      duration: 2,
    })
    // Optional: Add text reveal effect
    .fromTo(textRef.current,
      { opacity: 0.5 },
      { opacity: 1, duration: 0.5 },
      '-=1.5'
    );

    return () => {
      tl.kill();
    };
  }, [minLoadTime]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Main animated text */}
      <div className="relative">
        <div
          ref={textRef}
          className="text-6xl md:text-8xl font-bold tracking-tighter"
          style={{
            backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            backgroundSize: '0% 100%',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          NOTHINGREAL
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 blur-2xl opacity-30"
          style={{
            backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="mt-12 w-64 md:w-96">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Loading...</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Browser usage indicator */}
      <div className="mt-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Browser active for: {Math.floor(browserUsageTime / 1000)}s</span>
        </div>
        {browserUsageTime >= reloadThreshold && (
          <div className="mt-2 text-amber-400 text-xs animate-pulse">
            Reloading due to extended usage...
          </div>
        )}
      </div>

      {/* Reload trigger button (optional, for testing) */}
      <button
        onClick={handleReload}
        className="mt-6 px-4 py-2 text-xs text-gray-400 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
      >
        Manual Reload
      </button>
    </div>
  );
}