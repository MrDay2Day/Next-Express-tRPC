import "server-only";
import { publicProcedure_next, router_next } from "../../../trpc";
import z from "zod";
import { setSignedCookie } from "@/utils/cookies";

export const AuthManagement = router_next({
  sign_in: publicProcedure_next //
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      // Set cookie options
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      };

      // Create cookie string
      const cookieString = await setSignedCookie(
        "auth-token",
        { email: "name@email.com" },
        cookieOptions
      );

      // Set cookie in respons e headers
      ctx.res?.setHeader("Set-Cookie", cookieString);

      return {
        valid: true,
        message: "Cookie set successfully",
        jwt: "SECURE_SIGNED_JWT",
      };
    }),
});
