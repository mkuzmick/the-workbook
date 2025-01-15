import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET(req: NextRequest) {
  try {
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
