import "server-only";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter_next } from "../_trpc_functions/index";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter_next,
    createContext: () => ({ req: null, res: null, authHeader: undefined }),
  });
};

export { handler as GET, handler as POST };
