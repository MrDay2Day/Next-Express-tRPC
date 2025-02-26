import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import { users } from "@/lib/nextAuth/users";
import { JWT } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET! as string;

// Function to sign JWT using process.env.JWT_SECRET
function generateJwt(
  payload: string | Buffer | object,
  expiresIn: string = "15m"
) {
  if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }
  // @ts-expect-error ---
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Function to verify JWT
function verifyJwt(token: string) {
  try {
    if (!JWT_SECRET) {
      throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Function to refresh access token
async function refreshAccessToken(token: JWT) {
  try {
    if (!token.refreshToken) throw new Error("No refresh token available");

    // Verify refresh token
    const decoded = verifyJwt(token.refreshToken);
    if (!decoded) throw new Error("Invalid refresh token");

    // Generate new access token
    return {
      ...token,
      accessToken: generateJwt(
        { email: token.email, provider: token.provider },
        "15m"
      ),
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 mins
    };
  } catch (error) {
    console.error("Refresh token failed", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = users.find((x) => x.email === credentials.email);

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_AUTH_ID!,
      clientSecret: process.env.GITHUB_AUTH_SECRET!,
    }),
    FacebookProvider({
      clientId: "1306758607208798",
      clientSecret: "cd7f69b9ec7ea0963ac7063f793a0e21",
    }),
    LinkedInProvider({
      clientId: "78unx0f6wax3v9",
      clientSecret: "WPL_AP1.XFjXt5nJ4IjL3h21.IJQxBQ==",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        /*********************************
         *  Check for email in database  *
         *          user.email           *
         *********************************/

        const refreshToken = generateJwt(
          { email: user.email },
          "7d" // 7-day refresh token
        );

        token.accessToken = generateJwt(
          { email: user.email, provider: account.provider },
          "15m" // 15 min access token
        );
        token.refreshToken = refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins
        token.userId = user.id;

        // Set refresh token cookie manually using the 'set-cookie' header
        return token;
      }

      // If token expired, refresh
      if (Date.now() > (token.accessTokenExpires as number)) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      /*********************************
       *      Add data to session      *
       *********************************/
      if (token) {
        session.accessToken = token.accessToken!;
        session.refreshToken = token.refreshToken!;
        session.user.id = token.userId as string;
        session.user.role = "ADMIN";
      }
      return session;
    },
  },
  theme: {
    colorScheme: "auto",
    logo: "/icons/logo_sqr-256.png",
    buttonText: "Login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  jwt: {
    maxAge: 15 * 60, // 15 mins
  },
  cookies: {
    sessionToken: {
      name: "d2d.auth.session.token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.log("NextAuth WARN:", code);
    },
    debug(code, metadata) {
      console.error("NextAuth DEBUG:", code, metadata);
    },
  },
};

export default authOptions;
