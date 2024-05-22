import { UmaBlogEntry } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Badge } from "./ui/badge";
import { ContentfulImageWrapped } from "./ContentfulImage/ContentfulImageWrapped";
import Link, { LinkProps } from "next/link";
import { PublishDate } from "./PublishDate";
import { ReadingTime } from "./ReadingTime";

const imageVariants = cva(
  "w-full self-stretch col-start-1 col-end-10 rounded-sm",
  {
    variants: {
      size: {
        small: "@xl:row-start-1 aspect-[2/1] @xl:col-start-6 @xl:col-end-10",
        large: "@xl:row-start-1 aspect-[1.7/1] @xl:col-start-1 @xl:col-end-6",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

const textBoxVariants = cva(
  "flex flex-col flex-1 col-start-1 col-end-10 self-stretch gap-4 justify-between",
  {
    variants: {
      size: {
        small: "[&_h2]:text-base @xl:row-start-1 @xl:col-start-1 @xl:col-end-5",
        large:
          "[&_h2]:text-2xl [&_h2]:line-clamp-3 @xl:row-start-1 @xl:col-start-6 @xl:col-end-10",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

const rootVariants = cva(
  "group card shadow-md hover:border-text transition-colors gap-6 p-4 @2xl:p-5 ",
  {
    variants: {
      size: {
        small: "",
        large: "",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

type CardProps = {
  post: UmaBlogEntry;
  className?: string;
} & LinkProps &
  VariantProps<typeof imageVariants>;

export function Card({ post, size, className, ...props }: CardProps) {
  return (
    <Link className={cn(rootVariants({ size, className }))} {...props}>
      <div className="gap-6 grid grid-cols-9">
        <ContentfulImageWrapped
          priority={size === "large"}
          zoomOnHover
          className={cn(imageVariants({ size }))}
          image={post.fields.heroImage}
        />
        <div className={cn(textBoxVariants({ size }))}>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2">
              <PublishDate publishDate={post.fields.publishDate} />
              <span className="rounded-[50%] bg-text-secondary/50 w-[2px] h-[2px]" />
              <ReadingTime document={post.fields.content} />
            </div>

            {/* TODO: reading time & Publish date */}
            <h2 className="text-text line-clamp-2">{post.fields.title}</h2>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-start">
            {post.fields.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
