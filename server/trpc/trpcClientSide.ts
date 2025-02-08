import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../app/trpc/trpc";
import superjson from "superjson";

export const trpcClientSide = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `/server/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include", // Send cookies
        });
      },
    }),
  ],
  transformer: superjson,
});
