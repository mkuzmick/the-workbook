import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET(req: NextRequest) {
  try {
    // Initialize Airtable client
    const base = new Airtable({ apiKey: process.env.AIRTABLE_MISSION_TOKEN }).base(
      process.env.AIRTABLE_MISSION_BASE!
    );

    const tableName = 'CoolPhrases';

    // Fetch records from the Airtable base
    const records = await base(tableName)
      .select({ fields: ['Phrase'] })
      .all();

    console.log('records:', records);
    // Extract phrases from records
    const phrases = records
      .map((record) => record.fields?.Phrase)
      .filter(Boolean) as string[];

    return NextResponse.json({ phrases });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Airtable' },
      { status: 500 }
    );
  }
}
