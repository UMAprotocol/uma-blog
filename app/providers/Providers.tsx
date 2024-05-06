"use client";

import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};
