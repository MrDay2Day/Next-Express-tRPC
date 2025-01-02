import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const modules = [
  cors(),
  cookieParser("SECRET_KEY_HERE"),
  express.urlencoded({ extended: true }),
  express.json(),
];

export default modules;
