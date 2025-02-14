import { AppRouter_next } from "../app/(server)/api/trpc/_trpc_functions/index";
import { createTRPCReact } from "@trpc/react-query";

export const trpcNextAPIServer = createTRPCReact<AppRouter_next>();
