// components/CarouselServer.tsx
import CarouselClient from './CarouselClient';
import Airtable from 'airtable';

export type Card = {
  id: string;
  name: string;
  imageUrl: string;
};

export default async function CarouselServer() {
  // Initialize Airtable. Ensure your environment variables are set:
  // AIRTABLE_CREATURE_BASE_ID and AIRTABLE_CREATURE_API_TOKEN.
  const base = new Airtable({ apiKey: process.env.AIRTABLE_CREATURE_BASE_ID }).base(
    process.env.AIRTABLE_CREATURE_API_TOKEN!
  );

  // Replace '_CreatureImages' with your table name and adjust the field names as needed.
  const records = await base('_CreatureImages')
    .select({ fields: ['CreatureName', 'SlackUrl'] })
    .all();

  const initialCards: Card[] = records.map((record) => ({
    id: record.id,
    name: record.get('CreatureName') as string,
    imageUrl: (record.get('SlackUrl') as string) || '',
  }));

  return <CarouselClient initialCards={initialCards} />;
}
