import { UmaBlogEntry } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Badge } from "./ui/badge";
import { ContentfulImageWrapped } from "./ContentfulImage/ContentfulImageWrapped";
import Link, { LinkProps } from "next/link";
import { format } from "date-fns";

//  TODO: sort out large card styles
const cardVariants = cva(
  "border border-text/5 rounded-lg group hover:border-text/50 transition-colors bg-text/5 backdrop-blur-xl gap-6 p-4 shadow-sm rounded-xl ",
  {
    variants: {
      size: {
        default: "",
        large: "",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

type CardProps = {
  post: UmaBlogEntry;
  className?: string;
} & LinkProps &
  VariantProps<typeof cardVariants>;

export function Card({ post, size, className, ...props }: CardProps) {
  return (
    <Link className={cn(cardVariants({ size, className }))} {...props}>
      <div className="flex flex-1 flex-col gap-6 @xl:justify-between @xl:flex-row-reverse @xl:gap-5">
        <ContentfulImageWrapped
          className="w-full aspect-[4/2] @xl:max-w-[35%] rounded-sm"
          image={post.fields.heroImage}
        />
        <div className="flex flex-col flex-1 gap-4 justify-between @xl:max-w-[50%]">
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2 font-light text-xs tracking-widest leading-4 uppercase text-text-secondary">
              <div className="">{format(post.fields.publishDate, "PP")}</div>
              <span className="rounded-[50%] bg-text-secondary/50 w-[2px] h-[2px]" />
              <div>12 min read </div>
            </div>

            {/* TODO: reading time & Publish date */}
            <h2 className="text-text text-base line-clamp-2">
              {post.fields.title}
            </h2>
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
