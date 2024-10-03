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
