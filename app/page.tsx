import { getBlogEntries } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { Subscribe } from "./Subscribe";
import { ButtonScrollTo } from "@/components/ButtonScrollTo";

export default async function Home() {
  const { isEnabled } = draftMode();
  const posts = await getBlogEntries(isEnabled);

  return (
    <div className="w-full pt-10 relative @container min-h-screen max-w-content-max-width px-page-padding-x grid items-center gap-8">
      <div className="grid grid-cols-5 gap-6">
        <Card
          size="large"
          className="col-span-5 @3xl:col-span-4"
          href={`/articles/${posts.items[0].fields.slug}`}
          key={posts.items[0].sys.id}
          post={posts.items[0]}
        />
        <Subscribe className="col-span-5 @3xl:aspect-square self-auto @3xl:col-span-1" />
      </div>

      <Divider />
      <div className="uppercase text-text-secondary font-light tracking-wider text-md">
        most recent articles
      </div>
      <div className="w-full grid grid-cols-5 gap-6">
        {posts.items.slice(1).map((post) => (
          <Card
            className="col-span-5 @3xl:col-span-4"
            href={`/articles/${post.fields.slug}`}
            key={post.sys.id}
            post={post}
          />
        ))}
      </div>
      <ButtonScrollTo yPosition={0}>back to top</ButtonScrollTo>
    </div>
  );
}
