import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "D2D - Books",
  description: "This is a demo NextJS 15 PWA",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>Books Layout</p>
      {children}
    </>
  );
}
