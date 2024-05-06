import { ContentfulImage } from "@/app/components/ContentfulImage";
import {
  UmaBlogEntry,
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/contentful";
import { hasNoNullValues } from "@/types/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function generateStaticParams() {
  const posts = await getAllBlogSlugs();
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
  const post = await getBlogPostBySlug(slug);

  return (
    <article className="flex-1 text-text flex-col gap-2 items-start">
      <div className="w-full max-w-[400px] relative aspect-[3/2] rounded-xl overflow-hidden">
        <ContentfulImage
          fill
          className="object-cover transition-transform group-hover:scale-110 object-center"
          {...post.fields.heroImage}
        />
      </div>
      <h1 className="text-4xl text-text mb-8">{post.fields.title}</h1>
      {documentToReactComponents(post.fields.content)}
    </article>
  );
}
