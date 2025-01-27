import { NextResponse } from "next/server";
import Busboy from "busboy";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Disable body parser to allow busboy to handle the request body
export const config = {
  api: {
    bodyParser: false, // Required to process multipart form-data
  },
};

export async function POST(req: Request) {
  try {
    console.log("Received audio file");

    // Ensure the _temp folder exists
    const tempFolder = path.resolve(process.cwd(), "_temp");
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, { recursive: true });
    }

    // Process the multipart form-data using busboy
    const filePath = await new Promise<string>((resolve, reject) => {
      const busboy = Busboy({
        headers: {
          "content-type": req.headers.get("content-type") || "",
        },
      });

      busboy.on("file", (fieldname, file) => {
        const timestamp = Date.now();
        const saveTo = path.join(tempFolder, `recording-${timestamp}.webm`);
        const writeStream = fs.createWriteStream(saveTo);

        file.pipe(writeStream);

        file.on("end", () => {
          console.log(`Finished uploading: recording-${timestamp}.webm`);
        });

        writeStream.on("close", () => resolve(saveTo));
        writeStream.on("error", (err) => reject(err));
      });

      busboy.on("error", (err) => reject(err));

      const readable = req.body;
      if (!readable) {
        return reject(new Error("Request body is missing."));
      }

      // Pipe the Web Streams API request body into busboy
      const reader = readable.getReader();
      const stream = new Readable({
        async read() {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              this.push(null);
              break;
            }
            this.push(value);
          }
        },
      });

      stream.pipe(busboy); // Use the Node.js stream
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath,
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
