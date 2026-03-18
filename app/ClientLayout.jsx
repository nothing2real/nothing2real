"use client";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import RealtimePreloader from "./Components/RealtimePreloader";
import CustomCursor from "./Components/CustomCursor";

export default function ClientLayout({ children }) {
  const [showContent, setShowContent] = useState(false);
  const [removeLoader, setRemoveLoader] = useState(false);

  // This function is called by the Preloader when its EXIT animation is done
  const handleLoaderFinished = () => {
    setRemoveLoader(true);
  };

  // This function is called by the Preloader as soon as the EXIT animation STARTS
  const handleRevealStarted = () => {
    setShowContent(true);
  };

  return (
    <>

      {!removeLoader && (
        <RealtimePreloader
          onComplete={handleLoaderFinished}
          onStartExit={handleRevealStarted}
        />
      )}

      {/* We render the content but keep it hidden/invisible 
          until the preloader starts its exit shutter. 
      */}
      <div className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}