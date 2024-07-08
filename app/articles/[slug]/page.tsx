import { ContentfulImageWrapped } from "@/components/ContentfulImage/ContentfulImageWrapped";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/lib/contentful";
import { draftMode } from "next/headers";
import Link from "next/link";
import { renderDocumentText } from "@/components/RichText/RenderDocumentText";
import { Subscribe } from "@/app/Subscribe";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PublishDate } from "@/components/PublishDate";
import { ReadingTime } from "@/components/ReadingTime";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/Divider";
import { ButtonScrollTo } from "@/components/ButtonScrollTo";
import { Metadata } from "next";
import { isContentfulAsset } from "@/types/utils";
import { CardCarousel } from "@/components/CardCarousel";
import { redirect } from "next/navigation";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { isEnabled } = draftMode();

  const post = await getBlogPostBySlug(slug, isEnabled);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!post) {
    return redirect("/404");
  }

  // get image
  const imageUrl = (() => {
    if (!isContentfulAsset(post.fields.heroImage)) {
      // default to blog site's OG image'
      return `/twitter-card.png`;
    }
    return `https:${post.fields.heroImage.fields.file.url}`;
  })();

  // get title
  const title = post.fields.title;
  // get description
  const description = post.fields.metaDescription;

  return {
    metadataBase: new URL("https://uma-blog-alpha.vercel.app"),
    keywords: post.fields.tags,
    publisher: "UMA protocol",
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
      },
    },
    title,
    description,
    icons: {
      icon: ["/favicon-32x32.png", "/favicon-16x16.png"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@UMAprotocol",
      title,
      images: [imageUrl],
    },
    openGraph: {
      siteName: "UMA Blog",
      title,
      description,
      images: [imageUrl],
      url: `/articles/${slug}`,
    },
  };
}

export default async function BlogPage({ params: { slug } }: Props) {
  const { isEnabled } = draftMode();
  const post = await getBlogPostBySlug(slug, isEnabled);

  if (!post) {
    return (
      <div className="@container page">
        <h3 className="text-xl font-light mr-auto text-text/75">
          Article not found
        </h3>
      </div>
    );
  }

  // get 3 more posts of the same product
  const morePosts = await getRelatedPosts(slug, post.fields.product, isEnabled);

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

      <div className="@container page">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.fields.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-5 gap-6">
          <ContentfulImageWrapped
            priority
            className="col-span-5 @3xl:col-span-4 aspect-[1.8/1] rounded-xl"
            image={post.fields.heroImage}
          />
          <Subscribe className="col-span-5 @3xl:aspect-square self-auto @3xl:col-span-1" />

          <article className="col-span-5 flex @3xl:col-span-4 text-text flex-col gap-6 items-start">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-2">
                <PublishDate publishDate={post.fields.publishDate} />
                <span className="rounded-[50%] bg-text-secondary/50 w-[2px] h-[2px]" />
                <ReadingTime document={post.fields.content} />
              </div>
              <h1 className="text-5xl first-letter:uppercase text-text">
                {post.fields.title}
              </h1>

              <div className="flex flex-wrap gap-2 items-center justify-start">
                {post.fields.tags.map((tag) => (
                  <Badge href={`/?search=${tag}`} key={tag.toLowerCase()}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Divider className="my-10" />

            {renderDocumentText(post.fields.content)}
          </article>
        </div>
        <Divider />
        <h3 className="text-xl font-light mr-auto text-text/75">
          Related Articles
        </h3>
        <CardCarousel
          className="col-span-5 @3xl:col-span-4"
          posts={morePosts}
        />

        <ButtonScrollTo className="mx-auto" yPosition={0}>
          back to top
        </ButtonScrollTo>
      </div>
    </>
  );
}
