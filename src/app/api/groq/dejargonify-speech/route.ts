import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// interface ChatCompletionMessageParam {
//   role: 'system' | 'user' | 'assistant' | 'function';
//   content?: string; // Optional for 'function'
//   // name?: string;    // Required for 'function'
// }

type GroqMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { completeText, newText } = await req.json();

    // Take only the most recent 300 words for context
    const trimmedCompleteText = completeText
      .split(/\s+/)
      .slice(-300)
      .join(' ');

      const messages: GroqMessage[] = [
        {
          role: 'system',
          content: `
             You are an assistant that identifies "difficult" or specialized words 
             that a typical college student might not know. The user provides:
               1. trimmedCompleteText (last 300 words of context)
               2. newText (the latest ~5 words)
             
             Instructions:
               - ONLY return newly discovered words that seem difficult or jargony.
               - If you find no new difficult words, respond with the literal string "false".
               - If you find new difficult words, respond with a valid JSON array of objects.
                 Each object has the form: { "word": "...", "definition": "..." }.
               - Keep definitions short and understandable by a typical college student.
           `,
        },
        {
          role: 'user',
          content: `trimmedCompleteText: 
          ${JSON.stringify(trimmedCompleteText)} 
          --------------------- \newText: ,
          ${JSON.stringify(newText)}`
          })
        }
      ];
      

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: true,
    });

    // Stream the response back
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
    console.error('Error calling Groq API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch response from Groq API' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}