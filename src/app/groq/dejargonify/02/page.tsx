'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function DejargonifyPage() {
  const [inputText, setInputText] = useState('');
  const [streamingMarkdown, setStreamingMarkdown] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDejargonify = async () => {
    if (!inputText.trim()) return;

    // Reset the current markdown and mark as loading
    setStreamingMarkdown('');
    setLoading(true);

    try {
      const response = await fetch('/api/groq/dejargonify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.body) {
        throw new Error('No response body returned from API.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read the streamed response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setStreamingMarkdown((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Error streaming response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
        {/* Left Column: Input Section */}
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full p-4 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
            placeholder="Enter your paragraph with difficult text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleDejargonify}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Dejargonify'}
          </button>
        </div>

        {/* Right Column: Streaming Markdown Response */}
        <div className="p-4 bg-gray-800 rounded-lg overflow-y-auto max-h-[70vh]">
          {streamingMarkdown ? (
            <ReactMarkdown className="prose prose-invert">
              {streamingMarkdown}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500 text-center">
              {loading ? 'Processing your input...' : 'Response will appear here.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
