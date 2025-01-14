import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        // Add the prompt wrapper
        const prompt = `
        You are a helpful assistant that simplifies jargon. Given the following text, identify the most complex terms (about one word per 50 words of input, at least one word minimum). Explain their meanings in clear and concise markdown. Use headers (e.g., "## Term") for each term:
        ---
        ${text}
        `;

        const stream = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.5,
            max_tokens: 1024,
            stream: true,
        });

        // Stream the response back to the client
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    controller.enqueue(encoder.encode(content));
                }
                controller.close();
            },
            cancel() {
                stream.destroy();
            },
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Error processing Groq request:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to process the request' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
