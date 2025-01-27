import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const stream = await groq.chat.completions.create({
            messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: true,
        });

        // Stream the response back to the client
        const encoder = new TextEncoder();
        let cancelled = false;
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    if (cancelled) {
                        break; // Exit the loop if cancelled
                    }
                    const content = chunk.choices[0]?.delta?.content || '';
                    controller.enqueue(encoder.encode(content));
                }
                controller.close();
            },
            cancel() {
                cancelled = true;
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
        console.error('Error calling Groq API:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch response from Groq API' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
