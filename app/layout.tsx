import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Jamil Saadat — Full-Stack Developer",
  description:
    "Full-stack developer portfolio — React, Next.js, Laravel. Fast, accessible, RTL-first Arabic web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
