'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

// const academicDisciplines = [
//   'Physics',
//   'Taylor Swift Studies',
//   'Tech Bro Studies',
//   'OpenAI Studies',
//   'English Premier League Studies',
//   'English Literature',
//   'Cheesecake Factory Studies',
//   'Memeology',
//   'Avocado Toast Economics',
//   'Cat Video Criticism',
//   'Social Media Archaeology',
//   'Coffee Shop Sociology',
//   'Emoji Linguistics',
//   'Cryptocurrency Philosophy',
//   'Astrology for Engineers',
//   'Pizza Topping Taxonomy',
//   'Procrastination Dynamics',
//   'Quantum Procrastination',
//   'Theme Park Anthropology',
//   'K-Popology',
//   'Internet Rabbit Hole Exploration',
//   'Reality TV Narratology',
//   'DIY Disaster Studies',
//   'Bagel Science',
//   'Sock Drawer Organization Theory',
//   'Hoverboard Safety Engineering',
//   'Cupcake Structural Analysis',
//   'Fandom Studies',
//   'Nostalgia Management',
//   'Spaceship Interior Design',
//   'Popcorn Physics',
//   'Post-Apocalyptic Gardening',
//   'Game Show Strategy',
//   'Invisible Ink Calligraphy',
//   'Fantasy World Cartography',
//   'Haunted House Architecture',
//   'Laughter Acoustics',
//   'Dragon Mythology',
//   'Unicorn Ecology',
//   'Video Game Lore Analysis',
//   'Couch Potato Studies',
//   'Pencil Sharpener Mechanics',
//   'Bubble Wrap Dynamics',
//   'Pirate Code Ethics',
//   'Superhero Costume Design',
//   'Gummy Bear Chemistry',
//   'Banana Peel Slapstick Science'
// ];

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
  'Ice Cream Science',
  'Sticker Design Philosophy',
  'The Art of Sleepovers',
  'Bubblegum Architecture',
  'Emoji Linguistics',
  'The Science of Slime',
  'Friendship Engineering',
  'Dream Cartography',
  'K-Pop Sociology',
  'Fantasy Creature Biology',
  'Rainbow Studies',
  'Anime Aesthetics',
  'The History of Chibi Art',
  'Pocky and Snackology',
  'The Physics of Noodle Slurping',
  'Sushi Plating Artistry',
  'Magical Girl Transformation Studies',
  'Cozy Blanket Fort Construction',
  'Boba Tea Chemistry',
  'The Lore of Studio Ghibli',
  'The Psychology of Cute Things',
  'Café Culture and Pastry Design',
  'Food ASMR Appreciation',
  'The Science of Perfect Pancakes',
  'The Philosophy of Anime Openings',
  'Pastel Color Theory',
  'The History of Animated Tears',
  'Bubble Tea Symbolism in Modern Art',
  'Ice Cream Cone Architecture',
  'The Evolution of Kawaii Culture',
  'Sketchbook Archaeology',
  'Pixel Art Anthropology',
  'The Sociology of Fanfiction',
  'Mochi Making and Cultural History',
  'Noodle Bowl Symmetry Studies',
  'Anime Character Hair Physics',
  'The Fine Art of Latte Foam',
  'The History of Bento Box Design',
  'Manga Panel Composition',
  'Ramenology: The Study of Ramen',
  'The Semiotics of Cat Videos',
  'The Aesthetics of Dessert Towers',
  'Fan Art Ethics and Practices',
  'The Mythology of Giant Robots',
  'Candy Color Chemistry',
  'The Art of Kawaii Stationery',
  'Digital Drawing Time-Travel Techniques',
  'The Symbolism of Anime Eyes',
  'Cookie Cutter Engineering',
  'Edo-Era Food Illustration Studies',
  'The Anthropology of Anime Conventions',
  'Visual Novel Narratives',
  'The Art of Sprinkle Placement',
  'DIY Slime Artistry',
  'Sakura Blossoms in Modern Media',
  'Cupcake Frosting Mastery',
  'The History of Magical Brooms in Anime',
  'The Culinary Science of Sweet and Salty',
  'Anime World-Building Theory',
  'The Aesthetics of Food Packaging',
  'The Cultural Significance of Takoyaki',
  'Pop Idol Sociology',
  'Origami Fashion Design',
];



export default function Page() {
  const [words, setWords] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomDiscipline = (): string =>
    academicDisciplines[Math.floor(Math.random() * academicDisciplines.length)];

  const fetchWords = async (): Promise<string[]> => {
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
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      containerRef.current?.requestFullscreen();
      // Hide the button immediately upon entering fullscreen
      setShowFullscreenButton(false);
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      // If we just exited fullscreen, show the button again
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
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black flex flex-col items-start justify-start relative"
    >
      {/* 
        We always render the fullscreen button in the DOM, 
        but wrap it in a small <div> that detects hover. 
      */}
      <div
        className="absolute top-4 right-4"
        // Only show the button (setShowFullscreenButton(true)) on hover
        onMouseEnter={() => {
          // Only show if we are in fullscreen
          // (or if it was otherwise hidden)
          if (isFullscreen) {
            setShowFullscreenButton(true);
          }
        }}
        // Hide the button again when not hovering
        onMouseLeave={() => {
          if (isFullscreen) {
            setShowFullscreenButton(false);
          }
        }}
      >
        <button
          onClick={toggleFullscreen}
          className={`
            bg-white text-black px-4 py-2 rounded-md 
            hover:bg-gray-200 transition-opacity duration-300
            ${showFullscreenButton ? 'opacity-100' : 'opacity-0'}
          `}
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
