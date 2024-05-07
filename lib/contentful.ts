import { env } from "@/app/env";
import { TypeBlogPostSkeleton } from "@/types/contentful";
import { createClient } from "contentful";

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
  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: contentType,
    "fields.content[exists]": true,
  });
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
  const entries = await client.getEntries<TypeBlogPostSkeleton>(options);
  return entries.items[0];
}

export async function getAllBlogSlugs(isDraft: boolean) {
  const client = isDraft ? previewClient : productionClient;

  const options = {
    content_type: contentType,
    select: "fields.slug",
  } as const;

  const entries = await client.getEntries<TypeBlogPostSkeleton>(options);
  return entries.items;
}

// Since we might chain multiple modifiers on the client,
// it is more accurate to infer the response types
export type UmaBlogEntries = Awaited<ReturnType<typeof getBlogEntries>>;
export type UmaBlogEntry = UmaBlogEntries["items"][number];
