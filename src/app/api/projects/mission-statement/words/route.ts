import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET(req: NextRequest) {
  try {
    console.log('req', req)
    // Initialize Airtable client

    const { searchParams } = new URL(req.url);

    // Convert searchParams to a plain object
    const queryParams = Object.fromEntries(searchParams.entries());
  
    // Log the JSON stringified query parameters
    console.log(JSON.stringify(queryParams, null, 2));
    // Initialize Airtable client
    const base = new Airtable({ apiKey: process.env.AIRTABLE_MISSION_TOKEN }).base(
      process.env.AIRTABLE_MISSION_BASE!
    );

    const tableName = 'CommonWords';

    // Fetch records from the Airtable base
    const records = await base(tableName)
      .select({ fields: ['WordOrPhrase'] })
      .all();

    // Extract words from records
    const words = records
      .map((record) => record.get('WordOrPhrase'))
      .filter(Boolean) as string[];

    return NextResponse.json({ words });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Airtable' },
      { status: 500 }
    );
  }
}
