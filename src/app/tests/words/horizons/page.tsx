'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

const projectSummaries = [
  {
    name: "Alex Braslavsky",
    title: "The Evolution of the Aging Voice",
    text: "Aging is as much a feeling as a fact of life..."
  },
  {
    name: "Andrew O'Donohue",
    title: "Courts and Democratic Backsliding",
    text: "My research compares Turkey under Erdoğan and Israel under Netanyahu..."
  },
  {
    name: "Brandon Campbell",
    title: "Cost-Effective Fluorination for Pharmaceuticals",
    text: "Fluorination is crucial for modern pharmaceuticals..."
  },
  {
    name: "Katherine Horgan",
    title: "Living Sappho: Imitation, Imagination, and Revivification",
    text: "Sappho’s poetry largely vanished by 1100 AD, yet her queer biography persisted..."
  },
  {
    name: "Katherine Venturo-Conerly",
    title: "Scaling Mental Health Interventions in LMICs",
    text: "Only 5% of youth psychotherapy RCTs occur in low and middle-income countries..."
  },
  {
    name: "Mackinley FitzPatrick",
    title: "Deciphering Inka Khipus",
    text: "The Inka Empire managed vast territories without a conventional writing system..."
  },
  {
    name: "Raphael Raux",
    title: "Human Projection in AI Trust",
    text: "Public perception of AI swings between overconfidence and distrust..."
  },
  {
    name: "Sergio Alarcón Robledo",
    title: "Sensory Experience in Ancient Egyptian Tombs",
    text: "My research explores the earliest monumental architecture in Egypt (ca. 3000 BCE)..."
  }
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
  const [selectedProject, setSelectedProject] = useState<{ name: string; title: string } | null>(null);
  const [showProjectTitle, setShowProjectTitle] = useState(false);
  const [randomColor, setRandomColor] = useState<string>('');

  // Function to pick a random project
  const getRandomProject = useCallback(() => {
    return projectSummaries[Math.floor(Math.random() * projectSummaries.length)];
  }, []);

  // Fetch words based on project title
  const fetchWords = useCallback(async (projectText: string): Promise<string[]> => {
    try {
      const res = await fetch('/api/openai/horizons-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: projectText }),
      });
      if (!res.ok) throw new Error(`API call failed: ${res.status}`);
      const data = await res.json();
      return data.words || [];
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }, []);

  const startSequence = useCallback(async () => {
    setShowProjectTitle(false);
    setVisibleIndices(Array(15).fill(false));

    // Pick a new project
    const project = getRandomProject();
    setSelectedProject(project);

    // Fetch words related to the project title
    const newWords = await fetchWords(project.text);
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
          setShowProjectTitle(true);
          setTimeout(startSequence, 5000); // Show project title for 5 seconds, then restart
        }, 2000);
      }
    }, 2000);
  }, [fetchWords, getRandomProject]);

  useEffect(() => {
    startSequence(); // Start the loop when the component mounts
  }, [startSequence]);

  return (
    <main ref={containerRef} className="min-h-screen w-full bg-black flex flex-col items-start justify-start p-8">
      {/* Words Display */}
      <div className="flex flex-col">
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

        {/* Scholar's project title appears at the end */}
        {selectedProject && showProjectTitle && (
          <p
            className={`${randomColor} ${inter.className} font-extrabold transition-opacity duration-1000`}
            style={{
              fontSize: '5vh',
              lineHeight: '1.1em',
              margin: 0,
            }}
          >
            {selectedProject.name}
          </p>
        )}
      </div>
    </main>
  );
}
