import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ensure the _temp folder exists
const tempFolder = path.resolve(process.cwd(), "_temp");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

export async function POST(req: Request) {
  try {
    // Parse the JSON content from the request
    const { content } = await req.json();

    // Validate the content
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { message: "Invalid request, no markdown content provided." },
        { status: 400 },
      );
    }

    // Create a unique timestamped filename for the markdown file
    const timestamp = Date.now();
    const fileName = `markdown-${timestamp}.md`;
    const saveTo = path.join(tempFolder, fileName);

    // Write the markdown content to a file
    fs.writeFileSync(saveTo, content);

    console.log(`Markdown saved to: ${fileName}`);

    return NextResponse.json({
      message: "Markdown file saved successfully",
      filePath: saveTo,
    });
  } catch (error) {
    console.error("Error saving markdown:", error);
    return NextResponse.json(
      { message: "Error saving markdown", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs"; // Ensure Node.js runtime for file system operations
