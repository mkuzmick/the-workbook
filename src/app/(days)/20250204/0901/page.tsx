'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: '900',
});

const wordList = [
  { french: 'mode', english: 'fashion' },
  { french: 'style', english: 'style' },
  { french: 'cerises', english: 'cherries' },
  { french: 'glace', english: 'ice cream' },
  { french: 'élégance', english: 'elegance' },
  { french: 'vogue', english: 'trend' },
  { french: 'parfum', english: 'perfume' },
  { french: 'couture', english: 'sewing/fashion' },
  { french: 'chic', english: 'chic' },
  { french: 'tendance', english: 'trend' },
  { french: 'bijou', english: 'jewel' },
  { french: 'soie', english: 'silk' },
  { french: 'velours', english: 'velvet' },
  { french: 'lunettes de soleil', english: 'sunglasses' },
  { french: 'haute couture', english: 'high fashion' },
  { french: 'pantalon', english: 'pants' },
  { french: 'robe', english: 'dress' },
  { french: 'chemise', english: 'shirt' },
  { french: 'écharpe', english: 'scarf' },
  { french: 'chaussures', english: 'shoes' },
  { french: 'sac', english: 'bag' },
  { french: 'montre', english: 'watch' },
  { french: 'bracelet', english: 'bracelet' },
  { french: 'collier', english: 'necklace' },
  { french: 'bague', english: 'ring' },
  { french: 'gant', english: 'glove' },
  { french: 'chapeau', english: 'hat' },
  { french: 'manteau', english: 'coat' },
  { french: 'veste', english: 'jacket' },
  { french: 'blazer', english: 'blazer' },
  { french: 'cravate', english: 'tie' },
  { french: 'bottes', english: 'boots' },
  { french: 'dentelle', english: 'lace' },
  { french: 'lin', english: 'linen' },
  { french: 'cachemire', english: 'cashmere' },
  { french: 'cuir', english: 'leather' },
  { french: 'jean', english: 'jeans' },
  { french: 'tissu', english: 'fabric' },
  { french: 'fourrure', english: 'fur' },
  { french: 'maquillage', english: 'makeup' },
  { french: 'rouge à lèvres', english: 'lipstick' },
  { french: 'vernis à ongles', english: 'nail polish' },
  { french: 'ombre à paupières', english: 'eyeshadow' },
  { french: 'mascara', english: 'mascara' },
  { french: 'fond de teint', english: 'foundation' },
  { french: 'poudre', english: 'powder' },
  { french: 'crème', english: 'cream' },
  { french: 'parapluie', english: 'umbrella' }
];

const getRandomIndices = (length: number, count: number) => {
  const indices = new Set<number>();
  while (indices.size < count && length > 0) {
    indices.add(Math.floor(Math.random() * length));
  }
  return Array.from(indices);
};

export default function Page() {
  const [lineIndices, setLineIndices] = useState<number[]>([]);
  const [isLineVisible, setIsLineVisible] = useState<boolean[]>(Array(20).fill(true));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLineIndices(getRandomIndices(wordList.length, 20));
  }, []);

  useEffect(() => {
    if (lineIndices.length === 0) return; // Avoid running interval if indices are not set

    const intervalId = setInterval(() => {
      const randomLine = Math.floor(Math.random() * 20);
      setIsLineVisible((prev) => {
        const newVisible = [...prev];
        newVisible[randomLine] = false;
        return newVisible;
      });

      setTimeout(() => {
        setLineIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          let newWordIndex;
          do {
            newWordIndex = Math.floor(Math.random() * wordList.length);
          } while (newIndices.includes(newWordIndex) && wordList.length >= 20);
          newIndices[randomLine] = newWordIndex;
          return newIndices;
        });

        setIsLineVisible((prev) => {
          const newVisible = [...prev];
          newVisible[randomLine] = true;
          return newVisible;
        });
      }, 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lineIndices]); // Runs only after `lineIndices` is set

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen w-full bg-black flex flex-col justify-start relative">
      {!isFullscreen && (
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleFullscreen}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-opacity duration-300"
          >
            Toggle Fullscreen
          </button>
        </div>
      )}
      <div className="w-full h-full flex flex-col">
        {lineIndices.length > 0 &&
          Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-full"
              style={{ height: '4vh', transition: 'opacity 1s', opacity: isLineVisible[idx] ? 1 : 0 }}
            >
              <div className="w-1/2 flex justify-end pr-2">
                <p className={`${inter.className} font-extrabold`} style={{ fontSize: '4vh', lineHeight: '1em', color: 'hotpink' }}>
                  {wordList[lineIndices[idx]]?.french}
                </p>
              </div>
              <div className="w-1/2 flex justify-start pl-2">
                <p className={`${inter.className} font-extrabold`} style={{ fontSize: '4vh', lineHeight: '1em', color: 'rgb(107, 114, 128)' }}>
                  {wordList[lineIndices[idx]]?.english}
                </p>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
