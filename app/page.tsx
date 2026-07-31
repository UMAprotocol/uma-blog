import { getBlogEntries } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { ButtonScrollTo } from "@/components/ButtonScrollTo";
import { Filter } from "@/components/Filter";
import { Suspense } from "react";
import { getPaginationPages, getLimitFromSearchParams } from "@/lib/pagination";

import { Metadata } from "next";
import { createCacheKey } from "@/lib/utils";
import { SITE_BASE_URL } from "@/constants/site";
import { PaginationControls } from "@/components/PaginationControls";

export type SearchParams = Record<string, string | undefined>;

type PageProps = {
  searchParams: SearchParams;
};

const ALLOWED_SEARCH_PARAMS = [
  "page",
  "search",
  "tag",
  "product",
  "limit",
] as const;

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
// ISR - rebuild on an interval
export const revalidate = 1800; // 30 minutes

export default function Home({ searchParams }: PageProps) {
  const { isEnabled } = draftMode();

  // Strip unknown query params back to the canonical URL so bot-poisoned
  // URLs (e.g. /?utm_source=foo, /?cb=12345) don't blow up the ISR
  // cache-key surface. Each unique URL is a separate ISR entry, so without
  // this any crawler with creative parameters could mint unbounded misses.
  const hasUnknownParams = Object.keys(searchParams).some(
    (key) =>
      !ALLOWED_SEARCH_PARAMS.includes(
        key as (typeof ALLOWED_SEARCH_PARAMS)[number],
      ),
  );
  if (hasUnknownParams) {
    const cleanParams = new URLSearchParams();
    for (const key of ALLOWED_SEARCH_PARAMS) {
      const value = searchParams[key];
      if (typeof value === "string" && value.length > 0) {
        cleanParams.set(key, value);
      }
    }
    const qs = cleanParams.toString();
    redirect(qs ? `/?${qs}` : "/");
  }

  // set a key for the async post component to reset state when URL changes.
  // this way we can always show the loading state when fetching data
  const key = createCacheKey({
    draftModeEnabled: isEnabled,
    searchParams,
  });

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

  if (!posts.total) {
    return (
      <h2 className="my-auto flex-1 text-text-secondary text-2xl">
        Couldn&apos;t find anything...
      </h2>
    );
  }

  const isSearchResults = Object.values(searchParams).length ? true : false;
  const currentPage = parseInt(searchParams.page ?? "1");
  const limit = getLimitFromSearchParams(searchParams);
  const totalPages = getPaginationPages(posts.total, limit);

  // Bots probing /?page=99999 would otherwise mint a fresh ISR entry for
  // every out-of-range page. Send them to the canonical first page (or to
  // / if no other filters are set) so the cache surface stays bounded.
  if (currentPage > totalPages) {
    const cleanParams = new URLSearchParams();
    for (const key of ["search", "tag", "product", "limit"] as const) {
      const value = searchParams[key];
      if (typeof value === "string" && value.length > 0) {
        cleanParams.set(key, value);
      }
    }
    const qs = cleanParams.toString();
    redirect(qs ? `/?${qs}` : "/");
  }

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

      {posts.total > 0 && (
        <PaginationControls
          totalPosts={posts.total}
          pathname="/"
          searchParams={searchParams}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
