// app/api/cards/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET(req: NextRequest) {
  console.log('[API] /api/cards endpoint called');

  try {
    // Log environment variables (be cautious in production)
    console.log('[API] Environment variables:', {
      AIRTABLE_CREATURE_API_TOKEN: process.env.AIRTABLE_CREATURE_API_TOKEN,
      AIRTABLE_CREATURE_BASE_ID: process.env.AIRTABLE_CREATURE_BASE_ID,
    });

    // Ensure you're using the correct variables:
    const apiKey = process.env.AIRTABLE_CREATURE_API_TOKEN;
    const baseId = process.env.AIRTABLE_CREATURE_BASE_ID;
    console.log('[API] Initializing Airtable with API Key:', apiKey, 'and Base ID:', baseId);

    const base = new Airtable({ apiKey }).base(baseId!);

    console.log('[API] Fetching records from table _CreatureImages, restricted to view "CreatureImages"');
    // Use the view option to restrict records and fetch all fields
    const records = await base('_CreatureImages')
      .select({ view: 'CreatureImages' })
      .all();
    console.log(`[API] Fetched ${records.length} records`);

    if (records.length > 0) {
      console.log('[API] Fields for first record:', records[0].fields);
    }

    // Process each record and log all fields
    const cards = records.map((record) => {
      console.log('[API] Processing record:', record.fields);
      return {
        id: record.id,
        fields: record.fields, // return all fields so you can inspect them
      };
    });
    console.log('[API] Cards created (first 5):', cards.slice(0, 5));

    return NextResponse.json({ cards });
  } catch (error: any) {
    console.error('[API] Error fetching data from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Airtable', message: error.message },
      { status: 500 }
    );
  }
}
