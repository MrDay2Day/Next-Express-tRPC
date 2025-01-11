import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const router_next = t.router;
export const publicProcedure_next = t.procedure;
