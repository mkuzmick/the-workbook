import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { IncomingMessage } from "http";
import { Readable } from "stream";

// Disable body parser to allow formidable to handle the request body
export const config = {
  api: {
    bodyParser: false, // Required to process multipart form-data
  },
};

// Helper to convert Web Streams API request to Node.js IncomingMessage
function toNodeJsRequest(req: Request): IncomingMessage {
  const contentType = req.headers.get("content-type");
  if (!contentType) throw new Error("Missing content-type header.");

  const bodyStream = Readable.from(req.body ?? []);
  const nodeReq = Object.assign(bodyStream, {
    headers: {
      "content-type": contentType,
      "content-length": req.headers.get("content-length") || "0",
    },
    method: req.method,
    url: req.url,
  }) as unknown as IncomingMessage;

  return nodeReq;
}

export async function POST(req: Request) {
  try {
    console.log("Received audio file");

    // Ensure the _temp folder exists
    const tempFolder = path.resolve(process.cwd(), "_temp");
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }

    // Configure formidable
    const form = formidable({
      uploadDir: tempFolder,
      keepExtensions: true,
      filename: (name, ext) => `recording-${Date.now()}${ext}`,
    });

    // Convert the Web Streams API request to a Node.js-readable request
    const nodeReq = toNodeJsRequest(req);

    // Parse the file
    const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    });

    if (!files.audio) {
      throw new Error("No file uploaded");
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: files.audio.filepath,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { message: "Error saving file", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs"; // Ensure Node.js runtime for file system operations
