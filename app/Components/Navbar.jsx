"use client"
import React from 'react';
import StaggeredMenu from './StaggeredMenu';
import CardNav from './utils/CardNav';
// 1. Imports must be at the very top

const Navbar = () => {
  // 2. Define your data/logic outside the return statement
  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Home", href: "/" },
        { label: "Process", href: "/process" }
      ]
    },
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Our Studio", href: "/studio" },
        { label: "Projects", href: "/project" }
      ]
    },
    {
      label: "Process",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Our Process", href: "/process" },
      ]
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", href: "/project" },
        { label: "Case Studies", href: "/projects/case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", href: "/contact" },
        { label: "Twitter", href: "/twitter" }
      ]
    }
  ];

  return (
    // 3. Keep the JSX clean
    <nav className="fixed top-0 left-0 w-full z-[10]">
      <CardNav
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        theme="light"
      />
    </nav>
  );
};

export default Navbar;