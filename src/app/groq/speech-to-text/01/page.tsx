'use client';

import { useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // We store the speech recognition instance in a ref so it persists
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition if available
  const initializeRecognition = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      console.warn('Web Speech API is not supported by this browser.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // You can set to 'true' for continuous listening
    recognition.interimResults = true; // We can capture partial transcripts if desired
    recognition.lang = 'en-US'; // Set the language if needed
    return recognition;
  };

  // Start recognition
  const startRecording = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (const result of event.results) {
        transcript += result[0]?.transcript || '';
      }
      // Use partial transcripts if needed
      setInput(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('SpeechRecognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };
  };

  // Stop recognition (optional, or you can let the recognition end naturally)
  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  // Send message to your Groq streaming endpoint
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message locally
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call our streaming route
      const response = await fetch('/api/groq/streaming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.body) {
        console.error('No response body returned from server.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Continuously read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Decode chunk
        const chunkValue = decoder.decode(value, { stream: true });
        assistantContent += chunkValue;

        // Update the assistant message as chunks arrive
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage?.role === 'assistant') {
            // Update existing assistant message
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              role: 'assistant',
              content: assistantContent,
            };
            return updatedMessages;
          }
          return [...prevMessages, { role: 'assistant', content: assistantContent }];
        });
      }
    } catch (error) {
      console.error('Error streaming from API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">

        {/* Chat Display */}
        <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-md h-[70vh] overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg whitespace-pre-wrap ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white self-end'
                    : 'bg-gray-700 text-gray-300 self-start'
                }`}
              >
                {message.content}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Start the conversation by typing or speaking below.
            </p>
          )}
        </div>

        {/* Input & Speech Section */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <textarea
              className="flex-grow p-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Type or speak your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={startRecording}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Stop Recording
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
