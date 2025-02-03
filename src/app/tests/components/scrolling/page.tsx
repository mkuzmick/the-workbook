"use client";
// pages/tests/index.tsx

import Link from "next/link";
import Fade from "@/components/experiments/Fade";
import { useRef } from "react";
import Crosshair from "@/components/reactbits/Crosshair"; // Adjust the path if necessary

// New component to render the crosshair inside a container.
const CrosshairContainer = () => {
  // Type the ref as an HTMLDivElement (if using TypeScript)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{ height: "300px", overflow: "hidden" }}
      className="w-full flex justify-center items-center my-8"
    >
      <Crosshair containerRef={containerRef} color="#ffffff" />
    </div>
  );
};

export default function Tests() {
  // Array of test pages
  const testPages = [
    { name: "Audio Recorder", path: "/tests/audio-recorder" },
    { name: "Bento 1", path: "/tests/bento-1" },
    { name: "Markdown Notes", path: "/tests/markdown-notes" },
    { name: "Slide Carousel", path: "/tests/slide-carousel" },
    { name: "Wavy Background", path: "/tests/wavy-background" },
    { name: "ZK Story", path: "/tests/zk-story" },
    { name: "shadcn", path: "/tests/shadcn" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Section 1 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 3 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 4 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 5 - With Fade effect */}
      <Fade blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-7xl font-bold mb-8">Tests</h1>
          <ul className="space-y-4">
            {testPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="text-xl font-medium text-blue-600 hover:underline"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Fade>

      {/* Section 6 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 7 */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="text-xl font-medium text-blue-600 hover:underline"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Crosshair Section */}
      <CrosshairContainer />

      {/* Footer */}
      <footer className="py-4 bg-gray-200 dark:bg-gray-800">
        <div className="flex justify-center gap-8">
          <Link
            href="/editor"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Editor
          </Link>
          <Link
            href="/"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
