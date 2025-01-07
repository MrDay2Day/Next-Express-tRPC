"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpcNextAPIClient } from "@/app/_trpc/client";

export default function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcNextAPIClient.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include", // Send cookies
            });
          },
        }),
      ],
    })
  );
  return (
    <trpcNextAPIClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcNextAPIClient.Provider>
  );
}
