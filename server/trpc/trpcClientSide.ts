import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../app/trpc/trpc";
// @ts-expect-error works
import { superjsonExport } from "../app/trpc/module";

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
  // @ts-expect-error works
  transformer: superjsonExport,
});
