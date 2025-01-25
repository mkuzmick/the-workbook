import Airtable from 'airtable';
import Image from 'next/image'; // Import the Image component
import { Metadata } from 'next';

interface Params {
  slug: string;
}

// Configure Airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN });
const base = airtable.base(process.env.AIRTABLE_REPORT_BASE!);

async function getProjectBySlug(slug: string) {
  const records = await base('Projects')
    .select({
      filterByFormula: `{Slug} = "${slug}"`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) {
    throw new Error('No project found');
  }

  const record = records[0];
  return {
    name: record.get('Name') as string,
    description: record.get('Description') as string,
    imageUrl: record.get('ImageUrl') as string,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;

  try {
    const project = await getProjectBySlug(slug);

    return (
      <div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>

        {/* Use a responsive container for the image */}
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <Image
            src={project.imageUrl}
            alt={project.name}
            layout="fill" // Makes the image fill the parent container
            objectFit="cover" // Adjust the behavior (e.g., "contain", "cover", etc.)
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Project not found</div>;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug);

    return {
      title: project.name,
      description: project.description,
      openGraph: {
        images: [project.imageUrl],
      },
    };
  } catch {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
}
