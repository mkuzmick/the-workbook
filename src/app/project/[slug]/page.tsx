import Airtable from 'airtable';
import Image from 'next/image';
import { Metadata } from 'next';

// Configure Airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN });
const base = airtable.base(process.env.AIRTABLE_REPORT_BASE!);

interface PageProps {
  params: { slug: string };
}

interface Project {
  name: string;
  description: string;
  imageUrl: string;
}

// Utility function to fetch a project by its slug
async function getProjectBySlug(slug: string): Promise<Project> {
  
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

// Page Component
export default async function Page({ params }: PageProps) {
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
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Project not found</div>;
  }
}

// Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

// Generate Static Params
export async function generateStaticParams() {
  const records = await base('Projects').select().all();

  return records.map((record) => ({
    slug: record.get('Slug') as string,
  }));
}
