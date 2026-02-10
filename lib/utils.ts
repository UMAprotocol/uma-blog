import { SearchParams } from "@/app/page";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(milliseconds: number) {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(true);
    }, milliseconds);
  });
}

export function createCacheKey(options: {
  searchParams: SearchParams;
  draftModeEnabled: boolean;
}) {
  const { searchParams, draftModeEnabled } = options;
  const newParamString = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      newParamString.set(key, value);
    }
  });
  newParamString.set("draftMode", draftModeEnabled.toString());

  return newParamString.toString();
}

export function toCSSIdentifier(fileName: string) {
  // Replace spaces and other invalid characters with hyphens
  let cssIdentifier = fileName.replace(/[^a-zA-Z0-9]/g, "-");

  // Ensure it does not start with a digit
  if (/^[0-9]/.test(cssIdentifier)) {
    cssIdentifier = "id-" + cssIdentifier;
  }

  return cssIdentifier;
}

/**
 * Ensures external links use HTTPS. Rewrites http:// to https:// and adds https://
 * if missing. Preserves relative links (starting with "/") for NextLink.
 *
 * @param uri - URI from Contentful (may be missing protocol or have http://)
 * @returns URI with HTTPS protocol, or unchanged if relative
 */
export function addDefaultProtocol(uri: string): string {
  // handle in-app relative links
  if (uri.startsWith("/")) {
    return uri;
  }
  // Rewrite http:// to https:// for security
  if (uri.startsWith("http://")) {
    return uri.replace("http://", "https://");
  }

  if (!uri.startsWith("https://")) {
    return `https://${uri}`;
  }

  return uri;
}
