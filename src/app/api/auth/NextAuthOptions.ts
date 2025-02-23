import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

import { JWT } from "next-auth/jwt";
import { signJwt } from "@/lib/jwt";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //  callbacks: {
  //     async session({ session, token, user }) {
  //       if (session?.user) {
  //         session.user.id = token?.id as string;
  //       }
  //       // @ts-expect-error --
  //       session.accessToken = token?.accessToken
  //       // @ts-expect-error --
  //       session.provider = token?.account?.provider
  //       return session
  //     },
  //     async jwt({ token, user, account, profile, isNewUser }) {
  //       if (user) {
  //         token.user = user
  //       }
  //       if (account) {
  //         token.account = account
  //       }
  //       return token
  //     }
  //   }
  // const handler = NextAuth(authOptions);
  // export { handler as GET, handler as POST };

  callbacks: {
    async jwt({ token, user, account }) {
      console.log({ token, user, account });
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
      console.log({
        session,
        token,
      });
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
  // debug: true,
  // logger: {
  //   error(code, metadata) {
  //     console.error("NextAuth Error:", code, metadata);
  //   },
  // },
};

export default authOptions;
