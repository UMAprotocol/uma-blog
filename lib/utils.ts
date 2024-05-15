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
