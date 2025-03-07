import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Accessing cookies for server pages
import StoreProvider from "@/lib/store/StoreProvider";
import { SocketProvider } from "@/lib/socket/SocketProvider";
import TRPCProvider from "@/app/utils/TRPCProvider";

import { ThemeProvider } from "@/components/theme-provider";
import NextAuthSessionWrapper from "@/components/auth/NextAuthSessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "D2D Demo App",
  description: "This is a demo NextJS 15 PWA",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["D2D", "nextjs", "next15", "pwa", "next-pwa"],
  authors: [
    {
      name: "MrDay2Day",
      url: "https://github.com/MrDay2Day",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/logo_sqr-128.png" },
    { rel: "icon", url: "icons/logo_sqr-128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#2e2e2e" }],
  viewportFit: "auto",
  colorScheme: "dark",
};

console.log("NODE ENVIRONMENT - " + process.env.NODE_ENV);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-0 bg-[--background]`}
      >
        <NextAuthSessionWrapper>
          <TRPCProvider>
            <StoreProvider>
              <SocketProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                </ThemeProvider>
              </SocketProvider>
            </StoreProvider>
          </TRPCProvider>
        </NextAuthSessionWrapper>
      </body>
    </html>
  );
}
