import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRESQL_URI!,
  },
  //   dbCredentials: {
  //     user: "postgres",
  //     host: "localhost",
  //     database: "drizzle",
  //     password: "password",
  //     port: 5001,
  //     ssl: false,
  //   },
});
