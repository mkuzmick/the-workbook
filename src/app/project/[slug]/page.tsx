import Airtable from 'airtable';

type Props = {
  params: {
    slug: string;
  };
};

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
    name: record.get('Name'),
    description: record.get('Description'),
    imageUrl: record.get('ImageUrl'),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  try {
    const project = await getProjectBySlug(slug);

    return (
      <div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <img src={project.imageUrl} alt={project.name} />
      </div>
    );
  } catch (error) {
    return <div>Project not found</div>;
  }
}
