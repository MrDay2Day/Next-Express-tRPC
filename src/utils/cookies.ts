// import "server-only";
// utils/cookies.ts
import { serialize, parse } from "cookie";
import { SignJWT, jwtVerify } from "jose";

// Secret key for signing cookies - in production, use a secure environment variable
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

// Cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
};

// Set a signed cookie
export async function setSignedCookie(
  name: string,
  value: unknown,
  options: Record<string, unknown> = {}
): Promise<string> {
  // Sign the value using JWT
  const token = await new SignJWT({ value })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  // Serialize the cookie
  const cookie = serialize(name, token, {
    ...COOKIE_OPTIONS,
    ...options,
  });

  // Set the cookie header
  return cookie;
}

// Verify and get a signed cookie value
export async function getSignedCookie(
  req: Request,
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  const cookies = parse(req.headers?.get("cookie") || "");
  const token = cookies[name];

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    return verified.payload.value;
  } catch (err) {
    console.log("getSignedCookie", err);
    return null;
  }
}
