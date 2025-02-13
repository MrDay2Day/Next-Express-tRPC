import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../app/trpc/trpc";
// @ts-expect-error works
import { superjsonExport } from "../app/trpc/module";

const PORT = process.env.PORT;
console.log({ PORT });

export const trpcServerSide = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${
        process.env.NODE_ENV === "production"
          ? process.env.SERVER_URL
          : `http://localhost:${process.env.PORT}`
      }/server/trpc`,
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
