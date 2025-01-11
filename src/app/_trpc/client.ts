import { createTRPCReact } from "@trpc/react-query";

import { AppRouter_next } from "../(server)/api/trpc/_trpc_functions";

export const trpcNextAPIClient = createTRPCReact<AppRouter_next>();
