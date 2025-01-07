import { createTRPCReact } from "@trpc/react-query";

import { AppRouter_next } from "../(server)/api";

export const trpcNextAPIClient = createTRPCReact<AppRouter_next>();
