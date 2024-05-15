import { getBlogEntries } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { Subscribe } from "./Subscribe";
import { ButtonScrollTo } from "@/components/ButtonScrollTo";
import { Filter } from "@/components/Filter";
import { Suspense } from "react";
import { createCacheKey } from "@/lib/utils";

export type SearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  searchParams: SearchParams;
};

export default function Home({ searchParams }: PageProps) {
  const { isEnabled } = draftMode();

  // set a key for the async post component to purge data when URL changes.
  // this way we can always show the loading state, when actually fetching data
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
        <Posts draftModeEnabled={isEnabled} searchParams={searchParams} />
      </Suspense>
      <ButtonScrollTo yPosition={0}>back to top</ButtonScrollTo>
    </div>
  );
}

type PostsProps = {
  draftModeEnabled: boolean;
  searchParams: SearchParams;
};

async function Posts({ draftModeEnabled, searchParams }: PostsProps) {
  const posts = await getBlogEntries(draftModeEnabled, searchParams);

  return (
    <>
      <div className="grid grid-cols-5 gap-6">
        <Card
          size="large"
          className="col-span-5 @3xl:col-span-4"
          href={`/articles/${posts.items[0].fields.slug}`}
          key={posts.items[0].sys.id}
          post={posts.items[0]}
        />
        <Subscribe className="col-span-5 @3xl:aspect-square self-auto @3xl:col-span-1" />
      </div>

      <Divider />
      <div className="uppercase text-text-secondary font-light tracking-wider text-md">
        most recent articles
      </div>

      <div className="w-full grid grid-cols-5 gap-6">
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
  );
}
