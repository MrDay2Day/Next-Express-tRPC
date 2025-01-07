import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
// import * as fs from "fs";
import * as path from "path";

// @ts-expect-error: No error for importing this module
import { createStream } from "rotating-file-stream"; // Import rotating-file-stream

console.log({ createStream });
// Create a rotating write stream
export const accessLogStream = createStream("access.log", {
  interval: "1d", // Rotate daily
  size: "10M", // Maximum file size before rotating
  path: path.join(__dirname, "..", "logs"), // Directory for logs
  compress: "gzip", // Compress rotated files
});

// Configure morgan to use the rotating stream
export const serverLogs = morgan("combined", { stream: accessLogStream });
const modules = [
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
  express.urlencoded({ extended: true, parameterLimit: 20 }),
  express.json({ limit: "50mb" }),
  compression({ level: 9 }),
  cookieParser(process.env.COOKIE_SECRET),
];

export default modules;
