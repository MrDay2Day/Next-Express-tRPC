import "server-only";

import cookieParser from "cookie-parser";

export const cookieMiddleware = cookieParser(process.env.COOKIE_SECRET);
