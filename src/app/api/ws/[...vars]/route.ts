import "server-only";

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ vars: string[] }>;
}

async function ws_handler_get(req: NextRequest, context: RouteContext) {
  // Await the params Promise
  const params = await context.params;
  console.log({ params });

  return NextResponse.json({ params, date: new Date() }, { status: 200 });
}

export const GET = ws_handler_get;
