/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error: No error for importing this module
import * as rfs from "rotating-file-stream";
import path from "path";
// import { accessLogStream } from "../modules";

// Define interfaces for type safety
export interface ClientInfo {
  id: string;
  ip: string;
  userAgent: string;
}

interface LogEntry {
  timestamp: Date;
  clientId?: string;
  type: "info" | "error" | "warn";
  message: string;
  data?: {
    event: string;
    messageData: string;
    [key: string]: any;
  };
}

// Create rotating stream generator
const logDirectory = path.join(__dirname, "..", "..", "logs");

// Create rotating write streams
const accessLogStream = rfs.createStream("socketio-access.log", {
  interval: "1d", // Rotate daily
  path: logDirectory,
  size: "10M", // Rotate when size exceeds 10MB
  compress: "gzip", // Compress rotated files
});

const errorLogStream = rfs.createStream("socketio-error.log", {
  interval: "1d",
  path: logDirectory,
  size: "10M",
  compress: "gzip",
});

// Logger class
export default class SocketLogger {
  private writeLog(entry: LogEntry): void {
    const logLine =
      JSON.stringify({
        ...entry,
        timestamp: entry.timestamp.toISOString(),
      }) + "\n";

    if (entry.type === "error") {
      errorLogStream.write(logLine);
    } else {
      accessLogStream.write(logLine);
    }
  }

  info(id: string, message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date(),
      clientId: id,
      type: "info",
      message,
      data,
    });
  }

  error(id: string, message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date(),
      clientId: id,
      type: "error",
      message,
      data,
    });
  }

  warn(id: string, message: string, data?: any): void {
    this.writeLog({
      timestamp: new Date(),
      clientId: id,
      type: "warn",
      message,
      data,
    });
  }
}
