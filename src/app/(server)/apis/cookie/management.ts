import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getSignedCookie, setSignedCookie } from "@/utils/cookies";

export async function set_cookie_get() {
  // Set a signed cookie
  const response = new NextResponse(
    JSON.stringify({ message: "Cookie set successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

  const cookie = await setSignedCookie(response, "user-prefs", {
    theme: "dark",
    language: "en",
  });

  response.headers.set("Set-Cookie", cookie);

  return response;
}

export async function verify_cookie_post(request: NextRequest) {
  // Read and verify a signed cookie
  const userPrefs = await getSignedCookie(request, "user-prefs");

  if (!userPrefs) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid or missing cookie" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return new NextResponse(JSON.stringify({ userPrefs }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
