"use client"; 
// The 'use client' directive is necessary when using React state or effects in Next.js 13 app router

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

// If you have these components in your project, import them:
import SplashCursorZibb from "@/components/reactbits/SplashCursor/SplashCursorZibb";

const missionStatements = [
  "At the Derek Bok Center for Teaching and Learning, we believe that transformative teaching fosters leadership and societal advancement.",
  "The Derek Bok Center champions the power of a liberal arts and sciences education to shape engaged, reflective citizen-leaders.",
  "By fostering diverse collaborations and modeling cutting-edge teaching practices, we enable Harvard’s educators and students to thrive.",
  "Rooted in a legacy of excellence, we serve as a dynamic wellspring for innovative, active, and experiential learning.",
  "Our mission is to galvanize the teaching community by promoting immersive and practical educational experiences for the age of AI."
];
function RotatingText() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % missionStatements.length);
      }, 5000); // rotate every 5s
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-full flex items-center justify-center h-16 overflow-hidden mt-4">
        {missionStatements.map((text, index) => (
          <div
            key={index}
            className={`
              absolute max-w-[90vw] sm:max-w-[75vw] lg:max-w-[60vw] 2xl:max-w-[50vw] 
              text-center font-inter font-bold text-lg md:text-xl 4xl:text-4xl 
              transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            {text}
          </div>
        ))}
      </div>
    );
  }

// Optional: A small sample block demonstrating usage of JSON
function SamplePreBlock() {
  const chartColors = {
    chart: {
      "1": "hsl(var(--chart-1))",
      "2": "hsl(var(--chart-2))",
      "3": "hsl(var(--chart-3))",
      "4": "hsl(var(--chart-4))",
      "5": "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="relative bg-black/30 z-30 backdrop-blur-xl p-4">
      <pre>{JSON.stringify(chartColors, null, 4)}</pre>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      {/* Full-height hero container */}
      <div className="relative w-full h-screen overflow-hidden pointer-events-auto">
        {/* 1) Solid black background layer */}
        <div className="absolute inset-0 bg-black z-0" />

        {/* 2) Fluid simulation (SplashCursorZibb) above background, behind text */}
        <div className="absolute inset-0 z-10">
          <SplashCursorZibb />
        </div>

        {/* 3) Hero text content on top */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          

          {/* Rotating mission statements */}
          <RotatingText />

          {/* Scroll-down arrow */}
          <div className="absolute bottom-8">
            <a
              href="#links"
              className="text-white animate-bounce transition-transform duration-1000 hover:scale-110 flex justify-center items-center"
            >
              <BsChevronDown size={32} className="transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>


 

      {/* Footer */}
      <footer className="py-4 bg-black text-white mt-8">
        <div className="flex justify-center gap-8">
          <h3>footer later</h3>
        </div>
      </footer>

      {/* Just a spacer to show the background */}
      <div className="min-h-screen" />
    </div>
  );
}
