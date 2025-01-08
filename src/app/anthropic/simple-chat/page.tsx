'use client';

import { useState } from 'react';

export default function Page() {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const callAnthropicAPI = async () => {
        setLoading(true);
        setOutput('');
        console.log('Calling Anthropics API with input:', input);

        try {
            const response = await fetch('/api/anthropic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            console.log('Response received:', response);

            const data = await response.json();

            console.log('Response JSON data:', data);

            if (response.ok) {
                setOutput(data.completion);
                console.log('Output set to:', data.completion);
            } else {
                setOutput(`Error: ${data.message}`);
                console.error('API returned an error:', data.message);
            }
        } catch (error) {
            console.error('Error calling API route:', error);
            setOutput('An error occurred while calling the API.');
        } finally {
            setLoading(false);
            console.log('Loading state set to false.');
        }
    };

    return (
        <main className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-6">
                {/* Input Section */}
                <div className="w-full md:w-1/2 bg-zinc-800 p-6 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Test Anthropics API</h1>
                    <textarea
                        className="w-full text-gray-300 bg-slate-700 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={8}
                        placeholder="Enter your input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        onClick={callAnthropicAPI}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>

                {/* Output Section */}
                <div className="w-full md:w-1/2 bg-zinc-800 p-6 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Output</h2>
                    <div className="bg-slate-700 p-4 border border-gray-300 rounded-lg min-h-[160px]">
                        {loading ? (
                            <p className="text-gray-200">Loading...</p>
                        ) : output ? (
                            <p>{output}</p>
                        ) : (
                            <p className="text-gray-200">No output yet. Submit your input to see the result.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
