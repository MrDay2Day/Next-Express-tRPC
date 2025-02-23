import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { composeMiddleware } from "../../../middleware/server/server_middlewares";
import { catchError } from "@/utils/catchError";
import { ServerSocketConn } from "@/private/socket/socketConnect";

async function handle_get(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tick = searchParams.get("tick");
    const queryList = searchParams.entries();

    console.log({ tick, queryList });

    const [err, soc] = catchError(ServerSocketConn, []);
    if (!err && soc) {
      soc.socketEmitListen("to_all", tick);
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export const GET = composeMiddleware([])(handle_get);
