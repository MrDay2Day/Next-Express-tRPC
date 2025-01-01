import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/app/trpc/trpc";

export const trpc = createTRPCProxyClient<AppRouter>({
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
});
