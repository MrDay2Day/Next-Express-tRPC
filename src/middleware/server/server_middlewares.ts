import "server-only";
import { NextRequest, NextResponse } from "next/server";

export type RouteHandler = (
  request: NextRequest
) => Promise<NextResponse> | NextResponse;
export type MiddlewareFunction = (handler: RouteHandler) => RouteHandler;

export function composeMiddleware(middlewares: MiddlewareFunction[]) {
  return (handler: RouteHandler) => {
    return middlewares.reduceRight((prevHandler, middleware) => {
      return middleware(prevHandler);
    }, handler);
  };
}

export interface AuthenticatedRequest {
  user?: {
    id: string;
    role: string;
  };
}
