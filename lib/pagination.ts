import { SearchParams } from "@/app/page";
import { UmaBlogEntries } from "./contentful";

// TODO: let user set limit
export const PAGINATION_LIMIT = 10;

type ControlOptions = {
  pathname: string;
  searchParams: SearchParams;
  totalPosts: UmaBlogEntries["total"];
  paginationControl: {
    skip: number;
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
  if (!(paginationControl.skip > 0)) {
    newParams.delete("skip");
  } else {
    newParams.set("skip", encodeURIComponent(paginationControl.skip));
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
  const skipAsString = newParams.get("skip");
  const skipAsInt = skipAsString ? parseInt(skipAsString) : 0;

  return skipAsInt > 0;
}

export function canPaginateNext({
  totalPosts,
  searchParams,
}: {
  totalPosts: UmaBlogEntries["total"];
  searchParams: SearchParams;
}) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const skipAsString = newParams.get("skip");
  const skipAsInt = skipAsString ? parseInt(skipAsString) : 0;
  console.log();

  return skipAsInt < Math.floor(totalPosts / PAGINATION_LIMIT);
}

export function getPreviousPaginationLink({
  totalPosts,
  pathname,
  searchParams,
}: Omit<ControlOptions, "paginationControl">) {
  const newParams = new URLSearchParams(searchParams as ParamsWithValues);
  const skipAsString = newParams.get("skip");
  const skipAsInt = skipAsString ? parseInt(skipAsString) : 0;
  if (canPaginatePrevious({ searchParams })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        skip: skipAsInt - 1,
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
  const skipAsString = newParams.get("skip");
  const skipAsInt = skipAsString ? parseInt(skipAsString) : 0;

  if (canPaginateNext({ searchParams, totalPosts })) {
    return getPaginationControlLink({
      totalPosts,
      pathname,
      searchParams,
      paginationControl: {
        skip: skipAsInt + 1,
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
