import localFont from "next/font/local";

export const halyardDisplay = localFont({
  src: [
    { path: "../public/fonts/HalyardDisplayLight.woff2", weight: "300" },
    { path: "../public/fonts/HalyardDisplayRegular.woff2", weight: "400" },
    { path: "../public/fonts/HalyardDisplaySemiBold.woff2", weight: "500" },
    { path: "../public/fonts/HalyardDisplayBold.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-halyard-display",
});
