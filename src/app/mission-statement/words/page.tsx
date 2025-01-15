'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  
  // lineIndices[i] = index in `words` for the i-th line
  const [lineIndices, setLineIndices] = useState<number[]>([]);
  
  // isLineVisible[i] = whether the i-th line is currently visible (for fade in/out)
  const [isLineVisible, setIsLineVisible] = useState<boolean[]>(
    Array(10).fill(true)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch words from your API
  const fetchWords = async (): Promise<string[]> => {
    try {
      const res = await fetch('/api/mission-statement/words');
      if (!res.ok) throw new Error(`API call failed: ${res.status}`);
      const data = await res.json();
      return data.words || [];
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  };

  // Generate N unique random indices within [0..length-1]
  const getRandomIndices = (length: number, count: number): number[] => {
    const indices = new Set<number>();
    while (indices.size < count && length > 0) {
      indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
  };

  // 1) On mount, fetch words and initialize the 10 visible lines
  useEffect(() => {
    const updateWords = async () => {
      const newWords = await fetchWords();
      if (newWords.length) {
        setWords(newWords);
        // Initialize lineIndices with 10 unique random indices from the newWords array
        setLineIndices(getRandomIndices(newWords.length, 10));
        // Reset all lines to be visible
        setIsLineVisible(Array(10).fill(true));
      }
    };

    updateWords();
    // Optionally re-fetch every 15 seconds
    const interval = setInterval(updateWords, 15000);
    return () => clearInterval(interval);
  }, []);

  // 2) Once we have words and lineIndices, change one line at a time
  useEffect(() => {
    if (words.length === 0 || lineIndices.length < 10) return;

    // This interval picks ONE line every X seconds to fade out,
    // then replaces that line's word, then fades back in.
    const intervalId = setInterval(() => {
      // Pick a random line 0..9
      const randomLine = Math.floor(Math.random() * 10);

      // Step A: Fade out that line
      setIsLineVisible((prev) => {
        const newVisible = [...prev];
        newVisible[randomLine] = false;
        return newVisible;
      });

      // Step B: After fade-out transition completes, pick a new word
      // and fade back in. Adjust timing to match your CSS transition.
      setTimeout(() => {
        setLineIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          // Pick a new random index for this line; ensure it's not
          // already in newIndices to avoid duplicates, if desired
          let newWordIndex: number;
          do {
            newWordIndex = Math.floor(Math.random() * words.length);
          } while (newIndices.includes(newWordIndex) && words.length >= 10);

          newIndices[randomLine] = newWordIndex;
          return newIndices;
        });

        // Fade back in
        setIsLineVisible((prev) => {
          const newVisible = [...prev];
          newVisible[randomLine] = true;
          return newVisible;
        });
      }, 1000); // match the fade-out duration
    }, 3000); // pick your desired interval for changing lines

    return () => clearInterval(intervalId);
  }, [words, lineIndices]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black flex flex-col justify-start relative"
    >
      {/* Toggle Fullscreen Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => containerRef.current?.requestFullscreen()}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-opacity duration-300"
        >
          Toggle Fullscreen
        </button>
      </div>

      {/* 10 lines */}
      <div className="w-full h-full flex flex-col">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center"
            style={{
              // Each row is ~1/10th of the viewport height
              height: '10vh',
              // We'll rely on the transition to fade in/out
              transition: 'opacity 1s',
              opacity: isLineVisible[idx] ? 1 : 0,
            }}
          >
            <p
              className={`${inter.className} text-white font-extrabold`}
              style={{
                // Make the text size proportional to the row height
                fontSize: '10vh',
                lineHeight: '1em',
              }}
            >
              {words[lineIndices[idx]] ?? ''}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
