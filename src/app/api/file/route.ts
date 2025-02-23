/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import { composeMiddleware } from "@/middleware/server/server_middlewares";

/* DEMO - Does not work in serverless environment. */
import fs from "fs";
import path from "path";

const pump = promisify(pipeline);

function webToNodeStream(webStream: ReadableStream): Readable {
  return Readable.fromWeb(webStream as any);
}

const dir: string[] = ["..", "..", "..", "..", "uploads"];

async function handle_post(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Content type must be multipart/form-data",
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.getAll("files")[0] as File;

    if (!file) {
      throw new Error("No file uploaded");
    }

    if (!isValidFile(file)) {
      throw new Error("Invalid file format");
    }

    const newFileName = `${Date.now()}.${file.name}`;

    const fileStream = webToNodeStream(file.stream());
    const writeStream = fs.createWriteStream(
      path.join(__filename, ...dir, newFileName)
    );

    await pump(fileStream, writeStream);

    return NextResponse.json({
      status: "success",
      data: file.size,
      fileName: newFileName,
    });
  } catch (e) {
    console.log({ e });
    return NextResponse.json(
      { status: "fail", data: e, err: true },
      { status: 400 }
    );
  }
}

// Type guard to check if the object has the required file properties
function isValidFile(
  file: unknown
): file is { name: string; size: number; stream: () => ReadableStream } {
  return (
    typeof file === "object" &&
    file !== null &&
    "name" in file &&
    "size" in file &&
    "stream" in file &&
    typeof (file as any).name === "string" &&
    typeof (file as any).size === "number" &&
    typeof (file as any).stream === "function"
  );
}

async function handle_get(req: NextRequest) {
  try {
    const fileName = req.nextUrl.searchParams.get("filename");

    if (!fileName) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Filename is required",
        },
        { status: 400 }
      );
    }

    const filePath = path.join(__filename, ...dir, fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          status: "fail",
          message: "File not found",
        },
        { status: 404 }
      );
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Get file mime type or default to 'application/octet-stream'
    const mimeType = getMimeType(fileName);

    // Create and return response with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (e) {
    console.log({ e });
    return NextResponse.json(
      {
        status: "fail",
        message: "Error retrieving file",
        error: e,
      },
      { status: 500 }
    );
  }
}

// Helper function to determine MIME type
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".zip": "application/zip",
  };

  return mimeTypes[ext] || "application/octet-stream";
}

export const POST = composeMiddleware([])(handle_post);
export const GET = composeMiddleware([])(handle_get);
