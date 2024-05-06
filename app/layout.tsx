import type { Metadata } from "next";
import { halyardDisplay } from "./fonts";
import "./globals.css";
import { Providers } from "./providers/Providers";

import { cn } from "@/lib/utils";

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
    <html lang="en" className={cn("scroll-smooth", halyardDisplay.variable)}>
      <body className="min-h-[100 dvh] bg-background text-text w-screen py-10 px-6">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
