'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';

export default function Page() {
  const poemTypes = ['Haiku', 'Limerick', 'Sonnet'];

  // We'll store multiple poems in an array of string[],
  // where each string[] is one poem (split into lines).
  const [poems, setPoems] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Scrollable container for poems
  const poemsContainerRef = useRef<HTMLDivElement>(null);

  // Track whether our infinite loop is still “active”:
  const loopActiveRef = useRef(false);

  // Whenever poems change, scroll to the bottom so new poems are visible.
  useEffect(() => {
    if (poemsContainerRef.current) {
      poemsContainerRef.current.scrollTop =
        poemsContainerRef.current.scrollHeight;
    }
  }, [poems]);

  /**
   * Fetch one poem from /api/poem/[type], returning an array of its lines.
   */
  const fetchPoem = useCallback(async (type: string): Promise<string[]> => {
    setLoading(true);

    try {
      const response = await fetch(`/api/poem/${type}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? 'Error fetching poem');
      }

      const data = await response.json();
      const fullText: string = data.completion || '';

      return fullText.split('\n');
    } catch (error) {
      console.error('Error fetching poem:', error);
      throw error;
    }
  }, []);

  /**
   * Infinite loop: repeatedly fetch a new poem of the given type,
   * display it, then wait 1s per line for “reading time.” 
   */
  const generatePoemsLoop = useCallback(
    async (type: string) => {
      loopActiveRef.current = true;
      while (loopActiveRef.current) {
        try {
          const lines = await fetchPoem(type);

          // Display new poem immediately
          setPoems((prev) => [...prev, lines]);

          // Turn off "writing" message
          setLoading(false);

          // Wait 1 second × number of lines
          const readTimeMs = lines.length * 1000;
          await new Promise((resolve) => setTimeout(resolve, readTimeMs));

          // Then loop repeats, fetching next poem...
        } catch (err) {
          console.error('Error in poem loop:', err);
          loopActiveRef.current = false;
        }
      }
    },
    [fetchPoem]
  );

  /**
   * Clicking on a poem type stops any existing loop and starts a new one.
   */
  const handlePoemRequest = useCallback(
    async (type: string) => {
      // Stop current loop
      loopActiveRef.current = false;

      // Let the old loop finish
      await new Promise((r) => setTimeout(r, 0));

      // Start a new loop for the chosen type
      generatePoemsLoop(type);
    },
    [generatePoemsLoop]
  );

  /**
   * Stop button manually ends the loop and stops "loading."
   */
  const handleStop = useCallback(() => {
    loopActiveRef.current = false;
    setLoading(false);
  }, []);

  return (
    <>
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen bg-black text-white p-6 font-sans">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left column: Poem Type buttons */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-2">Pick a Poem Type</h1>

            {poemTypes.map((type) => (
              <button
                key={type}
                onClick={() => handlePoemRequest(type.toLowerCase())}
                className="
                  w-full 
                  py-2 px-4 
                  border-2 border-white 
                  rounded-[10px] 
                  bg-transparent 
                  hover:bg-white/20
                  transition-colors
                "
              >
                {type}
              </button>
            ))}

            {/* STOP button */}
            <button
              onClick={handleStop}
              className="
                w-full 
                py-2 px-4 
                border-2 border-red-500 
                rounded-[10px] 
                bg-transparent 
                hover:bg-red-500/20
                transition-colors
              "
            >
              Stop
            </button>
          </div>

          {/* Right column: Display poems */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Poems</h2>

            {/* Scrollable container for all poems */}
            <div
              ref={poemsContainerRef}
              className="
                flex-1 
                overflow-auto 
                border-2 border-white 
                rounded-[10px] 
                p-4
                bg-transparent
              "
            >
              {poems.length === 0 && !loading && (
                <p>No poems yet. Pick a type to start!</p>
              )}

              {/* Render each poem */}
              {poems.map((poemLines, poemIndex) => (
                <div
                  key={poemIndex}
                  className="
                    mb-4 p-4 
                    border-2 border-white 
                    rounded-[10px] 
                    bg-transparent
                    font-[Merriweather]  /* Apply Google Font to poems */
                  "
                >
                  {poemLines.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              ))}

              {/* “writing” feedback */}
              {loading && (
                <p className="animate-pulse">...writing a new poem...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

