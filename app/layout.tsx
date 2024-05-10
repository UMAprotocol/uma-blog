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
    <html lang="en" className={cn("scroll-smooth", halyardDisplay.variable)}>
      <body className="min-h-[100 dvh] items-center flex flex-col bg-background text-text w-screen">
        <main className="w-full m-x-auto items-center pb-8 flex flex-col h-full max-w-[1400px]">
          <Providers>
            <>
              <Header />
              {children}
            </>
          </Providers>
        </main>
      </body>
    </html>
  );
}
