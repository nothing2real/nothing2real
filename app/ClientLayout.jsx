"use client";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Preloader from "./Components/Preloader";

export default function ClientLayout({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === "complete" || document.readyState === "interactive") {
      handleLoad();
    } else {
      window.addEventListener("DOMContentLoaded", handleLoad);
    }

    return () => window.removeEventListener("DOMContentLoaded", handleLoad);
  }, []);

  return (
    <>
      {!isLoaded && <Preloader />}
      {isLoaded && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}
