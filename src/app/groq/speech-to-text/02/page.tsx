'use client';

import { useEffect, useRef, useState } from 'react';

interface Definition {
  word: string;
  definition: string;
}

export default function DejargonifyPage() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // The entire recognized text so far
  const [completeText, setCompleteText] = useState<string>('');
  // The array of words we have already defined
  const [alreadyDefined, setAlreadyDefined] = useState<string[]>([]);
  // The definitions to display in the right column
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  // We store leftover words that haven’t reached 5 yet
  const leftoverWordsRef = useRef<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Attempt to create or reuse a SpeechRecognition instance
  const initializeRecognition = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      console.warn('Web Speech API not supported in this browser.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;      // keep listening until stopped
    recognition.interimResults = false; // handle final results only
    recognition.lang = 'en-US';         // set language

    return recognition;
  };

  useEffect(() => {
    // Initialize once on mount
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    return () => {
      // Clean up
      stopRecording();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current || isRecording) return;

    setIsRecording(true);
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let newWords: string[] = [];
      for (const result of event.results) {
        const transcript = result[0].transcript.trim();
        newWords = newWords.concat(transcript.split(/\s+/));
      }

      if (newWords.length > 0) {
        handleNewWords(newWords);
      }
    };

    recognitionRef.current.onerror = (evt: SpeechRecognitionErrorEvent) => {
      console.error('SpeechRecognition error:', evt.error);
    };

    recognitionRef.current.onend = () => {
      // Could re-start if you want truly endless listening
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  // Called whenever we have brand-new words from the speech recognition
  const handleNewWords = async (words: string[]) => {
    // Update the UI with all recognized text
    setCompleteText((prev) => (prev ? `${prev} ${words.join(' ')}` : words.join(' ')));

    // Merge new words with leftover words from the last pass
    const allWords = leftoverWordsRef.current.concat(words);

    // While we can get chunks of 5 words, process them
    while (allWords.length >= 5) {
      const chunk = allWords.slice(0, 5).join(' ');
      allWords.splice(0, 5);

      // Send chunk to the route with context
      await checkDifficultWords({
        completeText: (completeText ? completeText + ' ' : '') + chunk,
        newText: chunk,
        alreadyDefined,
      });
    }

    leftoverWordsRef.current = allWords;
  };

  // Hit our /api/groq/dejargonify-speech route
  const checkDifficultWords = async ({
    completeText,
    newText,
    alreadyDefined,
  }: {
    completeText: string;
    newText: string;
    alreadyDefined: string[];
  }) => {
    try {
      const response = await fetch('/api/groq/dejargonify-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completeText, newText, alreadyDefined }),
      });
      if (!response.body) {
        console.error('No response body returned from server.');
        return;
      }

      // Stream the response (the LLM is streaming tokens)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textSoFar = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        textSoFar += decoder.decode(value, { stream: true });
      }

      // At the end, parse the full text. 
      // The LLM might respond with "false" or a JSON array
      const trimmed = textSoFar.trim();

      if (trimmed === 'false') {
        // No new definitions
        return;
      } else {
        // Attempt to parse JSON
        try {
          const newDefinitions: Definition[] = JSON.parse(trimmed);

          if (Array.isArray(newDefinitions)) {
            // Merge into definitions array, skipping duplicates
            const uniqueDefs: Definition[] = [];
            for (const def of newDefinitions) {
              const alreadyHave = definitions.some(
                (d) =>
                  d.word.toLowerCase().replace(/[^a-z0-9]/gi, '') ===
                  def.word.toLowerCase().replace(/[^a-z0-9]/gi, '')
              );
              if (!alreadyHave) {
                uniqueDefs.push(def);
              }
            }
            if (uniqueDefs.length > 0) {
              setDefinitions((prev) => [...prev, ...uniqueDefs]);
              setAlreadyDefined((prev) => [
                ...prev,
                ...uniqueDefs.map((d) =>
                  d.word.toLowerCase().replace(/[^a-z0-9]/gi, '')
                ),
              ]);
            }
          }
        } catch (err) {
          console.error('Failed to parse LLM response as JSON:', err);
          console.log('Raw LLM response:', trimmed);
        }
      }
    } catch (error) {
      console.error('Error streaming from API:', error);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
        {/* Left Column: Full transcript so far */}
        <section className="bg-gray-800 p-4 rounded-md shadow-md min-h-[70vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Transcript (Complete)</h2>
          {completeText ? (
            <p className="whitespace-pre-wrap">{completeText}</p>
          ) : (
            <p className="text-gray-500">No speech recognized yet.</p>
          )}
        </section>

        {/* Right Column: definitions */}
        <section className="bg-gray-800 p-4 rounded-md shadow-md min-h-[70vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Difficult Words & Definitions</h2>
          {definitions.length === 0 ? (
            <p className="text-gray-500">No definitions yet.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {definitions.map((def, idx) => (
                <li key={idx}>
                  <strong className="text-blue-400">{def.word}</strong>: {def.definition}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-4 justify-center">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            isRecording ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={startRecording}
          disabled={isRecording}
        >
          {isRecording ? 'Recording...' : 'Start Recording'}
        </button>

        <button
          className="px-6 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      </div>
    </main>
  );
}
