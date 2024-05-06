import { getBlogEntries } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulImage } from "@/app/components/ContentfulImage";

export default async function Home() {
  const posts = await getBlogEntries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {posts.items.map((post) => (
        <>
          <h2>{post.fields.title}</h2>
          <ContentfulImage {...post.fields.heroImage} />
          {documentToReactComponents(post.fields.content)}
        </>
      ))}
    </main>
  );
}
