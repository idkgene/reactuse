import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { WixMadeForDisplayVariable } from "./fonts";

export const metadata: Metadata = {
  title: "React Hooks Collection",
  description:
    "A collection of custom React hooks that are designed to simplify and improve your React development experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${WixMadeForDisplayVariable.className} m-0 w-full min-w-[320px] min-h-[100vh] bg-[#1b1b1f] leading-[24px] text-[16px] font-normal text-[rgba(255,255,245,.86)] text-[#1b1b1f];
`}
      >
        {children}
      </body>
    </html>
  );
}
