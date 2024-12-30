export const dynamic = "force-dynamic";

export async function GET() {
  // Existing GET functionality
}

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    // Here, you could save content to a database or a file.
    // For simplicity, we'll just log it to the console.
    console.log("Markdown content received:", content);

    return new Response(
      JSON.stringify({ message: "Markdown saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error saving markdown:", error);
    return new Response(
      JSON.stringify({
        message: "Error saving markdown",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
