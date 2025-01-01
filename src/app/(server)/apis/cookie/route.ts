import "server-only";

import { composeMiddleware } from "@/middleware/server/server_middlewares";
import { set_cookie_get, verify_cookie_post } from "./management";

export const GET = composeMiddleware([])(set_cookie_get);
export const POST = composeMiddleware([])(verify_cookie_post);
