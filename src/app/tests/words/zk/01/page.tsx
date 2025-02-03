'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Inter } from 'next/font/google';

// Load data
import flattenedSongs from '@/data/flattened_songs.json';
import lyricsData from '@/data/taylor_swift_lyrics.json';

const inter = Inter({ subsets: ['latin'], weight: '900' });

const rainbowColors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-blue-500',
  'text-indigo-500',
  'text-violet-500',
];

// Define the type for our word objects
interface Word {
  text: string;
  hallucinated: boolean;
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exactly 10 booleans for 10 words
  const [visibleIndices, setVisibleIndices] = useState<boolean[]>(Array(10).fill(false));
  const [words, setWords] = useState<Word[]>([]);
  const [songTitle, setSongTitle] = useState<string>('');
  const [showTitle, setShowTitle] = useState(false);
  const [randomColor, setRandomColor] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);

  // Utility: pick a random song from the flattened list
  const getRandomSong = useCallback(() => {
    const randomEntry = flattenedSongs[Math.floor(Math.random() * flattenedSongs.length)];
    return randomEntry;
  }, []);

  // Utility: get lyrics from the big JSON
  const getLyricsForSong = useCallback((songTitle: string, album: string) => {
    const albumData = lyricsData.albums.find((a) => a.title === album);
    if (!albumData) return null;

    const songData = albumData.songs[songTitle];
    return songData ? songData.full_lyrics : null;
  }, []);

  // POST to your lyrics-game API and retrieve exactly 10 words
  const fetchWords = useCallback(async (songTitle: string, lyrics: string): Promise<Word[]> => {
    try {
      const res = await fetch('/api/lyrics-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songTitle, lyrics }),
      });
      if (!res.ok) throw new Error(`API call failed: ${res.status}`);

      const data = await res.json();
      if (data.words.length === 10) {
        return data.words;
      } else {
        console.log(`Invalid word count: expected 10, received ${data.words.length}`);
        return data.words;
      }
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  }, []);

  // Handle fullscreen toggling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setShowFullscreenButton(false);
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes to adjust button visibility
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

  // Main effect to pick a song, fetch words, reveal them, etc.
  useEffect(() => {
    const startSequence = async () => {
      // First, hide everything from the previous sequence
      setShowTitle(false);
      setVisibleIndices(Array(10).fill(false));
      setSongTitle(''); // Clear the song title
      setWords([]); // Clear the words

      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Now get the new song data
      const { title, album } = getRandomSong();
      
      // Get lyrics
      const lyrics = getLyricsForSong(title, album);
      if (!lyrics) {
        console.error(`Lyrics not found for ${title} in ${album}`);
        return;
      }

      // Get 10 words from the API
      const newWords = await fetchWords(title, lyrics);
      console.log('newWords:', newWords);
      if (newWords.length !== 10) return;

      // Set up the new sequence
      setWords(newWords);
      setSongTitle(title);

      // Pick a random rainbow color for the title
      const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      setRandomColor(color);

      // Immediately reveal the first word (index = 0)
      setVisibleIndices((prev) => {
        const updated = [...prev];
        updated[0] = true; // show word[0] right away
        return updated;
      });

      // We'll track which word to show next.
      let index = 0;

      // Reveal the remaining words (1..9) at intervals, then show title
      const revealInterval = setInterval(() => {
        index++;
        setVisibleIndices((prev) => {
          const updated = [...prev];
          if (index < newWords.length) {
            updated[index] = true;
          } else if (index === newWords.length) {
            // Once we've passed all 10 words, show the title
            setShowTitle(true);
          }
          return updated;
        });

        // Stop after we've done index=10 + 1 (for the title)
        if (index >= newWords.length + 1) {
          clearInterval(revealInterval);
          // Start again in 5 seconds
          setTimeout(startSequence, 5000);
        }
      }, 2000);
    };

    startSequence();
  }, [fetchWords, getRandomSong, getLyricsForSong]);

  // Clean up the displayed title
  const displayTitle = songTitle.replace(/\(Taylor's Version.*?\)/, '').trim();

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black flex flex-col items-start justify-start p-8 relative"
    >
      {/* Fullscreen Toggle Button */}
      <div
        className="absolute top-4 right-4"
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

      {/* Words Display */}
      <div className="flex flex-col">
        {words.map((word, idx) => (
          <p
            key={idx}
            className={`
              ${inter.className}
              text-white
              font-extrabold
              transition-all
              duration-1000
              ease-in-out
              ${visibleIndices[idx] ? 'opacity-100' : 'opacity-0'}
              ${word.hallucinated ? 'text-red-500' : ''}
            `}
            style={{ fontSize: '5vh', lineHeight: '1.1em' }}
          >
            {word.text}
          </p>
        ))}

        {/* Always render the title, controlling visibility with opacity */}
        {songTitle && (
          <p
            className={`
              ${randomColor}
              ${inter.className}
              font-extrabold
              transition-all
              duration-2000
              ease-in-out
              ${showTitle ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ fontSize: '5vh', lineHeight: '1.1em' }}
          >
            {displayTitle}
          </p>
        )}
      </div>
    </main>
  );
}