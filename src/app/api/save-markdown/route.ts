import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const tempFolder = path.resolve(process.cwd(), "_temp");
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

// Helper function to format the timestamp
const formatTimestamp = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const ms = date.getMilliseconds().toString().padStart(3, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}.${ms}`;
};

export async function POST(req: Request) {
  try {
    const { content, initiationTime, submissionTime } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { message: "Invalid request, no markdown content provided." },
        { status: 400 },
      );
    }

    const yamlFrontmatter = `---
initiationTime:
  unix: ${initiationTime.unix}
  utc: ${initiationTime.utc}
  local: ${initiationTime.local}
submissionTime:
  unix: ${submissionTime.unix}
  utc: ${submissionTime.utc}
  local: ${submissionTime.local}
---

${content}`;

    const timestamp = formatTimestamp(new Date());
    const fileName = `markdown-${timestamp}.md`;
    const saveTo = path.join(tempFolder, fileName);

    fs.writeFileSync(saveTo, yamlFrontmatter);

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

export const runtime = "nodejs";
