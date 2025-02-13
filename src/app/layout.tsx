import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// Accessing cookies for server pages
import StoreProvider from "@/lib/store/StoreProvider";
import { SocketProvider } from "@/lib/socket/SocketProvider";
import TRPCProvider from "@/app/utils/TRPCProvider";
import { LoadingComp } from "./loading";
import { nextDynamic } from "@/utils/dynamic";
import Footer from "@/components/navigation/footer";
import { ThemeProvider } from "@/components/theme-provider";

import ResponsiveNav from "@/components/navigation/ResponsiveNav";

const PushComp = nextDynamic(
  // @ts-expect-error: None
  () => import("./utils/PushRegister"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

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

console.log(process.env.NODE_ENV);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-0`}
      >
        <TRPCProvider>
          <StoreProvider>
            <SocketProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ResponsiveNav />
                <div className="main_holder" style={{ minHeight: "100vh" }}>
                  <div className="pl-10 pr-1">{children}</div>
                  <PushComp />
                </div>
                <Footer />
              </ThemeProvider>
            </SocketProvider>
          </StoreProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
