import { env } from "@/app/env";
import { TypeBlogPostSkeleton } from "@/types/contentful";
import { createClient } from "contentful";

const client = createClient({
  space: env.SPACE_ID,
  accessToken: env.ACCESS_TOKEN,
});

export async function getBlogEntries() {
  const entries = await client.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    "fields.content[exists]": true,
  });
  return entries;
}

// Since we might chain multiple modifiers on the client,
// it is more accurate to infer the response types
export type UmaBlogEntries = Awaited<ReturnType<typeof getBlogEntries>>;
export type UmaBlogEntry = UmaBlogEntries["items"][number];
