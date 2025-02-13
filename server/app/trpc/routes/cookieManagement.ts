import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../config";

const CookieManagement = router({
  // Set cookies
  setCookie: publicProcedure.query(({ ctx }) => {
    try {
      console.log({ ctx });
      // Signed cookies - Very secure
      // ctx.res.cookie("sign_demo_cookie", "signed_cookie_string_here", {
      //   httpOnly: false,
      //   secure: false,
      //   sameSite: true,
      //   signed: true,
      // });
      // // Regular Cookie - Somewhat secure
      // ctx.res.cookie("demo_cookie", "cookie_string_here", {
      //   httpOnly: false,
      //   secure: false,
      //   sameSite: true,
      //   signed: false,
      // });
      // console.log(ctx.req.cookies, ctx.req.signedCookies);
      return { success: true };
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cookie setting error.",
        cause: error,
      });
    }
  }),
  // Get Cookies
  getCookie: publicProcedure.query(({ ctx }) => {
    try {
      console.log({ ctx });
      return {
        valid: true,
        // regular: ctx.req.cookies,
        // signed: ctx.req.signedCookies,
      };
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Get cookie error.",
        cause: error,
      });
    }
  }),
});

export default CookieManagement;
