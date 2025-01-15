'use client';

import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

export default function CoolPhrasesPage() {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<string[]>([]);
  const [fadingIndex, setFadingIndex] = useState<number>(0);

  const fetchPhrases = async (): Promise<string[]> => {
    try {
      const res = await fetch('/api/mission-statement/cool-phrases');
      if (!res.ok) throw new Error(`API call failed: ${res.status}`);
      const data = await res.json();
      return data.phrases || [];
    } catch (error) {
      console.error('Error fetching phrases:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadPhrases = async () => {
      const newPhrases = await fetchPhrases();
      setPhrases(newPhrases);
      setVisiblePhrases(newPhrases.slice(0, 3)); // Start with the first three
    };

    loadPhrases();
  }, []);

  useEffect(() => {
    if (phrases.length < 3) return;

    const interval = setInterval(() => {
      setFadingIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 3;
        setVisiblePhrases((current) => {
          const nextPhraseIndex = (phrases.indexOf(current[prevIndex]) + 1) % phrases.length;
          const updatedPhrases = [...current];
          updatedPhrases[prevIndex] = phrases[nextPhraseIndex];
          return updatedPhrases;
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className={`relative text-center ${inter.className}`} style={{ fontSize: '10vh' }}>
        {visiblePhrases.map((phrase, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              idx === fadingIndex ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ willChange: 'opacity' }}
          >
            {phrase}
          </div>
        ))}
      </div>
    </main>
  );
}
