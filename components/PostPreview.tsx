import { UmaBlogEntry } from "@/lib/contentful";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ContentfulImageWrapped } from "./ContentfulImage/ContentfulImageWrapped";

type Props = UmaBlogEntry & {
  className?: string;
};

export function PostPreview({ className, ...post }: Props) {
  return (
    <Link
      href={`/articles/${post.fields.slug}`}
      className={cn("flex group pb-8 flex-col items-start gap-2", className)}
    >
      <ContentfulImageWrapped
        zoomOnHover
        className="w-full aspect-[3/2] rounded-xl"
        image={post.fields.heroImage}
      />
      <div className="flex flex-wrap gap-2 items-center">
        {post.fields.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h2 className="text-xl">{post.fields.title}</h2>
    </Link>
  );
}
