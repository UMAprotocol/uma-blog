import { env } from "@/app/env";
import { createClient } from "contentful";
import { UmaBlogQueryResult } from "./types";

const client = createClient({
  space: env.SPACE_ID,
  accessToken: env.ACCESS_TOKEN,
});

export async function getBlogEntries(): Promise<UmaBlogQueryResult> {
  const entries = await client.getEntries({ content_type: "blogPost" });
  return entries as unknown as UmaBlogQueryResult;
}
