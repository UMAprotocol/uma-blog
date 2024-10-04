import type { Metadata } from "next";
import { halyardDisplay } from "./fonts";
import "./globals.css";
import { Providers } from "../providers/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ViewTransitions } from "next-view-transitions";

import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { env } from "./env";

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
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang="en"
        className={cn("scroll-smooth", halyardDisplay.variable)}
      >
        <body className="min-h-dvh h-full items-center flex flex-col bg-background text-text w-screen">
          <Providers>
            <Header />
            <main className="w-full overflow-x-clip m-x-auto items-center flex flex-col pb-8 h-full min-h-[calc(100dvh-var(--header-height)-var(--page-padding-bottom))]">
              {children}
            </main>
          </Providers>
        </body>
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG} />
      </html>
    </ViewTransitions>
  );
}
