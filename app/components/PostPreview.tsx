import { UmaBlogEntry } from "@/lib/contentful";
import { ContentfulImage } from "./ContentfulImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = UmaBlogEntry & {
  className?: string;
};

export function PostPreview({ className, ...post }: Props) {
  return (
    <Link
      href={`/articles/${post.fields.slug}`}
      className={cn("flex group pb-8 flex-col items-start gap-2", className)}
    >
      <div className="w-full relative aspect-[3/2] rounded-xl overflow-hidden">
        <ContentfulImage
          fill
          className="object-cover transition-transform group-hover:scale-110 object-center"
          {...post.fields.heroImage}
        />
      </div>
      <h2 className="text-xl">{post.fields.title}</h2>
    </Link>
  );
}
