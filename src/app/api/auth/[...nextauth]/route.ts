import NextAuth from "next-auth";
import authOptions from "../NextAuthOptions";

// Use NextAuth directly as a handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
