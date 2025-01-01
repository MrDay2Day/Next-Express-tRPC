import "server-only";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { RouteHandler } from "../server_middlewares";

export function authMiddleware(handler: RouteHandler) {
  return async (request: NextRequest) => {
    const headersList = await headers();
    const authToken = headersList.get("authorization");

    // Authentication middleware
    console.log({ authToken });
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      // Verify token here
      // This is where you'd normally verify a JWT or session
      const user = {
        id: "user123",
        role: "admin",
      };

      // Store user in the headers for the route handler
      const response = await handler(request);
      response.headers.set("x-user-id", user.id);
      response.headers.set("x-user-role", user.role);

      return response;
    } catch (error) {
      console.error("Middleware Error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
