// app/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Iridescence from '@/blocks/backgrounds/Iridescence/Iridescence'; // Adjust path as needed

type Card = {
  id: string;
  fields: {
    SlackUrl: string;         // URL for the image
    CreatureName?: string[];  // We'll display the first name if available
    // Additional properties from Airtable:
    "Student Name (from Creatures)"?: string[];
    "Contemporary Condition (from Creatures)"?: string[];
    "Power (from Creatures)"?: string[];
    "Temporality (from Creatures)"?: string[];
    "Color (from Creatures)"?: string[];
    "Size (from Creatures)"?: string[];
    "Habitat"?: string[];
  };
};

export default function Page() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to always have the latest cards array.
  const cardsRef = useRef<Card[]>([]);
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // Function to fetch cards from /api/creatures
  const fetchCards = async (): Promise<Card[]> => {
    try {
      const res = await fetch('/api/creatures');
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return data.cards as Card[];
    } catch (err: any) {
      console.error('Failed to fetch cards:', err);
      setError(err.message);
      return [];
    }
  };

  // Load initial data and reverse order so that most recent image is first.
  useEffect(() => {
    const loadInitial = async () => {
      const fetchedCards = await fetchCards();
      // Reverse the array before setting state.
      setCards(fetchedCards.slice().reverse());
      setLoading(false);
    };
    loadInitial();
  }, []);

  // Poll every 5 seconds to update the cards state to match the fetched data.
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchedCards = await fetchCards();
      // Reverse the array so that most recent is first.
      const reversedFetchedCards = fetchedCards.slice().reverse();
      setCards((prevCards) => {
        // Create sets of IDs for comparison.
        const prevIds = new Set(prevCards.map((card) => card.id));
        const fetchedIds = new Set(reversedFetchedCards.map((card) => card.id));
        const isEqual =
          prevCards.length === reversedFetchedCards.length &&
          prevCards.every((card) => fetchedIds.has(card.id));
        return isEqual ? prevCards : reversedFetchedCards;
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Set up card rotation interval once (every 10 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const length = cardsRef.current.length;
        if (length === 0) return 0;
        return (prevIndex + 1) % length;
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Add keydown listener for left/right arrow navigation and immediate update on "u" key.
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (cardsRef.current.length === 0) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsRef.current.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) =>
          (prevIndex - 1 + cardsRef.current.length) % cardsRef.current.length
        );
      } else if (e.key.toLowerCase() === 'u') {
        // Immediately update cards and change slide
        const fetchedCards = await fetchCards();
        const reversedFetchedCards = fetchedCards.slice().reverse();
        setCards(reversedFetchedCards);
        setCurrentIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Error: {error}
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const creatureName = currentCard.fields.CreatureName
    ? currentCard.fields.CreatureName[0]
    : 'Unnamed Creature';
  const imageUrl = currentCard.fields.SlackUrl;

  // Extract additional fields (first value if available)
  const studentName = currentCard.fields["Student Name (from Creatures)"]?.[0] || 'Unknown';
  const contemporaryCondition = currentCard.fields["Contemporary Condition (from Creatures)"]?.[0] || 'Unknown';
  const power = currentCard.fields["Power (from Creatures)"]?.[0] || 'Unknown';
  const temporality = currentCard.fields["Temporality (from Creatures)"]?.[0] || 'Unknown';
  const color = currentCard.fields["Color (from Creatures)"]?.[0] || 'Unknown';
  const size = currentCard.fields["Size (from Creatures)"]?.[0] || 'Unknown';
  const habitat = currentCard.fields["Habitat"]?.[0] || 'Unknown';

  // Helper to generate a dynamic iridescence color based on card ID.
  function getDynamicIridescenceColor(card: Card): [number, number, number] {
    let hash = 0;
    for (let i = 0; i < card.id.length; i++) {
      hash = card.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = Math.abs(Math.sin(hash + 1));
    const g = Math.abs(Math.sin(hash + 2));
    const b = Math.abs(Math.sin(hash + 3));
    return [r * 0.3, g * 0.3, b * 0.3];
  }
  const dynamicIridescenceColor = getDynamicIridescenceColor(currentCard);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          className="w-[500px] rounded-lg shadow-lg text-white p-4 flex flex-col items-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.0 }}
        >
          {/* Iridescence background */}
          <div className="absolute inset-0">
            <Iridescence
              color={dynamicIridescenceColor}
              mouseReact={false}
              amplitude={0.1}
              speed={1.0}
              className="w-full h-full"
            />
          </div>
          {/* Card content */}
          <div className="relative z-10 w-full">
            {imageUrl ? (
              <div className="w-full mb-4">
                <div className="relative w-full aspect-square">
                  <Image
                    src={imageUrl}
                    alt={creatureName}
                    fill
                    style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-[300px] bg-gray-700 mb-4 flex items-center justify-center">
                No Image
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{creatureName}</h3>
            <div className="text-left text-sm space-y-1">
              <p><strong>Student:</strong> {studentName}</p>
              <p><strong>Condition:</strong> {contemporaryCondition}</p>
              <p><strong>Power:</strong> {power}</p>
              <p><strong>Temporality:</strong> {temporality}</p>
              <p><strong>Color:</strong> {color}</p>
              <p><strong>Size:</strong> {size}</p>
              <p><strong>Habitat:</strong> {habitat}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
