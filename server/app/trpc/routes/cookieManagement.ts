import { publicProcedure, router } from "../config";

const CookieManagement = router({
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
  getCookie: publicProcedure.query(({ ctx }) => {
    console.log(ctx.req.cookies, ctx.req.signedCookies);
    return {
      regular: ctx.req.cookies,
      signed: ctx.req.signedCookies,
    };
  }),
});

export default CookieManagement;
