'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import SplashCursorInvisible from '@/components/reactbits/SplashCursor/SplashCursorInvisible';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

const academicDisciplines = [
  'Taylor Swift Studies',
  'Cat Studies',
  'Chocolateology',
  'Meme History',
  'Goblin Mode Theory',
  'The Semiotics of Side-Eye',
  'Bubble Wrap Physics',
  'The Anthropology of Emojis',
  'Artificial Stupidity Studies',
  'Quantum Clown Theory',
  'The Sociology of Fandom Feuds',
  'Cursed Image Analysis',
  'Nostalgia Studies: 2007 Edition',
  'The History of the Vine Boom Sound Effect',
];

const rainbowColors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-blue-500',
  'text-indigo-500',
  'text-violet-500',
];

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<string[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<boolean[]>(Array(15).fill(false));
  const [discipline, setDiscipline] = useState<string>('');
  const [showDiscipline, setShowDiscipline] = useState(false);
  const [randomColor, setRandomColor] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);

  const getRandomDiscipline = useCallback((): string => {
    return academicDisciplines[Math.floor(Math.random() * academicDisciplines.length)];
  }, []);

  const fetchWords = useCallback(async (discipline: string): Promise<string[]> => {
    try {
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
  }, []);

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
    const startSequence = async () => {
      setShowDiscipline(false);
      setVisibleIndices(Array(15).fill(false));

      const chosenDiscipline = getRandomDiscipline();
      setDiscipline(chosenDiscipline);

      const newWords = await fetchWords(chosenDiscipline);
      setWords(newWords);

      const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      setRandomColor(color);

      let index = 0;
      const revealInterval = setInterval(() => {
        setVisibleIndices((prev) => {
          const updated = [...prev];
          if (index < newWords.length) {
            updated[index] = true;
          }
          return updated;
        });
        index++;

        if (index >= newWords.length) {
          clearInterval(revealInterval);
          setTimeout(() => {
            setShowDiscipline(true);
            setTimeout(startSequence, 5000);
          }, 2000);
        }
      }, 2000);
    };

    startSequence();
  }, [fetchWords, getRandomDiscipline]);

  return (
    <main ref={containerRef} className="relative min-h-screen w-full bg-black flex flex-col items-start justify-start p-8">
      {/* Fullscreen Toggle Button */}
      <div
        className="absolute top-4 right-4 z-50"
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

      {/* Splash Cursor in the Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SplashCursorInvisible />
      </div>

      {/* Words Display (Foreground) */}
      <div className="relative z-10 flex flex-col">
        {words.map((word, idx) => (
          <p
            key={idx}
            className={`${inter.className} text-white font-extrabold transition-opacity duration-[2000ms]`}
            style={{
              fontSize: '5vh',
              lineHeight: '1.1em',
              margin: 0,
              opacity: visibleIndices[idx] ? 1 : 0,
            }}
          >
            {word}
          </p>
        ))}

        {/* Academic discipline below words */}
        {discipline && showDiscipline && (
          <p
            className={`${randomColor} ${inter.className} font-extrabold transition-opacity duration-1000`}
            style={{
              fontSize: '5vh',
              lineHeight: '1.1em',
              margin: 0,
            }}
          >
            {discipline}
          </p>
        )}
      </div>

      <style jsx global>{`
        :fullscreen, :-webkit-full-screen, :-moz-full-screen {
          cursor: none !important;
        }
      `}</style>
    </main>
  );
}
