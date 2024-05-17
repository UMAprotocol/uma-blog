import type { Metadata } from "next";
import { halyardDisplay } from "./fonts";
import "./globals.css";
import { Providers } from "../providers/Providers";

import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "UMA Blog",
  description: "Blog site for UMA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("scroll-smooth", halyardDisplay.variable)}
    >
      <body className="min-h-dvh h-full items-center flex flex-col bg-background text-text w-screen">
        <Providers>
          <Header />
          <main className="w-full m-x-auto items-center flex flex-col pb-8 h-full min-h-[calc(100dvh-var(--header-height)-var(--page-padding-bottom))]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
