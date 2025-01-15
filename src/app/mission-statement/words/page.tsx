'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndices, setCurrentWordIndices] = useState<number[]>([]);
  const [isBoxVisible, setIsBoxVisible] = useState<boolean[]>(
    Array(15).fill(true)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch words from API once
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch('/api/mission-statement/words');
        if (!res.ok) throw new Error(`API call failed: ${res.status}`);
        const data = await res.json();
        setWords(data.words || []);

        // Assign unique indices to the initial boxes
        const uniqueIndices = Array.from(
          { length: 15 },
          (_, i) => i % (data.words?.length || 1)
        );
        setCurrentWordIndices(uniqueIndices);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchWords();
  }, []);

  // Helper function to shuffle an array
  const shuffleArray = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Cycle words one at a time
  useEffect(() => {
    if (words.length === 0) return;

    const interval = setInterval(() => {
      const randomBoxIndex = Math.floor(Math.random() * 15);

      // Fade out the word in the selected box
      setIsBoxVisible((prev) => {
        const updatedVisibility = [...prev];
        updatedVisibility[randomBoxIndex] = false;
        return updatedVisibility;
      });

      // After fade-out, replace the word with a unique random one and fade back in
      setTimeout(() => {
        setCurrentWordIndices((prev) => {
          const availableIndices = words
            .map((_, i) => i)
            .filter((index) => !prev.includes(index)); // Exclude currently visible words

          const shuffledAvailable = shuffleArray(availableIndices);
          const updatedIndices = [...prev];

          // Replace only the specific box's word with a unique one
          if (shuffledAvailable.length > 0) {
            updatedIndices[randomBoxIndex] = shuffledAvailable[0];
          } else {
            updatedIndices[randomBoxIndex] =
              (updatedIndices[randomBoxIndex] + 1) % words.length; // Fallback
          }

          return updatedIndices;
        });

        setIsBoxVisible((prev) => {
          const updatedVisibility = [...prev];
          updatedVisibility[randomBoxIndex] = true;
          return updatedVisibility;
        });
      }, 1000); // Match the fade-out duration
    }, 1000); // Cycle every second

    return () => clearInterval(interval);
  }, [words]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black flex flex-col justify-start relative"
    >
      {/* Fullscreen Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => containerRef.current?.requestFullscreen()}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-opacity duration-300"
        >
          Toggle Fullscreen
        </button>
      </div>

      {/* 15 Boxes Vertically */}
      <div className="w-full h-full flex flex-col">
        {Array.from({ length: 15 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-start justify-start px-4"
            style={{
              height: 'calc(100% / 15)', // 1/15th of the viewport height for each box
              transition: 'opacity 1s',
              opacity: isBoxVisible[idx] ? 1 : 0,
            }}
          >
            <p
              className={`${inter.className} text-white font-extrabold`}
              style={{
                fontSize: '5vh', // Adjust text size to fit smaller vertical boxes
                lineHeight: '1.2',
                textAlign: 'left',
              }}
            >
              {words[currentWordIndices[idx]] ?? ''}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}