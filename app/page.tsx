import { getBlogEntries } from "@/lib/contentful";
import { PostPreview } from "./components/PostPreview";

export default async function Home() {
  const posts = await getBlogEntries();

  return (
    <main className="w-full p-10 min-h-screen flex-col items-center justify-between">
      <div className="w-full flex flex-row flex-wrap gap-10">
        {posts.items.map((post) => (
          <PostPreview
            className="flex-1 min-w-[300px]"
            key={post.sys.id}
            {...post}
          />
        ))}
      </div>
    </main>
  );
}
