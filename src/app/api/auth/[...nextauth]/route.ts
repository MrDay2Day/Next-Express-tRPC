import NextAuth from "next-auth";
import authOptions from "../NextAuthOptions";
import { composeMiddleware } from "@/middleware/server/server_middlewares";

// Use NextAuth directly as a handler
const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
export const GET = composeMiddleware([])(handler);
export const POST = composeMiddleware([])(handler);
