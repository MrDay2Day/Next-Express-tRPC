"use client";

import { SessionProvider as Provider } from "next-auth/react";

export default function NextAuthSessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
