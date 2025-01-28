'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import SplashCursorInvisible from '@/components/reactbits/SplashCursor/SplashCursorInvisible';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      containerRef.current?.requestFullscreen();
      setShowFullscreenButton(false); // Hide button once you first go fullscreen
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      // Show the button again whenever fullscreen is exited
      if (!isNowFullscreen) {
        setShowFullscreenButton(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className='cursor-none'>
      {/* The main container that you want to toggle in/out of fullscreen */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden pointer-events-auto cursor-none"
      >
        {/* Fullscreen toggle button in top-right corner */}
        <div
          className="absolute top-4 right-4 z-50"
          onMouseEnter={() => isFullscreen && setShowFullscreenButton(true)}
          onMouseLeave={() => isFullscreen && setShowFullscreenButton(false)}
        >
          <button
            onClick={toggleFullscreen}
            className={`bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-opacity duration-300 ${
              showFullscreenButton ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
          </button>
        </div>

        {/* 1) Solid black background layer */}
        <div className="absolute inset-0 bg-black z-0" />

        {/* 2) Fluid simulation above background, behind text */}
        <div className="absolute inset-0 z-10">
          <SplashCursorInvisible />
        </div>

        {/* 3) Hero text content on top */}
    
      </div>

    </div>
  );
}
