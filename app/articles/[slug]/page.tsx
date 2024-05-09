import { ContentfulImageWrapped } from "@/components/ContentfulImage/ContentfulImageWrapped";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/contentful";
import { draftMode } from "next/headers";
import Link from "next/link";
import { renderDocumentText } from "@/components/RichText/RenderDocumentText";

export async function generateStaticParams() {
  const posts = await getAllBlogSlugs(false);
  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params: { slug } }: Props) {
  const { isEnabled } = draftMode();
  const post = await getBlogPostBySlug(slug, isEnabled);

  return (
    <>
      {isEnabled && (
        <Link
          prefetch={false}
          className="border border-border p2 rounded-sm"
          href="/api/disable-draft"
        >
          Exit draft Mode
        </Link>
      )}
      <article className="flex-1 px-page-padding-x text-text flex-col gap-2 items-start">
        <div className="w-full max-w-[400px] relative aspect-[3/2] rounded-xl overflow-hidden">
          <ContentfulImageWrapped
            className="w-full aspect-[3/2] rounded-xl"
            image={post.fields.heroImage}
          />
        </div>
        <h1 className="text-4xl text-text-secondary mb-8">
          {post.fields.title}
        </h1>
        <div className="flex flex-col gap-4">
          {renderDocumentText(post.fields.content)}
        </div>
      </article>
    </>
  );
}
