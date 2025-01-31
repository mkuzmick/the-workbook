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
          content: 'You are a helpful assistant. Return exactly 15 words that are most relevant to the project described in the text you receive. Most of these words should come from the text themselves. Do not repeat words. Try to choose the most significant and unusual words. Please choose words that come from the academic field represented. Academic jargon is ok. Adhere strictly to the JSON schema: { words: string[] } with exactly 15 entries.',
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