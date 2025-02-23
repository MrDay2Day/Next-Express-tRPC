import "server-only";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter_next } from "../_trpc_functions/main";
import { NextRequest } from "next/server";
import { GetTRPCCallerTypes } from "@/app/_trpc/config/trpc_types";

const handler = async (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter_next,
    createContext: (): GetTRPCCallerTypes => ({
      req,
      res: null,
      authHeader: undefined,
    }),
  });
};

export { handler as GET, handler as POST };
