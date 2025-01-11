import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter_next } from "../_trpc_functions/index";

const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter_next,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
