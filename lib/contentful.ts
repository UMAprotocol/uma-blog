import { env } from "@/app/env";
import { TypeBlogPostSkeleton } from "@/types/contentful";
import { createClient } from "contentful";

const contentType = "blogPost";

export const client = createClient({
  space: env.SPACE_ID,
  accessToken: env.ACCESS_TOKEN,
});

export async function getBlogEntries() {
  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: contentType,
    "fields.content[exists]": true,
  });
  return entries;
}

export async function getBlogPostBySlug(slug: UmaBlogEntry["fields"]["slug"]) {
  const options = {
    content_type: contentType,
    "fields.slug[match]": slug,
  } as const;
  const entries = await client.getEntries<TypeBlogPostSkeleton>(options);
  return entries.items[0];
}

export async function getAllBlogSlugs() {
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
