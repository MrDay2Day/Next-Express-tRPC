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

  // console.dir(
  //   {
  //     ctxHeaders: ctx.req?.headers,
  //     ctxCookies: ctx.req?.cookies,
  //   },
  //   { depth: "*" }
  // );

  // Check authorization header
  const authHeader = ctx.authHeader || ctx.req?.headers.get("authorization");

  console.log({ authHeader });

  if (authHeader && authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // If no auth header, check cookies
  if (!token && ctx.req?.cookies) {
    token = ctx.req?.cookies.get("auth-token")?.value;
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
      message: "Not Authorized!",
      cause: error,
    });
  }
});

// export const publicProcedure_next_auth = t.procedure.use(authMiddleware_trpc);
