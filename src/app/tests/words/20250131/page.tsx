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
  'Procrastination Methodologies',
  'Aesthetic Cottagecore Epistemology',
  'Theoretical Dog Petting Techniques',
  'Popcorn Kinetics',
  'The Science of Accidental Naps',
  'The Philosophy of Bad Haircuts',
  'The History of Internet Yelling',
  'Liminal Space Geography',
  'Spoonerism Engineering',
  'The Psychology of Lost Socks',
  'Cryptid Social Studies',
  'The Mathematics of Pizza Slices',
  'Eldritch Horror Marketing Strategies',
  'Parallel Universe Fan Theories',
  'The Art of Spilled Coffee',
  'Existential Dread in Animated Sitcoms',
  'The Linguistics of Sarcasm',
  'Parallel Parking Philosophy',
  'Theoretical Bread Studies',
  'Overthinking Dynamics',
  'The Aesthetics of Grocery Store Music',
  'Quantum Vibes Theory',
  'The Sociology of Midnight Snacks',
  'The History of Fake Pockets',
  'The Political Economy of Monopoly (the Board Game)',
  'Emoji Etymology',
  'The Science of Cat Sitting on Laptop',
  'The Postmodernism of Clickbait',
  'The Semiotics of Slay',
  'The Mythology of the Cool Aunt',
  'The Epistemology of "Just Vibing"',
  'Theoretical Snackology',
  'The History of Vine Compilation Videos',
  'The Metaphysics of Group Chats',
  'The Fine Art of Sending the Perfect Gif',
  'Quantum Procrastination Mechanics',
  'The History of the Internet Rabbit Hole',
  'The Cultural Significance of "Yas Queen"',
  'The Semiotics of That One Guy in the Background',
  'The Philosophy of Late-Night Existential Dread',
  'The Anthropology of Side Characters',
  'The Epistemology of "Dude, Trust Me"',
  'Theoretical Pajama Studies',
  'The Science of Waking Up 5 Minutes Before an Alarm',
  'The Economics of Impulse Buying Stickers',
  'The Cartography of the Backrooms',
  'The Statistical Probability of a Cat Knocking Over a Glass',
  'The Sociology of "We Should Hang Out Sometime"',
  'The Ethics of Texting "Lol" Without Laughing',
  'The Symbolism of Socks with Holes in Them',
  'The Poetry of Misspelled Tweets',
  'Theoretical Vibe Studies',
  'Post-Ironic Meme Theology',
  'The Science of Overstuffed Burritos',
  'The Cultural Anthropology of Theme Park Line Behavior',
  'The Philosophy of Eating Cereal at 3 AM',
  'The Fluid Dynamics of Spilled Coffee',
  'The Semiotics of Reaction Videos',
  'The Ontology of the “Typing…” Notification',
  'The Aesthetics of Dad Jokes',
  'The Cultural Significance of “Can I Get a Hoya?”',
  'The Politics of the Last Slice of Pizza',
  'The Psychological Impact of Losing Your Place in a Book',
  'The Kinetics of Trying to Catch a Falling Phone',
  'The Economics of Overpriced Coffee Shops',
  'The History of Making a Dumb Face in Selfies',
  'The Science of Remembering an Embarrassing Moment from 10 Years Ago',
  'The Metaphysics of the Shopping Cart with the Wobbly Wheel',
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

  const startSequence = useCallback(async () => {
    setShowDiscipline(false); // Hide previous discipline
    setVisibleIndices(Array(15).fill(false)); // Reset visibility

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
          setTimeout(startSequence, 5000); // Show discipline for 5 seconds, then restart
        }, 2000); // Delay before showing discipline
      }
    }, 2000); // 2s fade-in

  }, [fetchWords, getRandomDiscipline]);

  useEffect(() => {
    startSequence(); // Start the infinite loop on mount
  }, [startSequence]);

  return (
    <main ref={containerRef} className="min-h-screen w-full bg-black flex flex-col items-start justify-start p-8">
      {/* Words */}
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

        {/* Academic discipline directly below last word */}
        {discipline && showDiscipline && (
          <p className={`${randomColor} ${inter.className} font-extrabold transition-opacity duration-1000`}
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
    </main>
  );
}
