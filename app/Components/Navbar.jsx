"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HoverText from "./HoverText";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const router = useTransitionRouter();
  const lineRefs = useRef([]);
  const mail = useRef(null);
  const lineMail = useRef(null);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const button2 = useRef(null);
  const hoverFill2 = useRef(null);
  const textHover2 = useRef(null);
  const arrow2 = useRef(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Studio", href: "/studio" },
    { name: "Project", href: "/project" },
    { name: "Process", href: "/process" },
  ];

  // ✅ Smooth 60fps animation using will-change and GPU acceleration
  useEffect(() => {
    if (!navRef.current) return;

    navRef.current.style.willChange = "clip-path, transform, opacity";
    gsap.set(".textN", { willChange: "transform, opacity" });

    if (menuOpen) {
      gsap.to(navRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "power4.inOut",
        pointerEvents: "auto",
        force3D: true,
      });

      gsap.fromTo(
        ".textN",
        { y: 300, opacity: 1, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.8,
        }
      );
    } else {
      gsap.to(navRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "power3.inOut",
        pointerEvents: "none",
        force3D: true,
      });
    }
  }, [menuOpen]);

  // ✅ Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Stop scroll
    } else {
      document.body.style.overflow = ""; // Restore scroll
    }
  }, [menuOpen]);


  // ✅ Button hover fill (GPU accelerated)
  useGSAP(() => {
    const btn = button2.current;
    const dot = hoverFill2.current;
    const arrowEl = arrow2.current;

    gsap.set(dot, { width: 0, height: 0, scale: 0, transformOrigin: "center center", willChange: "transform", force3D: true });

    const moveHandler = (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(dot, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.3,
        ease: "power3.out",
        force3D: true,
      });
    };

    const enterHandler = () => {
      gsap.to(dot, { width: 50, height: 50, scale: 10, duration: 1.3, ease: "power4.out", force3D: true });
      gsap.to(arrowEl, { x: 10, duration: 0.4, ease: "power4.out" });
    };

    const leaveHandler = () => {
      gsap.to(dot, { width: 0, height: 0, scale: 0, duration: 0.9, ease: "power4.inOut", force3D: true });
      gsap.to(arrowEl, { x: 0, duration: 0.4, ease: "power4.inOut" });
    };

    btn.addEventListener("mousemove", moveHandler);
    btn.addEventListener("mouseenter", enterHandler);
    btn.addEventListener("mouseleave", leaveHandler);

    return () => {
      btn.removeEventListener("mousemove", moveHandler);
      btn.removeEventListener("mouseenter", enterHandler);
      btn.removeEventListener("mouseleave", leaveHandler);
    };
  }, []);


  const freezeScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.dataset.scrollY = scrollY;
  };

  const unfreezeScroll = () => {
    const scrollY = document.body.dataset.scrollY;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, parseInt(scrollY || "0"));
  };

  useEffect(() => {
    menuOpen ? freezeScroll() : unfreezeScroll();
  }, [menuOpen]);



  useEffect(() => {
    document.fonts.ready.then(() => {
    });
  }, []);



  return (
    <>
      {/* ✅ Fullscreen Menu Overlay */}
      <div
        ref={navRef}
        className="w-screen h-full fixed top-0 left-0  flex-col  p-[2vw] backdrop-blur-sm text-white z-40 flex items-start justify-start"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          pointerEvents: "none",
        }}
      >
        <div className="w-full h-[70%] flex flex-col bg-black mt-[15vw] md:mt-[3vw] rounded p-[2vw]">

          <div
            style={{ fontStretch: "75%" }}
            className="md:w-1/2 h-full flex-col  flex items-start mx-[5vw] md:mx-[2vw] font-[PPNeueMontreal] font-bold uppercase  xl:text-[3vw] xl:leading-[3vw] text-[9vw] leading-[10.5vw] md:text-[8vw] md:leading-[7.5vw] lg:text-[7vw] lg:leading-[6.5vw] space-y-2  justify-center "
          >
            {links.map((link, i) => (
              <div
                key={link.name}
                className="relative tracking-tight overflow-hidden group cursor-pointer"

              >
                <HoverText>
                  <h1 className="overflow-hidden ">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        router.push(link.href, { onTransitionReady: pageAnimation });
                      }}
                      href={link.href}
                      className="block overflow-hidden textN relative"
                    >
                      {link.name}
                    </a>
                  </h1>
                </HoverText>
              </div>
            ))}
          </div>
          <div className="mt-[6vw] md:mt-[3vw] text-[4vw] font-[PPNeueMontreal] font-semibold md:text-[1.2vw]  px-[2vw] tracking-tight text-gray-300 space-y-2">
            <p className="opacity-80">Get in Touch</p>
            <div className="flex gap-5 overflow-hidden  group uppercase dm-mono-medium">
              <div className="overflow-hidden">
                <a href="mailto:hello@nrstudios.in" className="hover:text-white textN transition">hello@nrstudios.in</a>
              </div>
              <div className="overflow-hidden">
                <a href="https://instagram.com/nrstudios" target="_blank" className="hover:text-white textN transition">Instagram</a>
              </div>
              <div className="overflow-hidden">
                <a href="https://dribbble.com/nrstudios" target="_blank" className="hover:text-white textN transition">Dribbble</a>
              </div>
              <div className="overflow-hidden">
                <a href="https://linkedin.com/company/nrstudios" target="_blank" className="hover:text-white textN transition">LinkedIn</a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ✅ Top Navbar */}
      <div
        style={{ fontFamily: "MyFont2" }}
        className="w-full fixed top-0 text-white mix-blend-difference left-0 p-5 md:px-[2vw] xl:px-[2vw] z-50 "
      >
        <div className="flex justify-between items-center border-b pb-1">
          <div
            style={{ fontStretch: "75%" }}
            className="overflow-hidden text-[5vw] uppercase font-[dbsharp] font-semibold sm:text-[3vw] text-white xl:text-[1.5vw] xl:leading-[1.5vw]"
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                router.push("/", { onTransitionReady: pageAnimation });
              }}
              href="/"
            >
              <HoverText>
                <h1>NR.Studio©</h1>
              </HoverText>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center gap-5">
            <div

              style={{ fontStretch: "75%" }}
              className="relative overflow-hidden md:block hidden xl:text-[1.5vw] xl:leading-[1.5vw] font-semibold font-[dbsharp]" >
              <HoverText>
                <h1>HELLO@NRSTUDIOS.IN</h1>
              </HoverText>
              <span ref={lineMail} className="absolute left-0 bottom-0 h-[0.1vw] bg-white w-full origin-left scale-x-0" ></span>
            </div>
            <div className="overflow-hidden button">
              <button

                className="relative cursor-pointer w-[100px] h-[35px] md:w-[140px] tracking-tighter flex items-center justify-center md:h-[41px] border border-white rounded-full font-[dbsharp] font-semibold overflow-hidden uppercase tracking-wider" >
                {menuOpen ? "Close" : "Contact Us"}{" "}
                <ArrowRight ref={arrow2} strokeWidth={2} className="-rotate-45" />{" "}
              </button>
            </div>
            <div className="overflow-hidden button">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                ref={button2}
                className="relative cursor-pointer w-[100px] h-[35px] md:w-[120px] md:h-[41px] border border-white rounded-full font-[dbsharp] font-semibold overflow-hidden uppercase tracking-wider" >
                <span ref={hoverFill2} className="absolute w-[30px] h-[30px] bg-white inset-0 rounded-full will-change-transform scale-0"></span>
                <span ref={textHover2} className="relative z-10 text-[4vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1vw] text-white flex items-center justify-center gap-3 mix-blend-difference" >
                  {menuOpen ? "Close" : "Menu"}{" "}
                  <ArrowRight ref={arrow2} strokeWidth={2} className="-rotate-45" />{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Page transition animation
const pageAnimation = () => {
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.9, scale: 1, transform: "translateY(-30%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      { scale: 1, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { scale: 1, clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default Navbar;
