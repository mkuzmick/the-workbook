'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import SplashCursorInvisible from '@/components/reactbits/SplashCursor/SplashCursorInvisible';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

// Example list from your third page
const academicDisciplines = [
  'Taylor Swift Studies',
  'Cat Studies',
  'Pencil Studies',
  'Warrior Cats',
  'History of Salt',
  'The History of the Color Blue',
  'Chocolateology',
  'Unicorn Mythology',
  'Meme History',
];

// Helper to pick random discipline
const getRandomDiscipline = (): string => {
  return academicDisciplines[Math.floor(Math.random() * academicDisciplines.length)];
};

export default function MergedPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [words, setWords] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
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

  const fetchWords = useCallback(async (): Promise<string[]> => {
    try {
      const discipline = getRandomDiscipline();
      const res = await fetch('/api/openai/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: discipline }),
      });
      if (!res.ok) {
        throw new Error(`API call failed with status ${res.status}`);
      }
      const data = await res.json();
      return data.words || [];
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }, []);

  const updateWords = useCallback(async () => {
    // Fetch data first
    const newWords = await fetchWords();

    // Fade out old words
    setIsVisible(false);

    // Wait for fade-out to complete before updating words and starting fade-in
    setTimeout(() => {
      setWords(newWords); // Update words
      setIsVisible(true); // Start fade-in
    }, 300); // Match transition duration
  }, [fetchWords]);

  useEffect(() => {
    updateWords();
    const interval = setInterval(updateWords, 15000);
    return () => clearInterval(interval);
  }, [updateWords]);

  return (
    <div ref={containerRef} className="cursor-none">
      <div
        className="absolute top-4 right-4 z-50"
        onMouseEnter={() => isFullscreen && setShowFullscreenButton(true)}
        onMouseLeave={() => isFullscreen && setShowFullscreenButton(false)}
      >
        <button
          onClick={toggleFullscreen}
          className={`bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-opacity duration-300 
            ${showFullscreenButton ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
        </button>
      </div>

      <div className="relative w-full h-screen overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 bg-black z-0" />

        <div className="absolute inset-0 z-10">
          <SplashCursorInvisible />
        </div>

        <div className="relative z-20 flex flex-col items-start justify-center h-full text-white">
          <div
            className={`transition-opacity ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } flex flex-col justify-center items-start ${inter.className} font-extrabold leading-tight`}
            style={{
              transitionDuration: '300ms', // Smooth transition timing
              fontSize: '5vh', // Dynamic font size for 15 words
              lineHeight: '1.2',
              textAlign: 'left',
              padding: '0 1rem',
            }}
          >
            {words.map((word, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {word}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        :fullscreen, :-webkit-full-screen, :-moz-full-screen {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}
