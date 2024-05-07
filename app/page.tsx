import { getBlogEntries } from "@/lib/contentful";
import { PostPreview } from "@/components/PostPreview";

export default async function Home() {
  const posts = await getBlogEntries();

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
