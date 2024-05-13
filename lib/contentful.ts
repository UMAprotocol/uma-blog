import { env } from "@/app/env";
import { TypeBlogPostSkeleton } from "@/types/contentful";
import { HasFields } from "@/types/utils";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import { createClient } from "contentful";
import words from "lodash.words";

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

export async function getBlogEntries(isDraft: boolean) {
  const client = isDraft ? previewClient : productionClient;
  const options = {
    content_type: contentType,
    "fields.content[exists]": true,
    order: "-fields.publishDate", // sorted latest first
  } as const;
  const entries =
    await client.withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>(
      options,
    );
  return entries;
}

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
  return entries.items[0];
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

export type ImageWithFields = HasFields<UmaBlogImageAsset>;

const averageReadingSpeed = 238; //words per minute

export function getReadingTimeMinutes(document: Document) {
  const rawText = documentToPlainTextString(document);
  const wordCount = words(rawText).length;
  const readingTimeMinutes = Math.round(wordCount / averageReadingSpeed);
  return readingTimeMinutes;
}
