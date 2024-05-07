import { ContentfulImage } from "@/components/ContentfulImage";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { draftMode } from "next/headers";
import Link from "next/link";

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
      {isEnabled && <Link href="/api/disable-draft">Exit draft Mode</Link>}
      <article className="flex-1 px-page-padding-x text-text flex-col gap-2 items-start">
        <div className="w-full max-w-[400px] relative aspect-[3/2] rounded-xl overflow-hidden">
          <ContentfulImage
            fill
            className="object-cover transition-transform group-hover:scale-110 object-center"
            {...post.fields.heroImage}
          />
        </div>
        <h1 className="text-4xl text-text-secondary mb-8">
          {post.fields.title}
        </h1>
        {documentToReactComponents(post.fields.content)}
      </article>
    </>
  );
}
