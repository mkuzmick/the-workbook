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
      containerRef.current?.requestFullscreen();
      setShowFullscreenButton(false);
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
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
    // Add a base "cursor-none" so it's hidden initially outside fullscreen too.
    <div className="cursor-none">
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden pointer-events-auto cursor-none"
      >
        {/* Fullscreen toggle button */}
        <div
          className="absolute top-4 right-4 z-50"
          onMouseEnter={() => isFullscreen && setShowFullscreenButton(true)}
          onMouseLeave={() => isFullscreen && setShowFullscreenButton(false)}
        >
          <button
            onClick={toggleFullscreen}
            className={`bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 
              transition-opacity duration-300
              ${showFullscreenButton ? 'opacity-100' : 'opacity-0'}
            `}
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
        {/*  ... if you had any hero text ... */}
      </div>

      {/* Global style that hides cursor in fullscreen */}
      <style jsx global>{`
        /* Force-hide cursor in fullscreen across major browsers */
        :fullscreen,
        :-webkit-full-screen,
        :-moz-full-screen {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}
