import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const pg_db = drizzle(process.env.POSTGRESQL_URI!);
