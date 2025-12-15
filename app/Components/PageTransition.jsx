"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;

    // Start with hiding content
    setShowContent(false);

    // GSAP timeline for transition
    const tl = gsap.timeline({
      onComplete: () => {
        // After animation complete, show children
        setShowContent(true);
      },
    });

    tl.to(overlay, {
      y: "0%",
      duration: 1.4,
      ease: "power4.inOut",
    }).to(overlay, {
      y: "-100%",
      duration: 1,
      delay: 0.1,
      ease: "power4.inOut",
    }).set(overlay, { y: "100%" }); // reset for next transition

  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[9999] translate-y-full"
      ></div>

      {/* Page content */}
      {showContent && <div className="min-h-screen">{children}</div>}
    </>
  );
}
