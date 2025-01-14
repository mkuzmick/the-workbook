import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages,
        });

        // Log the entire completion object to the server console
        console.log('OpenAI completion response:', JSON.stringify(completion, null, 2));

        const responseMessage = completion.choices[0].message;

        return NextResponse.json({ message: responseMessage });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch response from OpenAI API' },
            { status: 500 }
        );
    }
}
