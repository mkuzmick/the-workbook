// pages/tests/index.tsx

import Link from "next/link";

export default function Tests() {
  // Array of test pages
  const testPages = [
    { name: "Audio Recorder", path: "/tests/audio-recorder" },
    { name: "Bento 1", path: "/tests/bento-1" },
    { name: "Markdown Notes", path: "/tests/markdown-notes" },
    { name: "Slide Carousel", path: "/tests/slide-carousel" },
    { name: "Wavy Background", path: "/tests/wavy-background" },
    { name: "ZK Story", path: "/tests/zk-story" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="text-7xl font-bold mb-8">Tests</h1>
        <ul className="space-y-4">
          {testPages.map((page) => (
            <li key={page.path}>
              <Link href={page.path} className="text-xl font-medium text-blue-600 hover:underline">
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-gray-200 dark:bg-gray-800">
        <div className="flex justify-center gap-8">
          <Link href="/editor" className="text-lg font-medium text-blue-600 hover:underline">
            Editor
          </Link>
          <Link href="/" className="text-lg font-medium text-blue-600 hover:underline">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
