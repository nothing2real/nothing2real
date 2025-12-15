"use client"
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt,loading }) => {
  const imageRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis if it doesn't exist
  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 3,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time) => {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }, []);

  // Update bounds on mount and resize
  useEffect(() => {
    const updateBounds = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      bounds.current = {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      };
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Parallax animation
  useEffect(() => {
    const animate = () => {
      currentTranslateY.current = lerp(
        currentTranslateY.current,
        targetTranslateY.current,
        0.1
      );

      if (
        Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01 &&
        imageRef.current
      ) {
        imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Listen to Lenis scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bounds.current || !lenisRef.current) return;
      const relativeScroll = lenisRef.current.scroll - bounds.current.top;
      targetTranslateY.current = relativeScroll * 0.13; // parallax strength
    };

    lenisRef.current?.on("scroll", handleScroll);

    return () => {
      lenisRef.current?.off("scroll", handleScroll);
    };
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      ref={imageRef}
      loading="lazy"
      className="will-change-transform translate-y-0 scale-[1.1]"
    />
  );
};

export default ParallaxImage;
