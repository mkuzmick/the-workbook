import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define a Zod schema for the word object
const WordSchema = z.object({
  text: z.string(),
});

// Define a Zod schema for the structured output
const WordsSchema = z.object({
  words: z.array(WordSchema),
});

export async function POST(req: NextRequest) {
  try {
    const { songTitle, lyrics } = await req.json();

    if (!songTitle || !lyrics) {
      return NextResponse.json(
        { error: 'Missing "songTitle" or "lyrics" in request body' },
        { status: 400 }
      );
    }

    // Call OpenAI API with structured output
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that generates word lists for a Taylor Swift song guessing game.

          Your task is to select **10 words** from the provided lyrics. The words should be ordered **from most generic or tricky to most specific or recognizable**.

          - The **first few words** should be very common, vague, or misleading.
          - The **middle words** should be somewhat distinct but not obvious.
          - The **last few words** should be highly recognizable and make guessing the song easier.

          Avoid including the actual song title in your words. Respond strictly in JSON format using the schema: { words: [{ text: string }] } with exactly 10 entries.`,
        },
        {
          role: 'user',
          content: `Lyrics for "${songTitle}":\n\n${lyrics}`,
        },
      ],
      response_format: zodResponseFormat(WordsSchema, 'lyric_words'),
    });

    console.log('OpenAI Response:', completion);

    const result = completion.choices[0]?.message;
    if (!result || result.refusal) {
      console.error('OpenAI Refusal:', result?.refusal || 'No response message');
      return NextResponse.json(
        { error: 'Model refused to respond', refusal: result?.refusal || 'Unknown refusal' },
        { status: 403 }
      );
    }

    // Get the words from the AI response
    const words = result.parsed?.words || [];

    // Process each word to check if it appears in the lyrics
    const lowerLyrics = lyrics.toLowerCase();
    const processedWords = words.map(({ text }) => ({
      text: text.trim(),
      hallucinated: !lowerLyrics.includes(text.trim().toLowerCase())
    }));

    // Log for debugging
    console.log('Processed words with hallucination status:', processedWords);

    // Return all words with their hallucination status
    return NextResponse.json({
      words: processedWords,
    });

  } catch (error: any) {
    console.error('Error calling OpenAI API:', error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to fetch response from OpenAI API: ${error.message}` },
      { status: 500 }
    );
  }
}