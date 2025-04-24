"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGINATION_LIMIT } from "@/lib/pagination";

const POST_LIMIT_OPTIONS = [
  { value: "5", label: "5 posts" },
  { value: "10", label: "10 posts" },
  { value: "20", label: "20 posts" },
  { value: "50", label: "50 posts" },
  { value: "all", label: "Show all" },
];

export function PostsPerPageSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLimit =
    searchParams.get("limit") ?? String(DEFAULT_PAGINATION_LIMIT);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset to page 1 when changing limit
    params.delete("page");

    if (value === "all") {
      params.set("limit", "all");
    } else {
      params.set("limit", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="posts-per-page"
        className="text-sm text-text-secondary whitespace-nowrap"
      >
        Posts per page:
      </label>
      <Select value={currentLimit} onValueChange={handleValueChange}>
        <SelectTrigger id="posts-per-page" className="w-[120px] h-9">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {POST_LIMIT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
