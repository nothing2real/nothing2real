"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HoverText = ({
  children,
  duration = 0.5,
  stagger = 0.015,
  hover = true,
  className = "",
}) => {
  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Split words into spans
      const split1 = new SplitText(textRef.current, {
        type: "words",
        wordsClass: "split-word",
      });
      const split2 = new SplitText(text2Ref.current, {
        type: "words",
        wordsClass: "split-word",
      });

      // Ensure each span is styled properly
      gsap.set(".split-word", {
        display: "inline-block",
        marginRight: "0.4em", // spacing between words
        whiteSpace: "pre",
      });

      // Initial state
      gsap.set(split1.words, { yPercent: 0, opacity: 1 });
      gsap.set(split2.words, { yPercent: 100, opacity: 1 });

      if (!hover) return;

      // Hover animations
      boxRef.current.onmouseenter = () => {
        gsap.to(split1.words, {
          yPercent: -100,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.inOut",
        });
        gsap.to(split2.words, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.inOut",
        });
      };

      boxRef.current.onmouseleave = () => {
        gsap.to(split1.words, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.inOut",
        });
        gsap.to(split2.words, {
          yPercent: 100,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.inOut",
        });
      };
    });
  }, []);

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        ref={boxRef}
        className="relative cursor-pointer flex flex-col items-center overflow-hidden justify-center"
      >
        <div ref={textRef} className="absolute">
          {children}
        </div>

        <div ref={text2Ref}>{children}</div>
      </div>
    </div>
  );
};

export default HoverText;
