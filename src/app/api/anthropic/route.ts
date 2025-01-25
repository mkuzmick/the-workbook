import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  try {
    // Log the incoming request
    console.log("Incoming request:", req);

    // Parse the request body
    const { input } = await req.json();
    console.log("Parsed input from request body:", input);

    if (!input || typeof input !== "string") {
      console.error("Invalid request, no input provided.");
      return NextResponse.json(
        { message: "Invalid request, no input provided." },
        { status: 400 }
      );
    }

    // Initialize the Anthropics SDK
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "", // Ensure this is set in your .env.local
    });

    console.log("Calling Anthropics API with input:", input);

    // Send the input to the Anthropics API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: input }],
    });

    console.log("Response from Anthropics API:", JSON.stringify(response, null, 2));

    // Extract and return the text content from the first content block
    const textContent = response.content?.[0]?.text;

    if (!textContent) {
      console.error("No valid text content found in response.");
      return NextResponse.json(
        { message: "No valid response from Anthropics API." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Success",
      completion: textContent,
    });
  } catch (error) {
    console.error("Error calling Anthropics API:", error);
    return NextResponse.json(
      { message: "Error calling Anthropics API", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
