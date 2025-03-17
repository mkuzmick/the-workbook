import { NextResponse } from "next/server";
import Airtable from "airtable";

// Initialize Airtable base
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

export async function POST(request) {
  console.log("API endpoint hit"); // Log when the API is hit
  try {
    // Parse the incoming JSON request body
    const body = await request.json();
    const { name, answers } = body;
    console.log("Received data:", { name, answers }); // Log the received data to verify payload

    // Validate the input
    if (!name || !Array.isArray(answers) || answers.length === 0) {
      console.error("Invalid input data received:", body);
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }
    
    // Build an array of record objects for batch creation
    const records = answers.map((answer) => ({
      fields: {
        Name: name,
        Notes: answer,
      },
    }));
    console.log("Records to send to Airtable:", records);

    // Airtable allows batch creation of up to 10 records per request.
    // Split records into chunks of 10.
    const chunkSize = 10;
    const responses = [];
    
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize);
      console.log(`Sending chunk [${i} to ${i + chunkSize}]:`, chunk);
      const response = await base("questions").create(chunk);
      console.log("Response for current chunk:", response);
      
      // Check if the response is an array or contains a records property
      if (Array.isArray(response)) {
        responses.push(...response);
      } else if (response && response.records) {
        responses.push(...response.records);
      } else {
        console.error("Unexpected response format, raw response:", response);
      }
    }
    
    // Log successful creation of records
    console.log("Successfully created records:", responses.map((r) => r.fields));
    return NextResponse.json({ result: responses.map((record) => record.fields) });
  } catch (error) {
    console.error("Error creating records in Airtable:", error);
    return NextResponse.json(
      { error: "Failed to create records in Airtable", details: error.message },
      { status: 500 }
    );
  }
}
