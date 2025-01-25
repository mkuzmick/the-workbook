'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

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
  // Add more disciplines here
];

export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomDiscipline = useCallback((): string => {
    return academicDisciplines[Math.floor(Math.random() * academicDisciplines.length)];
  }, []);

  const fetchWords = useCallback(async (): Promise<string[]> => {
    try {
      const discipline = getRandomDiscipline();
      const res = await fetch('/api/openai/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: discipline }),
      });
      if (!res.ok) throw new Error(`API call failed: ${res.status}`);
      const data = await res.json();
      return data.words || [];
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }, [getRandomDiscipline]); // Include getRandomDiscipline as a dependency

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

  useEffect(() => {
    const updateWords = async () => {
      const newWords = await fetchWords();
      if (newWords.length) {
        setIsVisible(false);
        setTimeout(() => {
          setWords(newWords);
          setIsVisible(true);
        }, 500);
      }
    };

    updateWords();
    const interval = setInterval(updateWords, 15000);
    return () => clearInterval(interval);
  }, [fetchWords]); // Add fetchWords to the dependency array

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black flex flex-col items-start justify-start relative"
    >
      <div
        className="absolute top-4 right-4"
        onMouseEnter={() => isFullscreen && setShowFullscreenButton(true)}
        onMouseLeave={() => isFullscreen && setShowFullscreenButton(false)}
      >
        <button
          onClick={toggleFullscreen}
          className={`bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-opacity duration-300 ${
            showFullscreenButton ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Toggle Fullscreen
        </button>
      </div>

      <div
        className={`transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } flex flex-col`}
        style={{ transitionDuration: '500ms', width: '100%' }}
      >
        <div
          className={`${inter.className} text-white font-extrabold leading-tight`}
          style={{
            fontSize: '5vh',
            lineHeight: '1',
            paddingLeft: '2rem',
          }}
        >
          {words.map((word, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {word}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
