// components/CarouselClient.tsx
'use client';

import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './CarouselServer';

type CarouselClientProps = {
  initialCards: Card[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    // Parse the error message from the response
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch');
  }
  return res.json();
};


export default function CarouselClient({ initialCards }: CarouselClientProps) {
  // SWR polls the API route for updated card data. 
  // The fallbackData is the initial cards fetched server-side.
  const { data, error } = useSWR<{ cards: Card[] }>(
    '/api/creatures',
    fetcher,
    { refreshInterval: 5000, fallbackData: { cards: initialCards } }
  );

  if (error) return <div>Error loading cards.</div>;
  if (!data) return <div>Loading...</div>;

  const cards = data.cards;

  return (
    <div className="carousel-container flex gap-4 overflow-x-auto p-4">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="card bg-white rounded-lg shadow-md overflow-hidden min-w-[250px]"
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-image relative h-48 w-full">
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                />
              ) : (
                <div className="bg-gray-300 h-full w-full flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{card.name}</h3>
              {/* Render additional card properties here if needed */}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
