'use client';

import React, { useEffect, useState, useRef } from 'react';

// Import Inter font directly
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

// List of academic disciplines
const academicDisciplines = [
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'Computer Science',
  'Economics',
  'Psychology',
  'Philosophy',
  'Sociology',
  'Political Science',
  'Anthropology',
  'History',
  'Art History',
  'Linguistics',
  'Literature',
  'Engineering',
  'Law',
  'Medicine',
  'Environmental Science',
  'Geography',
  'Astronomy',
  'Education',
  'Business Administration',
  'Architecture',
  'Theology',
  'Statistics',
  'Music',
  'Performing Arts',
  'Archaeology',
];

export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to get a random discipline
  const getRandomDiscipline = (): string => {
    return academicDisciplines[Math.floor(Math.random() * academicDisciplines.length)];
  };

  // Fetch 12 words from your structured API route
  async function fetchWords(): Promise<string[]> {
    try {
      const discipline = getRandomDiscipline(); // Get a random discipline
      const res = await fetch('/api/openai/structured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: discipline }),
      });

      if (!res.ok) {
        throw new Error(`API call failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.refusal) {
        console.error('Refusal from OpenAI:', data.refusal);
        return [];
      }

      return data.words || [];
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const updateWords = async () => {
      // Fetch new words
      const newWords = await fetchWords();
      if (newWords.length > 0) {
        // Fade out the old words
        setIsVisible(false);

        // Wait for the fade-out transition to complete
        setTimeout(() => {
          setWords(newWords); // Update with new words
          setIsVisible(true); // Fade in new words
        }, 2000); // Match this timeout to the transition duration
      }
    };

    // Initial fetch
    updateWords();

    // Schedule updates every 10 seconds
    const intervalId = setInterval(updateWords, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen w-full bg-black flex flex-col items-start justify-start relative">
      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
      >
        Toggle Fullscreen
      </button>

      <div
        className={`transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } flex flex-col`}
        style={{ transitionDuration: '2000ms', width: '100%' }} // Inline style for custom duration
      >
        <div
          className={`${inter.className} text-white font-extrabold leading-tight`}
          style={{
            fontSize: '8.333vh', // Dynamically calculated to fit 12 words vertically
            lineHeight: '1', // Minimal spacing between lines
            paddingLeft: '2rem', // Consistent left alignment
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
