import { getBlogEntries } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";

export default async function Home() {
  const { isEnabled } = draftMode();
  const posts = await getBlogEntries(isEnabled);

  return (
    <div className="w-full @container relative min-h-screen max-w-content-max-width px-page-padding-x grid items-center gap-8">
      <div className="grid grid-cols-5 gap-6">
        <Card
          className="col-span-5 @2xl:col-span-4"
          href={`/articles/${posts.items[0].fields.slug}`}
          key={posts.items[0].sys.id}
          post={posts.items[0]}
        />
        <div className="col-span-5 @2xl:col-span-1 flex flex-col items-center justify-evenly p-4 text-center border border-text/5 bg-text/5 backdrop-blur-xl shadow-sm rounded-xl">
          <p className="text-md text-text-secondary">
            Get UMA updates straight to your inbox
          </p>
          <p className="text-accent text-md">Subscribe Now</p>
        </div>
      </div>

      <Divider />
      <div className="uppercase text-text-secondary font-light tracking-wider text-md">
        most recent articles
      </div>
      <div className="w-full grid grid-cols-5 gap-6">
        {posts.items.slice(1).map((post) => (
          <Card
            className="col-span-5 @2xl:col-span-4"
            href={`/articles/${post.fields.slug}`}
            key={post.sys.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}
