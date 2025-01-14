import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define a Zod schema for the structured output
const WordsSchema = z.object({
    words: z.array(z.string()), // No length constraints here
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing "prompt" in request body' },
        { status: 400 }
      );
    }

    // Call OpenAI API with structured output
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06', // Use a compatible model
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Return exactly 15 words related to the academic discipline provided in the user prompt. If it is cultural (like an author or musician) try to include some of the one-word titles of works they are associated with. Try to be both generic and specific, both serious and a little playful in your choices. Adhere strictly to the JSON schema: { words: string[] } with exactly 15 entries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: zodResponseFormat(WordsSchema, 'academic_words'),
    });

    const result = completion.choices[0].message;

    if (result.refusal) {
      return NextResponse.json(
        { error: 'Model refused to respond', refusal: result.refusal },
        { status: 403 }
      );
    }

    return NextResponse.json({
      words: result.parsed.words,
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response from OpenAI API' },
      { status: 500 }
    );
  }
}