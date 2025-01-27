import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  try {
    console.log('Received POST request for poem generation.');

    // Extract dynamic route parameter
    const url = new URL(req.url);
    const poemType = url.pathname.split('/').pop(); // Get the dynamic segment (e.g., "type")

    console.log(`Requested Poem Type: ${poemType}`);

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });

    const prompt = `Write a ${poemType} on a coding topic of your choice.`;
    console.log(`Calling Anthropic with prompt: ${prompt}`);

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const textContent = response.content?.[0]?.text;
    if (!textContent) {
      console.error('No text content received from API response.');
      throw new Error('No valid text content found in response.');
    }

    console.log('Poem generation successful. Returning response.');
    return NextResponse.json({
      message: 'Success',
      completion: textContent,
    });
  } catch (error) {
    console.error('Error in poem generation route:', error);
    return NextResponse.json(
      {
        message: 'Error calling Anthropics API',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
