import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../app/trpc/trpc";
import * as SuperJSON from "../../utilities/superjson/dist";

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
  transformer: SuperJSON,
});
