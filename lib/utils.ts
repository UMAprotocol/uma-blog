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
