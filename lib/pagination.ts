import { SearchParams } from "@/app/page";
import { UmaBlogEntries } from "./contentful";

// Default limit if not specified
export const DEFAULT_PAGINATION_LIMIT = 10;

// Default number of pagination links to show
export const DEFAULT_VISIBLE_PAGES = 5;

type ControlOptions = {
  pathname: string;
  searchParams: SearchParams;
  totalPosts: UmaBlogEntries["total"];
  paginationControl: {
    page: number;
    limit?: string;
  };
};

type ParamsWithValues = Record<string, string>;

export function getPaginationControlLink({
  pathname,
  searchParams,
  paginationControl,
}: ControlOptions) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  if (!(paginationControl.page > 1)) {
    newParams.delete("page");
  } else {
    newParams.set("page", encodeURIComponent(paginationControl.page));
  }

  if (paginationControl.limit) {
    newParams.set("limit", encodeURIComponent(paginationControl.limit));
  }

  return `${pathname}?${newParams.toString()}`;
}

export function getLimitFromSearchParams(
  searchParams: SearchParams,
): number | "all" {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const limitAsString = newParams.get("limit");

  if (limitAsString === "all") {
    return "all";
  }

  return limitAsString ? parseInt(limitAsString) : DEFAULT_PAGINATION_LIMIT;
}

export function canPaginatePrevious({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const pageAsString = newParams.get("page");
  const pageAsInt = pageAsString ? parseInt(pageAsString) : 1;

  return pageAsInt > 1;
}

export function canPaginateNext({
  totalPosts,
  searchParams,
}: {
  totalPosts: UmaBlogEntries["total"];
  searchParams: SearchParams;
}) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const pageAsString = newParams.get("page");
  const pageAsInt = pageAsString ? parseInt(pageAsString) : 1;
  const limit = getLimitFromSearchParams(searchParams);

  // If showing all posts, there's only one page
  if (limit === "all") {
    return false;
  }

  return pageAsInt < Math.ceil(totalPosts / limit);
}

export function getPreviousPaginationLink({
  totalPosts,
  pathname,
  searchParams,
}: Omit<ControlOptions, "paginationControl">) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const pageAsString = newParams.get("page");
  const pageAsInt = pageAsString ? parseInt(pageAsString) : 1;
  const limitParam = newParams.get("limit") ?? undefined;

  if (canPaginatePrevious({ searchParams })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        page: pageAsInt - 1,
        limit: limitParam,
      },
    });
  }
  return "";
}

export function getNextPaginationLink({
  totalPosts,
  pathname,
  searchParams,
}: Omit<ControlOptions, "paginationControl">) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const pageAsString = newParams.get("page");
  const pageAsInt = pageAsString ? parseInt(pageAsString) : 1;
  const limitParam = newParams.get("limit") ?? undefined;

  if (canPaginateNext({ searchParams, totalPosts })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        page: pageAsInt + 1,
        limit: limitParam,
      },
    });
  }
  return "";
}

export function getPaginationPages(
  totalPosts: UmaBlogEntries["total"],
  limit: number | "all" = DEFAULT_PAGINATION_LIMIT,
): number {
  if (limit === "all") {
    return 1;
  }
  return Math.ceil(totalPosts / limit);
}

// ensures we only display a max number of pagination links.
// keeps the current page's index 1 away from the end
export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = DEFAULT_VISIBLE_PAGES, // max number that actually looks good on mobile
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let startPage: number;

  if (currentPage <= Math.ceil(maxVisible / 2)) {
    startPage = 1;
  } else if (currentPage > totalPages - Math.floor(maxVisible / 2)) {
    startPage = totalPages - maxVisible + 1;
  } else {
    startPage = currentPage - Math.floor(maxVisible / 2);
  }

  return Array.from({ length: maxVisible }, (_, i) => startPage + i);
}
