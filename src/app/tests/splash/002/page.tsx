'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';
import SplashCursorZibb from '@/components/reactbits/SplashCursor/SplashCursorZibb';

const SamplePreBlock = () => {
  const chartColors = {
    chart: {
      '1': 'hsl(var(--chart-1))',
      '2': 'hsl(var(--chart-2))',
      '3': 'hsl(var(--chart-3))',
      '4': 'hsl(var(--chart-4))',
      '5': 'hsl(var(--chart-5))',
    },
  };

  return (
    <div className="relative bg-black/30 z-30 backdrop-blur-xl">
      <pre>{JSON.stringify(chartColors, null, 4)}</pre>
    </div>
  );
};

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
    <div>
      {/* The main container that you want to toggle in/out of fullscreen */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden pointer-events-auto"
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
          <SplashCursorZibb />
        </div>

        {/* 3) Hero text content on top */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-8xl font-black drop-shadow-deep">The Workbook</h1>
          <p className="text-base md:text-lg mt-4 text-center">
            the place to get some work done in 2025
          </p>

          {/* Scroll-down arrow */}
          <div className="absolute bottom-8">
            <a
              href="#links"
              className="text-white animate-bounce transition-transform duration-2000 hover:scale-110 flex justify-center items-center"
            >
              <BsChevronDown size={32} className="transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <section
        id="links"
        className="relative z-30 py-16 text-white border-t-slate-700 border-t-2 bg-black cursor-auto"
      >
        <nav className="flex flex-col items-center gap-4">
          <Link href="/about" className="text-white hover:underline">about</Link>
          <Link href="/tests" className="text-white hover:underline">tests</Link>
          <Link href="/zk" className="text-white hover:underline">zk</Link>
          <Link href="/docs" className="text-white hover:underline">docs</Link>
          <Link href="/openai" className="text-white hover:underline">openai</Link>
          <Link href="/anthropic" className="text-white hover:underline">anthropic</Link>
          <Link href="/gemini" className="text-white hover:underline">gemini</Link>
          <Link href="/bard" className="text-white hover:underline">bard</Link>
          <Link href="/palm" className="text-white hover:underline">palm</Link>
          <Link href="/cohere" className="text-white hover:underline">cohere</Link>
        </nav>
      </section>

      <SamplePreBlock />

      {/* Footer */}
      <footer className="py-4 bg-black text-white">
        <div className="flex justify-center gap-8">
          {/* Footer Links */}
          <h3>footer later</h3>
        </div>
      </footer>

      <div className="min-h-screen" />
    </div>
  );
}
