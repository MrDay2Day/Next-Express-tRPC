/**
 * User Authentication middleware
 */

import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

async function verifyToken(token: string) {
  console.log({ token });
  // Implement your token verification logic here
  return {
    id: "user_id",
    role: "user",
  };
}

export const authMiddleware_trpc = t.middleware(async ({ ctx, next }) => {
  let token: string | undefined;

  // Check authorization header
  const authHeader = ctx.req?.headers["authorization"];
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // If no auth header, check cookies
  if (!token && ctx.req?.cookies) {
    token = ctx.req?.cookies["auth-token"];
  }

  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  try {
    // Verify the token and get user data
    const userData = await verifyToken(token);

    // Continue with enhanced context
    return next({
      ctx: {
        ...ctx,
        user: userData,
        token,
        auth: {
          header: ctx.authHeader,
        },
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token",
      cause: error,
    });
  }
});

// export const publicProcedure_next_auth = t.procedure.use(authMiddleware_trpc);
