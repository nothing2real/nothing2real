// src/assets/assets.js
import mainbanner from "./mainbanner.jpg";
import dev from "./dev.jpg";
import { FaLinkedin, FaInstagramSquare, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";


import mockup from './MacBook_Mockup_2.jpg'
import ruthwik from './ruthwik.jpg'
import Rohith from './Rohith.jpg'
import varshit from './varshit.png'
import gopi from './Gopi.jpg'

import mainbanner1 from './mainbanner.png'
import processBanner from './processBanner.png'
import twoBanner from './twoBanner.png'
import mobileLogo from './mobileLogo.png'
import studioipad from './Studio_Ipad.png'
import feviconico from './feviconico.png'
import arrow from './Arrow_Down.png'


export const images = {
  mainbanner,
  dev,
  mockup,
  mainbanner1,
  processBanner,
  twoBanner,
  mobileLogo,
  studioipad,
  feviconico,
  arrow,
  ruthwik,
  Rohith,
  varshit,
  gopi
}


export const services = [
  {
    title: "Brand Identity",
    desc: "Crafting a complete visual identity that defines your brand’s personality, voice, and presence across all platforms.",
    features: (
      <>
        <p>•   Brand Logo</p>
        <p>•  Colors Patterns</p>
        <p>•  Brand Typography</p>
        <p>•  Poster Designs</p>
        <p>•  Banner Designs</p>
      </>
    ),
    img: mainbanner1,
  },
  {
    title: "Custom Website ",
    desc: "High-performance custom websites built with modern frameworks, advanced animations, and clean, scalable architecture.",
    features: (
      <>
        <p>•  Custom Layouts & Component Library</p>
        <p>•   GSAP / Framer Animations</p>
        <p>•  Next.js High-Performance Build</p>
        <p>•  SEO-ready Structure</p>
      </>
    ),
    img: mainbanner1,
  },
  {
    title: "Mobile-First Websites",
    desc: "Fully responsive websites designed with a mobile-first approach to ensure a seamless experience on all devices.",
    features: (
      <>
        <p>•  100% Mobile-first layouts</p>
        <p>•  Adaptive UI for all screen sizes</p>
        <p>•  High-performance optimization</p>
        <p>•  Smooth animations across devices</p>
      </>
    ),
    img: mainbanner1,
  },
  {
    title: "E-commerce ",
    desc: "Powerful e-commerce platforms designed to maximize conversions with intuitive UX, fast performance, and secure transactions.",
    features: (
      <> 
        <p>•  Product pages & category UI</p>
        <p>•  Cart, Checkout, Secure Payments</p>
        <p>•  Admin Dashboard</p>
        <p>•  Search, Filters, Recommendations</p>
        <p>•  Conversion-optimized layouts</p>
      </>
    ),
    img: mainbanner1,
  },
  {
    title: "UI / UX Design",
    desc: "User-centered design process that transforms ideas into beautiful, intuitive, and high-fidelity digital experiences.",
    features: (
      <>
        <p>•  Logo, Mockups, Colors, Typography</p>
        <p>•  Wireframes & User Flows</p>
        <p>•  High-fidelity Screens</p>
        <p>•  Interactive Prototypes</p>
        <p>•  Design System</p>
      </>
    ),
    img: mainbanner1,
  },
  {
    title: "Website Maintenance & Optimization",
    desc: "Keeping your website fast, secure, updated, and error-free with continuous improvements and performance monitoring.",
    features: (
      <>
        <p>•Speed Optimization</p>
        <p>•Security Enhancements</p>
        <p>•Bug Fixes & Cleanup</p>
        <p>•SEO & Performance Updates</p>
      </>
    ),
    img: mainbanner1,
  },
];


export const profile = [
  {
    name: "Nagaruthwik Merugu",
    role: "Director & Full Stack Developer",
    about: "Passionate Full Stack Developer and Director with a knack for crafting seamless web experiences. With expertise in both front-end and back-end technologies, I thrive on transforming ideas into functional, user-friendly applications. Committed to innovation and excellence, I lead projects that push the boundaries of technology while ensuring optimal performance and user satisfaction.",
    image: ruthwik
  },
  {
    name: "Naresh Edunuri",
    role: "UI/UX Designer ",
    about: "Creative UI/UX Designer with a keen eye for detail and a passion for enhancing user experiences. Skilled in transforming complex ideas into intuitive designs that resonate with users. Adept at collaborating with cross-functional teams to deliver visually appealing and user-centric solutions that drive engagement and satisfaction.",
    image: mainbanner1
  }, {
    name: "Rohith Dasandla",
    role: "Full Stack Developer",
    about:
      "Dedicated full-stack developer with a passion for creating innovative web solutions. Experienced in both front-end and back-end development, I excel at transforming ideas into functional applications. I am committed to continuous learning and thrive in collaborative environments where creativity and technology intersect.",
    image: Rohith
  },
  {
    name: "Varshit Bhamar",
    role: "Graphic Designer & Art Director",
    about: "Experienced Graphic Designer and Art Director with a passion for visual storytelling. Skilled in creating compelling designs that effectively communicate brand messages across various media. Adept at leading creative teams and managing projects from concept to completion, ensuring high-quality results that exceed client expectations.",
    image: varshit
  }
]


export const links = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nagaruthwikmerugu/",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/m.n.ruthwik/",
    icon: FaInstagramSquare,
  },
  {
    name: "Github",
    href: "https://github.com/ruthwik162/",
    icon: FaGithub,
  },
]

export const contact = [
  {
    name: "email",
    detail: "nagaruthwikmerugu162@gmail.com",
    icon: MdEmail,
  },
  {
    name: "mobile",
    detail: "9182216089",
    icon: CiPhone,
  },
]
