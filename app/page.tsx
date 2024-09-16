import { getBlogEntries } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { Subscribe } from "./Subscribe";
import { ButtonScrollTo } from "@/components/ButtonScrollTo";
import { Filter } from "@/components/Filter";
import { Suspense } from "react";
import {
  canPaginatePrevious,
  getPaginationControlLink,
  getPreviousPaginationLink,
  getPaginationPages,
  getNextPaginationLink,
  canPaginateNext,
} from "@/lib/pagination";

import { Metadata } from "next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createCacheKey, cn } from "@/lib/utils";
import { SITE_BASE_URL } from "@/constants/site";

export type SearchParams = Record<string, string | undefined>;

type PageProps = {
  searchParams: SearchParams;
};

// TODO: get proper copy for this
const title = "UMA Blog";
const description =
  "UMA's official blog. Get all our latest articles about the optimistic oracle and oSnap.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  alternates: {
    canonical: "/",
  },
  title,
  description,
  icons: {
    icon: ["/favicon-32x32.png", "/favicon-16x16.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@UMAprotocol",
    title,
    images: "/twitter-card.png",
  },
  openGraph: {
    title,
    description,
    images: "/twitter-card.png",
    url: "/",
  },
};

export default function Home({ searchParams }: PageProps) {
  const { isEnabled } = draftMode();

  // set a key for the async post component to reset state when URL changes.
  // this way we can always show the loading state when fetching data
  const key = createCacheKey({
    draftModeEnabled: isEnabled,
    searchParams,
  });

  // TODO: create nice loading skeleton for posts

  return (
    <div className="relative @container page">
      <Filter className="w-full" />
      <Suspense
        key={key}
        fallback={
          <h2 className="my-auto flex-1 text-text-secondary text-2xl">
            Searching...
          </h2>
        }
      >
        <Posts
          key={key}
          draftModeEnabled={isEnabled}
          searchParams={searchParams}
        />
      </Suspense>
      <ButtonScrollTo className="mx-auto" yPosition={0}>
        back to top
      </ButtonScrollTo>
    </div>
  );
}

type PostsProps = {
  draftModeEnabled: boolean;
  searchParams: SearchParams;
};

async function Posts({ draftModeEnabled, searchParams }: PostsProps) {
  const posts = await getBlogEntries(draftModeEnabled, searchParams);

  const pageDetails = {
    totalPosts: posts.total,
    pathname: "/",
    searchParams,
  };

  if (!posts.total) {
    return (
      <h2 className="my-auto flex-1 text-text-secondary text-2xl">
        Couldn&apos;t find anything...
      </h2>
    );
  }

  const isSearchResults = Object.values(searchParams).length ? true : false;

  return (
    <>
      <div className="uppercase text-text-secondary font-light tracking-wider text-lg">
        {isSearchResults ? "search results" : "most recent articles"}
      </div>

      <div className="grid grid-cols-5 gap-6 w-full">
        <Card
          size={isSearchResults ? "small" : "large"}
          className="col-span-5 @3xl:col-span-4"
          href={`/articles/${posts.items[0].fields.slug}`}
          key={posts.items[0].sys.id}
          post={posts.items[0]}
        />
        <Subscribe
          className={cn([
            "col-span-5 @3xl:aspect-[1.2/1] self-auto @3xl:col-span-1",
            isSearchResults ? "hidden @3xl:flex" : "visible",
          ])}
        />
      </div>

      {posts.total > 1 ? (
        <>
          <div className="w-full grid grid-cols-5 gap-6">
            {!isSearchResults && (
              <Divider className="col-span-5 @3xl:col-span-4" />
            )}
            {posts.items.slice(1).map((post) => (
              <Card
                className="col-span-5 @3xl:col-span-4"
                href={`/articles/${post.fields.slug}`}
                key={post.sys.id}
                post={post}
              />
            ))}
          </div>
        </>
      ) : null}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn({
                "opacity-40": !canPaginatePrevious(pageDetails),
              })}
              href={getPreviousPaginationLink(pageDetails)}
            />
          </PaginationItem>
          {Array.from({ length: getPaginationPages(posts.total) }).map(
            (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={parseInt(searchParams.skip ?? "0") === i}
                  href={getPaginationControlLink({
                    ...pageDetails,
                    paginationControl: {
                      skip: i,
                    },
                  })}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              className={cn({
                "opacity-40": !canPaginateNext(pageDetails),
              })}
              href={getNextPaginationLink(pageDetails)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
