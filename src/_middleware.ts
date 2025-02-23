import { NextResponse, NextRequest } from "next/server";

// import { withAuth } from "next-auth/middleware";

// export const runtime = "experimental-edge";

// export default withAuth({
//   pages: {
//     signIn: "/api/auth/signin",
//   },
// });

// export const config = {
//   matcher: [
//     // Protected routes
//     "/authenticated",
//     "/dashboard/:path*",
//     "/profile/:path*",
//   ],
// };

// -->> Redirect Method 1
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

type ExtendRequest = NextRequest & {
  name?: string;
};

export function middleware(request: ExtendRequest) {
  try {
    // console.log(`\nMIDDLEWARE TRIGGERED - ${count}\n`);

    // The next function to push to request through the pipeline
    const res = NextResponse.next();

    // -->> Redirect Method 2
    // if (request.nextUrl.pathname === "/test_1") {
    //   return NextResponse.redirect(new URL("/server/comments", request.url));
    // }

    // Access cookies with middleware
    const themePreference = request.cookies.get("theme");
    // const secureToken = request.cookies.get("secure_token"); // fetch other cookies

    // console.log({ themePreference, secureToken });

    // Fetch preferences if user is logged in
    if (!themePreference) {
      res.cookies.set("theme", "dark", {
        // Cookie security options
        httpOnly: true, // Prevents JavaScript access
        secure: true, // Only sent over HTTPS
        sameSite: "strict", // CSRF protection

        // Cookie lifetime options
        // maxAge: 3600, // Time in seconds
        // expires: new Date(), // Specific date

        // Cookie scope options
        path: "*", // Cookie path
        // domain: "example.com", // Cookie domain
      });
    }

    // Creating Custom Header
    res.headers.set("Custom-Header", "day2day-123456");

    // Passing request down the pipeline
    return res;
  } catch (error) {
    console.log("middleware error", { error });
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
