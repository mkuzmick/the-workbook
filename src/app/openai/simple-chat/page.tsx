'use client';

import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();

            if (response.ok) {
                const assistantMessage: Message = data.message;
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                console.error('Error from API:', data.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
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
                            Start the conversation by typing below.
                        </p>
                    )}
                </div>

                {/* Input Section */}
                <div className="flex gap-2 items-center">
                    <textarea
                        className="flex-grow p-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Type your message..."
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
            </div>
        </main>
    );
}
