import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "寰宇志 — 探索世界地理与文明",
  description: "以地理为视角，探寻地形、气候如何塑造人类文明的历史、经济与人口格局",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#0a0f1a]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
