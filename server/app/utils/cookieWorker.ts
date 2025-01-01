import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import { SignJWT } from "jose";
// import { setSignedCookie } from "../../src/utils/cookies";
import { parse } from "cookie";
import { jwtVerify } from "jose";
dotenv.config();

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export default class CookieWorker {
  static async setCookie<T>(res: Response, title: string, data: T) {
    try {
      const expiry_days = 5;
      const expiry_date = 3600000 * 24 * expiry_days;

      const token = await new SignJWT({ data })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${expiry_days}d`)
        .sign(JWT_SECRET);

      res.cookie(title, token, {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expiry_date, // 5 days
        signed: true,
      });
      res.json({ valid: true });

      // const cookie: string = await setSignedCookie(
      //   // @ts-expect-error: ignore
      //   res,
      //   title,
      //   data,
      //   {
      //     httpOnly: true,
      //     sameSite: true,
      //     secure: process.env.NODE_ENV === "production",
      //     maxAge: 3600000 * 24 * 5, // 5 days
      //     signed: true,
      //   }
      // );
      // res.setHeader("Set-Cookie", cookie);
      // res.status(200).json({ valid: true });
    } catch (error) {
      throw error;
    }
  }

  static async validCookie(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies: { [key: string]: string } = req.cookies;
      const signedCookies = req.signedCookies;
      console.log({ cookies, signedCookies });

      // Validating Cookie with "cookieParser" to get signed cookies from sever.

      // // eslint-disable-next-line prefer-const
      let cookie: string = "";
      for (cookie in signedCookies) {
        const cookieData = signedCookies[cookie];

        if (cookieData) {
          const verified = await jwtVerify(cookieData, JWT_SECRET);
          console.log({ verified });
        }
      }
      return next();
    } catch (error) {
      throw error;
    }
  }
}
