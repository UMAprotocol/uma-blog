import { SITE_BASE_URL } from "@/constants/site";
import { getAllBlogEntries } from "@/lib/contentful";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllBlogEntries();

  const articles = entries.items.map((post) => {
    return {
      url: `${SITE_BASE_URL}/articles/${post.fields.slug}`,
      lastModified: new Date(post.sys.updatedAt),
      changeFrequency: "weekly",
      priority: 0.5,
    } as const;
  });

  return [
    {
      url: SITE_BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...articles,
  ];
}
