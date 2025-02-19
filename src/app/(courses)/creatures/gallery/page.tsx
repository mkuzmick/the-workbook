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

// Augment Card with a random color property.
type AugmentedCard = Card & {
  iridescenceColor: [number, number, number];
};

// Helper: for each card, generate a random color within [0, 0.3]
function addRandomColors(cards: Card[]): AugmentedCard[] {
  return cards.map(card => ({
    ...card,
    iridescenceColor: [
      Math.random() * 0.5,
      Math.random() * 0.5,
      Math.random() * 0.5,
    ]
  }));
}

export default function Page() {
  const [cards, setCards] = useState<AugmentedCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to always have the latest cards array.
  const cardsRef = useRef<AugmentedCard[]>([]);
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

  // Load initial data and reverse order so the most recent is first.
  useEffect(() => {
    const loadInitial = async () => {
      const fetchedCards = await fetchCards();
      // Reverse the array and augment with random colors.
      setCards(addRandomColors(fetchedCards.slice().reverse()));
      setLoading(false);
    };
    loadInitial();
  }, []);

  // Poll every 5 seconds to update the cards state.
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchedCards = await fetchCards();
      const reversed = fetchedCards.slice().reverse();
      setCards((prevCards) => {
        // Compare IDs of previous and fetched data.
        const prevIds = new Set(prevCards.map(card => card.id));
        const fetchedIds = new Set(reversed.map(card => card.id));
        const isEqual = 
          prevCards.length === reversed.length &&
          prevCards.every(card => fetchedIds.has(card.id));
        // If unchanged, do nothing; else update and reassign random colors.
        return isEqual ? prevCards : addRandomColors(reversed);
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Set up card rotation interval once (every 10 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const length = cardsRef.current.length;
        if (length === 0) return 0;
        return (prevIndex + 1) % length;
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Add keydown listener for left/right arrow navigation and "u" key update.
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (cardsRef.current.length === 0) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex(prevIndex => (prevIndex + 1) % cardsRef.current.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prevIndex => (prevIndex - 1 + cardsRef.current.length) % cardsRef.current.length);
      } else if (e.key.toLowerCase() === 'u') {
        // Immediately update cards with new random colors.
        const fetchedCards = await fetchCards();
        const reversed = fetchedCards.slice().reverse();
        setCards(addRandomColors(reversed));
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

  // Extract additional fields (using first value if available)
  const studentName = currentCard.fields["Student Name (from Creatures)"]?.[0] || 'Unknown';
  const contemporaryCondition = currentCard.fields["Contemporary Condition (from Creatures)"]?.[0] || 'Unknown';
  const power = currentCard.fields["Power (from Creatures)"]?.[0] || 'Unknown';
  const temporality = currentCard.fields["Temporality (from Creatures)"]?.[0] || 'Unknown';
  const colorField = currentCard.fields["Color (from Creatures)"]?.[0] || 'Unknown';
  const size = currentCard.fields["Size (from Creatures)"]?.[0] || 'Unknown';
  const habitat = currentCard.fields["Habitat"]?.[0] || 'Unknown';

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
              color={currentCard.iridescenceColor}
              mouseReact={false}
              amplitude={0.9}
              speed={.4}
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
              <p><strong>Color:</strong> {colorField}</p>
              <p><strong>Size:</strong> {size}</p>
              <p><strong>Habitat:</strong> {habitat}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
