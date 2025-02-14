import "server-only";
import { NextResponse } from "next/server";
import { composeMiddleware } from "@/middleware/server/server_middlewares";
import { generateDatabase } from "../../../../../cloudflare/config/config";

async function handle_get() {
  try {
    const DB = (await generateDatabase()) as D1Database;
    console.log({ DB });
    const { results } = await DB.prepare("SELECT * FROM Customers").all();
    console.log({ results });
    return NextResponse.json({ valid: true, results });
  } catch (error) {
    console.log({ error });
    const err = error as Error;
    return NextResponse.json({ valid: false, error: err.message });
  }
}

export const GET = composeMiddleware([])(handle_get);
