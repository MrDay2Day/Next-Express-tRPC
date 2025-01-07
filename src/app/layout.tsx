import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Accessing cookies for server pages
import StoreProvider from "@/lib/store/StoreProvider";
import NavBar from "@/components/navigation/nav_bar";
import { SocketProvider } from "@/lib/socket/SocketProvider";
// import PushRegister from "./utils/PushRegister";
import { lazy, Suspense } from "react";
import TRPCProvider from "@/utils/trpc/TRPCProvider";

// @ts-expect-error: Import lazy
const PushComp = lazy(() => import("./utils/PushRegister"));

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
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/logo_sqr-128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#2e2e2e" }],
  viewportFit: "auto",
  // colorScheme: "dark",
};

console.log(process.env.NODE_ENV);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-0`}
      >
        <TRPCProvider>
          <Suspense>
            <PushComp />
          </Suspense>
          <StoreProvider>
            <SocketProvider>
              <NavBar />
              <div className="pl-10 pr-10 ">{children}</div>
            </SocketProvider>
          </StoreProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
