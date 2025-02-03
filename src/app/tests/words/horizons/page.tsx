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
      text: `Aging is as much a feeling as a fact of life. My dissertation, 'The Evolution of the Aging Voice: Three Case Studies of Nonagenarian Women Poets in Slavic Canons,' examines Polish poet Krystyna Miłobędska, Czech poet Bohumila Grögerová, and Russian poet Elizaveta Mnatsakanova. These poets, who lived through significant political upheavals, aged into a post-Soviet millennium. I analyze how aging features in their poetry, challenging the notion of 'ageless' poetry and highlighting the role of time in artistic creation.`
    },
    {
      name: "Andrew O'Donohue", 
      title: "Courts and Democratic Backsliding",
      text: `My research compares Turkey under Erdoğan and Israel under Netanyahu to examine why courts defend or undermine democracy. Conventional wisdom suggests independent courts protect democracy, but I theorize that 'minoritarian' courts, out of alignment with voters, enable backsliding, while 'power-sharing' courts, backed by cross-partisan support, safeguard it. Using a dataset of 3,000 Turkish Constitutional Court decisions and 30 interviews with legal insiders, I explore how judicial structures impact democracy and how courts can be reformed to reinforce democratic institutions.`
    },
    {
      name: "Brandon Campbell",
      title: "Cost-Effective Fluorination for Pharmaceuticals", 
      text: `Fluorination is crucial for modern pharmaceuticals, but expensive reagents drive up drug costs. My research introduces Ag2+ photocatalysts to activate trifluoroacetic acid (TFA), a cheap and stable CF3 source. Using blue LED light, we achieved photocatalytic trifluoromethylation, significantly reducing costs and making drug synthesis more sustainable. Our work introduces Ag2+ photocatalysts to the chemical literature, offering potential applications beyond fluorination.`
    },
    {
      name: "Katherine Horgan",
      title: "Living Sappho: Imitation, Imagination, and Revivification",
      text: `Sappho's poetry largely vanished by 1100 AD, yet her queer biography persisted. My dissertation, 'Living Sappho,' examines how Renaissance receptions of Sappho's biography and poetry were intertwined rather than in conflict. I reveal that 15th and 16th-century scholars wrote openly about her homoeroticism before previously acknowledged. By analyzing literary impersonations of Sappho, I argue that her queerness survived through imaginative acts of imitation, shaping poetic traditions and challenging the male-dominated literary canon.`
    },
    {
      name: "Katherine Venturo-Conerly",
      title: "Scaling Mental Health Interventions in LMICs",
      text: `Only 5% of youth psychotherapy RCTs occur in low and middle-income countries (LMICs), despite 90% of the world's youth living there. To address this gap, I co-founded the Shamiri Institute, developing Shamiri, a low-stigma intervention for Kenyan youth that improves mental health through growth mindset, gratitude, and values affirmation. With over $5 million in funding, Shamiri has reached 130,000+ youths. My current research uses statistical modeling to optimize interventions for different youth populations, aiming to scale effective, cost-efficient mental health programs globally.`
    },
    {
      name: "Mackinley FitzPatrick",
      title: "Deciphering Inka Khipus",
      text: `The Inka Empire managed vast territories without a conventional writing system, instead using khipus—knotted cord record-keeping devices. My research focuses on 33 khipus from Laguna de los Cóndores, Peru, one of the largest known khipu archives. By analyzing non-numerical signs like knot structures and cord colors, I aim to decode khipus beyond their mathematical functions. Additionally, I digitally preserve khipus, ensuring this ancient knowledge endures for future scholars and indigenous descendants.`
    },
    {
      name: "Raphael Raux",
      title: "Human Projection in AI Trust",
      text: `Public perception of AI swings between overconfidence and distrust due to 'Human Projection'—the tendency to apply human attributes to AI. In lab experiments and field studies, we show that people judge AI more harshly for failing 'human-easy' tasks and trust it more for excelling at 'human-hard' tasks. Additionally, they lose trust when AI responses are textually dissimilar from expectations. Our findings suggest that making AI less anthropomorphic could align human expectations with actual AI capabilities, reducing trust-damaging mistakes.`
    },
    {
      name: "Sergio Alarcón Robledo",
      title: "Sensory Experience in Ancient Egyptian Tombs",
      text: `My research explores the earliest monumental architecture in Egypt (ca. 3000 BCE) at North Saqqara, the elite cemetery of Memphis. Through photogrammetry and archival work, I reconstructed lost tomb layouts. I also analyze their acoustic properties, revealing that early tombs were sound-isolated, while later designs amplified internal sounds outward—potentially reinforcing elite power through sensory control. This work, supported by the Mellon/ACLS Fellowship, expands our understanding of how architecture shaped ancient Egyptian social hierarchies.`
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
