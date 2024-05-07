import { getBlogEntries } from "@/lib/contentful";
import { PostPreview } from "@/components/PostPreview";
import { draftMode } from "next/headers";

export default async function Home() {
  const { isEnabled } = draftMode();
  const posts = await getBlogEntries(isEnabled);

  return (
    <div className="w-full relative min-h-screen px-page-padding-x flex-col items-center justify-between">
      <div className="grid auto-fit-[300px] gap-8">
        {posts.items.map((post) => (
          <PostPreview key={post.sys.id} {...post} />
        ))}
      </div>
    </div>
  );
}
