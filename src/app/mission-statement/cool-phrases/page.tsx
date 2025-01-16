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
  const [isPhraseVisible, setIsPhraseVisible] = useState<boolean[]>([true, true, true]);

  // Fetch phrases from API
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
      const fetchedPhrases = await fetchPhrases();
      setPhrases(fetchedPhrases);

      // Initialize visible phrases with the first three or empty strings
      setVisiblePhrases(fetchedPhrases.slice(0, 3) || []);
    };

    loadPhrases();
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

  // Randomly fade phrases in and out
  useEffect(() => {
    if (phrases.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 3);

      // Fade out the selected phrase
      setIsPhraseVisible((prev) => {
        const updatedVisibility = [...prev];
        updatedVisibility[randomIndex] = false;
        return updatedVisibility;
      });

      // After fading out, replace with a random unique phrase
      setTimeout(() => {
        setVisiblePhrases((prev) => {
          const availableIndices = phrases
            .map((_, i) => i)
            .filter((index) => !prev.includes(phrases[index])); // Exclude currently visible phrases

          const shuffledAvailable = shuffleArray(availableIndices);
          const updatedPhrases = [...prev];

          if (shuffledAvailable.length > 0) {
            updatedPhrases[randomIndex] = phrases[shuffledAvailable[0]];
          } else {
            updatedPhrases[randomIndex] =
              phrases[(phrases.indexOf(prev[randomIndex]) + 1) % phrases.length]; // Fallback
          }

          return updatedPhrases;
        });

        // Fade the phrase back in
        setIsPhraseVisible((prev) => {
          const updatedVisibility = [...prev];
          updatedVisibility[randomIndex] = true;
          return updatedVisibility;
        });
      }, 1000); // Match fade-out duration
    }, 3000); // Cycle every 3 seconds

    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className={`flex flex-col h-full w-full ${inter.className}`} style={{ fontSize: '7vh' }}>
        {visiblePhrases.map((phrase, idx) => (
          <div
            key={idx}
            className="flex-1 flex items-center justify-center"
            style={{
              transition: 'opacity 1s',
              opacity: isPhraseVisible[idx] ? 1 : 0,
            }}
          >
            {phrase}
          </div>
        ))}
      </div>
    </main>
  );
}
