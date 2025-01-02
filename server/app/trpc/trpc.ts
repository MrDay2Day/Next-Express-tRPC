/**
 * Main Routes for tRPC Server
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Create middleware for logging
const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;
  console.log(`Method: ${type} | Function: ${path} | Duration: ${duration}ms`);
  return result;
});

// Create router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure.use(loggerMiddleware);

// Define types for our user data
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

let count = 1;
// Mock database
const users: User[] = [
  { id: count++, name: "Alice", email: "alice@example.com" },
  { id: count++, name: "Bob", email: "bob@example.com" },
];

// Create the router with two routes
export const appRouter = router({
  // Route 1: Get all users
  getUsers: publicProcedure.query(async () => {
    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return users;
  }),

  // Route 2: Manipulation of data, CREATE & DELETE
  userManagement: router({
    createUser: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
        })
      )
      .mutation(async ({ input }) => {
        const newUser: User = {
          id: count++,
          name: input.name,
          email: input.email,
        };

        users.push(newUser);
        return newUser;
      }),
    deleteUser: publicProcedure
      .input(z.object({ name: z.string().min(3, "3 or more characters") }))
      .mutation(async ({ input }) => {
        let found = false;
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user && user.name == input.name) {
            found = true;
            users.splice(i, 1);
            return "Deleted user " + input.name;
          }
        }

        if (!found) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User's name not found.",
          });
        }
      }),
  }),
  // Cookie Management
  cookies: router({
    // Set cookies
    setCookie: publicProcedure.query(({ ctx }) => {
      // Signed cookies - Very secure
      ctx.res.cookie("sign_demo_cookie", "signed_cookie_string_here", {
        httpOnly: false,
        secure: false,
        sameSite: true,
        signed: true,
      });
      // Regular Cookie - Somewhat secure
      ctx.res.cookie("demo_cookie", "cookie_string_here", {
        httpOnly: false,
        secure: false,
        sameSite: true,
        signed: false,
      });
      console.log(ctx.req.cookies, ctx.req.signedCookies);
      return { success: true };
    }),
    // Get Cookies
    getCookie: t.procedure.query(({ ctx }) => {
      console.log(ctx.req.cookies, ctx.req.signedCookies);
      return {
        regular: ctx.req.cookies,
        signed: ctx.req.signedCookies,
      };
    }),
  }),
});

// Export type router type signature
export type AppRouter = typeof appRouter;
