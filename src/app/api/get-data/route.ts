import "server-only";
import { NextResponse } from "next/server";
import { catchErrorPromiseFunc } from "../../../utils/catchError";
import { fetchFromDatabase } from "../../../private/db_access";
import { composeMiddleware } from "../../../middleware/server/server_middlewares";
import { authMiddleware } from "../../../middleware/server/middlewares/authMiddleware";

async function handle_get() {
  try {
    const [_err, data] = await catchErrorPromiseFunc(fetchFromDatabase());
    if (_err) throw _err;

    NextResponse.json(data);

    const response = NextResponse.json(data);

    // Method 1: Setting cookies() method
    response.cookies.set({
      name: "secure_token",
      value: JSON.stringify({
        userId: "ew9c9g73497gf8634gx0",
        jwt: "yw8f982d.f08y902y7992hdb29hers.f3980y63",
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: "*",
    });

    /**
     * Method 2: Using headers (alternative approach)
     *
     * response.headers.set(
     *   'Set-Cookie',
     *   'cookieName=cookieValue; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800'
     * );
     *
     */

    return response;
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export const GET = composeMiddleware([authMiddleware])(handle_get);
