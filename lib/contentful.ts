import { env } from "@/app/env";
import { SearchParams } from "@/app/page";
import { TypeBlogPostSkeleton } from "@/types/contentful";
import { HasFields } from "@/types/utils";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import { createClient } from "contentful";
import words from "lodash.words";
import { cache } from "react";
import { PAGINATION_LIMIT } from "./pagination";

const contentType = "blogPost";

export const productionClient = createClient({
  space: env.SPACE_ID,
  accessToken: env.ACCESS_TOKEN,
});

export const previewClient = createClient({
  space: env.SPACE_ID,
  accessToken: env.PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

function addProductFilter(searchParams: SearchParams) {
  const product = searchParams.product;
  if (product && typeof product === "string") {
    return { "fields.product[match]": decodeURIComponent(product) };
  }
  return {};
}

function addTextSearchFilter(searchParams: SearchParams) {
  const searchText = searchParams.search;
  if (searchText && typeof searchText === "string") {
    return { query: decodeURIComponent(searchText) };
  }
  return {};
}

function addTagFilter(searchParams: SearchParams) {
  const tag = searchParams.tag;
  if (tag && typeof tag === "string") {
    return { "fields.tags[match]": decodeURIComponent(tag) }; // use MATCH to ignore casing
  }
  return {};
}

function addPaginationControls(searchParams: SearchParams) {
  const { skip } = searchParams;
  if (typeof skip === "string") {
    return {
      limit: PAGINATION_LIMIT,
      skip: parseInt(skip) * PAGINATION_LIMIT,
    };
  }
  return {
    limit: PAGINATION_LIMIT,
  };
}

export const getBlogEntries = cache(
  async (isDraft: boolean, searchParams: SearchParams) => {
    const client = isDraft ? previewClient : productionClient;
    const options = {
      content_type: contentType,
      "fields.content[exists]": true, // no empty posts
      order: "-fields.publishDate", // sorted latest first
      ...addProductFilter(searchParams),
      ...addTextSearchFilter(searchParams),
      ...addTagFilter(searchParams),
      ...addPaginationControls(searchParams),
    } as const;
    return client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
      options,
    );
  },
);

export async function getBlogPostBySlug(
  slug: UmaBlogEntry["fields"]["slug"],
  isDraft: boolean,
) {
  const client = isDraft ? previewClient : productionClient;
  const options = {
    content_type: contentType,
    limit: 1,
    "fields.slug[match]": slug,
  } as const;
  const entries =
    await client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
      options,
    );
  return entries.total ? entries.items[0] : undefined;
}

// gets 3 most related articles based on topic tags
export async function getRelatedPosts(
  slugToIgnore: UmaBlogEntry["fields"]["slug"],
  product: UmaBlogEntry["fields"]["product"],
  isDraftMode: boolean,
) {
  const client = isDraftMode ? previewClient : productionClient;
  const options = {
    content_type: contentType,
    limit: 3,
    "fields.content[exists]": true, // no empty posts
    "fields.product[match]": product, // get posts with same product
    "fields.slug[nin]": slugToIgnore, // don't include current post
    order: "-fields.publishDate", // sorted latest first
  } as const;
  return client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
    options,
  );
}

export async function getAllBlogSlugs(isDraft: boolean) {
  const client = isDraft ? previewClient : productionClient;

  const options = {
    content_type: contentType,
    select: "fields.slug",
  } as const;

  const entries =
    await client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
      options,
    );
  return entries.items;
}

// Since we might chain multiple modifiers on the client,
// it is more accurate to infer the response types
export type UmaBlogEntries = Awaited<ReturnType<typeof getBlogEntries>>;
export type UmaBlogEntry = UmaBlogEntries["items"][number];

export type UmaBlogImageAsset = UmaBlogEntry["fields"]["heroImage"];
export type UmaProducts = UmaBlogEntry["fields"]["product"];

export type ImageWithFields = HasFields<UmaBlogImageAsset>;

const averageReadingSpeed = 238; //words per minute

export function getReadingTimeMinutes(document: Document) {
  const rawText = documentToPlainTextString(document);
  const wordCount = words(rawText).length;
  const readingTimeMinutes = Math.round(wordCount / averageReadingSpeed);
  return readingTimeMinutes;
}
