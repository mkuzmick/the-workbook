import Airtable from 'airtable';
import Image from 'next/image';
// import { Metadata } from 'next';

// Configure Airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN });
const base = airtable.base(process.env.AIRTABLE_REPORT_BASE!);

interface Project {
  name: string;
  description: string;
  imageUrl: string;
}

async function getProjectBySlug(slug: string): Promise<Project> {
  try {
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
  } catch (error) {
    console.error(`Error fetching project by slug "${slug}":`, error);
    throw error; // Re-throw the error so it can be handled by the caller
  } finally {
    console.log(`Finished attempting to fetch project by slug "${slug}"`);
    // Add any cleanup logic here, if necessary
  }
}

// Page Component
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // Correctly await params

  if (!slug) {
    console.error("Slug is undefined.");
    return <div>Project not found</div>;
  }

  try {
    const project = await getProjectBySlug(slug);

    return (
      <div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div style={{ position: "relative", width: "100%", height: "400px" }}>
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering project with slug "${slug}":`, error);
    return <div>Project not found</div>;
  }
}

// // Metadata Function
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const { slug } = await params; // Correctly await params

//   if (!slug) {
//     return {
//       title: 'Project Not Found',
//       description: 'The requested project could not be found.',
//     };
//   }

//   try {
//     const project = await getProjectBySlug(slug);

//     return {
//       title: project.name,
//       description: project.description,
//       openGraph: {
//         images: [project.imageUrl],
//       },
//     };
//   } catch {
//     return {
//       title: 'Project Not Found',
//       description: 'The requested project could not be found.',
//     };
//   } finally {
//     console.log(`Finished attempting to generate metadata for slug: "${slug}"`);
//   }
// }

// Static Params
export async function generateStaticParams() {
  const records = await base('Projects').select().all();

  return records.map((record) => ({
    slug: record.get('Slug') as string,
  }));
}
