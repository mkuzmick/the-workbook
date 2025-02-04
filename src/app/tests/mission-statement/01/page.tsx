"use client"; 

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import SplashCursorZibb from "@/components/reactbits/SplashCursor/SplashCursorZibb";

const missionStatements = [
  "At the Derek Bok Center for Teaching and Learning, we believe that transformative teaching fosters leadership and societal advancement.",
  "The Derek Bok Center champions the power of a liberal arts and sciences education to shape engaged, reflective citizen-leaders.",
  "By fostering diverse collaborations and modeling cutting-edge teaching practices, we enable Harvard’s educators and students to thrive.",
  "Rooted in a legacy of excellence, we serve as a dynamic wellspring for innovative, active, and experiential learning.",
  "Our mission is to galvanize the teaching community by promoting immersive and practical educational experiences for the age of AI."
];

const bigWords = [
  "Community",
  "Connecting",
  "Cartographers",
  "Making",
  "Creating",
  "Collaborating",
  "Experimenting",
  "Dynamic",
  "Assessment"
];

function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % missionStatements.length);
    }, 5000); 

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
function BigWord() {
    const [word, setWord] = useState(bigWords[0]); // Default word to avoid SSR mismatch
  
    useEffect(() => {
      // Set a random word only after hydration
      setWord(bigWords[Math.floor(Math.random() * bigWords.length)]);
  
      const interval = setInterval(() => {
        setWord(bigWords[Math.floor(Math.random() * bigWords.length)]);
      }, 6000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="absolute top-1/3 w-full text-center">
        <h1 className="text-white font-inter font-black text-6xl md:text-8xl 2xl:text-9xl transition-opacity duration-700">
          {word}
        </h1>
      </div>
    );
  }
  

export default function Page() {
  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 z-10">
          <SplashCursorZibb />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          {/* BIG WORD - Rotates Randomly */}
          <BigWord />

          {/* Rotating mission statements */}
          <RotatingText />

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

      <footer className="py-4 bg-black text-white mt-8">
        <div className="flex justify-center gap-8">
          <h3>footer later</h3>
        </div>
      </footer>

      <div className="min-h-screen" />
    </div>
  );
}
