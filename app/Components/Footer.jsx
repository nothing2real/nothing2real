"use client";
import { images } from "@/public/assets/assets";
import React from "react";
import HoverText from "./HoverText";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextY from "./TextY";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const router = useTransitionRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Studio", href: "/studio" },
    { name: "Project", href: "/project" },
    { name: "Process", href: "/process" },
  ];

  useGSAP(() => {
    gsap.set(".image", {
      scale: 1.3,
    });

    const charSplit = new SplitText(".textf", {
      type: "chars",
      charsClass: "char",
    });

    charSplit.chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("inline-block", "overflow-hidden");
      char.parentNode.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    gsap.from(charSplit.chars, {
      x: -80,
      opacity: 0,
      delay: 0.7,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
      force3D:true,
      scrollTrigger:{
        start:"top 80%",
        trigger:".footer",
        
      }

    });
  });


  const handleNavigate = (e, href) => {
    e.preventDefault();
    // Animate out
    pageAnimation();

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Route transition
    router.push(href, { onTransitionReady: pageAnimation });
  };

  return (
    <footer className="w-full footer h-full overflow-hidden bg-white py-[2vw] px-[5vw] md:px-[2vw] ">
      <div className="grid md:grid-cols-12 grid-cols-1 pt-[5vw] gap-4 md:mt-[10vw] border-t border-black/70 xl:mt-[2vw] md:pt-[2vw] mt-[2vw]">
        {/* Left Logo */}

        <div className="overflow-hidden font-[PPNeueMontreal] font-bold md:col-start-1 md:col-span-8 xl:text-[2.5vw] xl:leading-[2.5vw] lg:text-[12vw] md:text-[14vw] text-[6vw] leading-[6vw]  text-black/60 ">
          <TextY>
            <p>
              Let’s start our conversation to transform your
              &nbsp;
              <span className="text-black">Nothing</span> vision into &nbsp;
              <span className="text-black">Real</span> revolutionary ideas that feel inevitable*
            </p>
          </TextY>
        </div>

        {/* Footer Title */}
        <div className="overflow-hidden textf font-[PPNeueMontreal] font-semibold md:col-start-1 col-span-7 tracking-tight  xl:text-[10vw] lg:text-[12vw] md:text-[14vw] text-[15vw] uppercase text-black ">
          <div className="overflow-hidden">
            <h1>NR.Studio</h1>
          </div>
        </div>
        {/* Right Info / Acknowledgement */}
        <div className="md:col-start-10 md:col-span-3 flex flex-col justify-between text-black font-[PPNeueMontreal] mt-[3vw] md:mt-0">
          <div>
            <h1 className="font-bold xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] text-[3.vw] uppercase mb-2">
              (Acknowledgement)
            </h1>
            <TextY>
              <p className="text-[3vw] md:text-[1vw] leading-tight font-semibold text-black/70">
                Built with dedication by the <span className="font-bold text-black">NR Studio</span> team —
                turning every vision into a crafted digital experience. Special thanks
                to our early supporters and collaborators for believing in our journey.
              </p>
            </TextY>
          </div>

          <div className="mt-[3vw]">
            <h1 className="font-bold xl:text-[1vw] mb-2">(Contact)</h1>
            <p className="text-[3vw] md:text-[1vw] text-black/70">
              info@nrstudio.design <br />
              Hyderabad, India
            </p>
          </div>
        </div>
      </div>



      {/* Bottom Line */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center  text-black/50 text-[3vw] md:text-[0.9vw] font-bold font-[PPNeueMontreal]">
        <p>© {new Date().getFullYear()} NR Studio. All rights reserved.</p>
        <p>Designed & Developed by NR Studio Team</p>
      </div>
    </footer>
  );
};

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
      {
        scale: 1,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        scale: 1,
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default Footer;
