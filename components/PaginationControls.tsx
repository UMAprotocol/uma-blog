"use client";

import { PostsPerPageSelect } from "./PostsPerPageSelect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  canPaginatePrevious,
  getPaginationControlLink,
  getPreviousPaginationLink,
  getNextPaginationLink,
  canPaginateNext,
  getVisiblePageNumbers,
} from "@/lib/pagination";
import { cn } from "@/lib/utils";
import { SearchParams } from "@/app/page";
import { UmaBlogEntries } from "@/lib/contentful";

type PaginationControlsProps = {
  totalPosts: UmaBlogEntries["total"];
  pathname: string;
  searchParams: SearchParams;
  currentPage: number;
  totalPages: number;
  className?: string;
};

export function PaginationControls({
  totalPosts,
  pathname,
  searchParams,
  currentPage,
  totalPages,
  className,
}: PaginationControlsProps) {
  const visiblePages = getVisiblePageNumbers(currentPage, totalPages);

  const pageDetails = {
    totalPosts,
    pathname,
    searchParams,
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 mt-6 w-full",
        className,
      )}
    >
      <PostsPerPageSelect />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!canPaginatePrevious(pageDetails)}
              className={cn({
                "opacity-40": !canPaginatePrevious(pageDetails),
              })}
              href={getPreviousPaginationLink(pageDetails)}
            />
          </PaginationItem>
          {visiblePages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={currentPage === pageNum}
                href={getPaginationControlLink({
                  ...pageDetails,
                  paginationControl: {
                    page: pageNum,
                    limit: searchParams.limit,
                  },
                })}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={!canPaginateNext(pageDetails)}
              className={cn({
                "opacity-40": !canPaginateNext(pageDetails),
              })}
              href={getNextPaginationLink(pageDetails)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
