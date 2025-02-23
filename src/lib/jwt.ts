import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object, expiresIn: string = "1h"): string {
  // @ts-expect-error ---
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}
