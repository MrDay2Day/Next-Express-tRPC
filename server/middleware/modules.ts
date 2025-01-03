import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";

const modules = [
  cors({
    origin: true,
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  express.json(),
  compression(),
  cookieParser(process.env.COOKIE_SECRET),
  morgan("combined"),
];

export default modules;
