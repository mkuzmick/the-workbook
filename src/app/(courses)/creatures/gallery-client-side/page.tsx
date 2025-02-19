// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// import Aurora from '@/blocks/backgrounds/Aurora/AuroraBlue'; // Adjust the import path based on your project structure
import Aurora from '@/blocks/backgrounds/Aurora/AuroraTest'; // Adjust the import path based on your project structure


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

  // Load initial data
  useEffect(() => {
    const loadInitial = async () => {
      const fetchedCards = await fetchCards();
      setCards(fetchedCards);
      setLoading(false);
    };
    loadInitial();
  }, []);

  // Poll every 5 seconds to add any new cards to our array
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchedCards = await fetchCards();
      setCards((prevCards) => {
        const existingIds = new Set(prevCards.map((card) => card.id));
        const newCards = fetchedCards.filter((card) => !existingIds.has(card.id));
        if (newCards.length > 0) {
          console.log('Adding new cards:', newCards);
        }
        return [...prevCards, ...newCards];
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Every 5 seconds, update the current card index to display the next card.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (cards.length === 0) return 0;
        return (prevIndex + 1) % cards.length;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [cards]);

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

  // Extract additional fields (showing first value if available)
  const studentName = currentCard.fields["Student Name (from Creatures)"]?.[0] || 'Unknown';
  const contemporaryCondition = currentCard.fields["Contemporary Condition (from Creatures)"]?.[0] || 'Unknown';
  const power = currentCard.fields["Power (from Creatures)"]?.[0] || 'Unknown';
  const temporality = currentCard.fields["Temporality (from Creatures)"]?.[0] || 'Unknown';
  const color = currentCard.fields["Color (from Creatures)"]?.[0] || 'Unknown';
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
          transition={{ duration: 0.5 }}
        >
          {/* Aurora background inserted as an absolutely positioned element */}
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            speed={0.5}
            amplitude={1.0}
            className="absolute inset-0 z-0"
          />
          {/* Card content with higher z-index */}
          <div className="relative z-10 w-full">
            {imageUrl ? (
              <div className="relative w-full h-[300px] mb-4">
                <Image
                  src={imageUrl}
                  alt={creatureName}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full h-[300px] bg-gray-700 mb-4 flex items-center justify-center">
                No Image
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{creatureName}</h3>
            <div className="w-full text-left text-sm space-y-1">
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
