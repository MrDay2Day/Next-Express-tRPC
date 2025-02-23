NextAuth Error:
NextJs 15
Error: This action with HTTP GET is not supported by NextAuth.js

src/
app/
api/
auth/
NextAuthOptions.ts
[...auth]/
route.ts

// route.ts
import NextAuth from "next-auth";
import authOptions from "../NextAuthOptions";

// Use NextAuth directly as a handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// NextAuthOptions.ts
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import { JWT } from "next-auth/jwt";
import { signJwt } from "@/lib/jwt";

type SessionType = Session &
Partial<{
accessToken?: string;
}>;

console.log({
clientId: process.env.GOOGLE_CLIENT_ID!,
clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const authOptions: AuthOptions = {
providers: [
GoogleProvider({
clientId: process.env.GOOGLE_CLIENT_ID!,
clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
}),
],
callbacks: {
async jwt({ token, user, account }) {
if (account) {
token.accessToken = signJwt({ email: user?.email }, "1h"); // Custom JWT
}
return token;
},
async session({
session,
token,
}: {
session: Session & Partial<{ accessToken: string }>;
token: JWT;
}) {
// -@ts-expect-error ---
session.accessToken = token.accessToken as string;
return session;
},
},
session: {
strategy: "jwt",
},
pages: {
signIn: "/api/auth/signin",
},
secret: process.env.NEXTAUTH_SECRET!,
};

export default authOptions;
