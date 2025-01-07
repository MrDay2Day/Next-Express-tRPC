import { AppRouter_next } from "../../app/(server)/api/index";
import { createTRPCReact } from "@trpc/react-query";

export const trpcNextAPIServer = createTRPCReact<AppRouter_next>();
