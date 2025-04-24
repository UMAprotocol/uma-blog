import { SearchParams } from "@/app/page";
import { UmaBlogEntries } from "./contentful";

// TODO: let user set limit
export const PAGINATION_LIMIT = 10;

type ControlOptions = {
  pathname: string;
  searchParams: SearchParams;
  totalPosts: UmaBlogEntries["total"];
  paginationControl: {
    page: number;
    // limit: number;
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
  // newParams.set("limit", encodeURIComponent(paginationControl.limit));
  return `${pathname}?${newParams.toString()}`;
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

  return pageAsInt < Math.ceil(totalPosts / PAGINATION_LIMIT);
}

export function getPreviousPaginationLink({
  totalPosts,
  pathname,
  searchParams,
}: Omit<ControlOptions, "paginationControl">) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const pageAsString = newParams.get("page");
  const pageAsInt = pageAsString ? parseInt(pageAsString) : 1;
  if (canPaginatePrevious({ searchParams })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        page: pageAsInt - 1,
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

  if (canPaginateNext({ searchParams, totalPosts })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        page: pageAsInt + 1,
      },
    });
  }
  return "";
}

export function getPaginationPages(
  totalPosts: UmaBlogEntries["total"],
): number {
  return Math.ceil(totalPosts / PAGINATION_LIMIT);
}

// ensures we only display a max number of pagination links.
// keeps the current page's index 1 away from the end
export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 4, // max number that actually looks good on mobile
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
