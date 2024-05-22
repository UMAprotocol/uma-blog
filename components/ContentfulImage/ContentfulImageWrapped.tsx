import { UmaBlogImageAsset } from "@/lib/contentful";
import { isContentfulAsset } from "@/types/utils";
import { ContentfulImage, ContentfulImageProps } from "./ContentfulImage";
import { cn } from "@/lib/utils";
import { PlaceholderBlogImage } from "../PlaceholderBlogImage";

export type ContentfulImageWrappedProps = Pick<
  ContentfulImageProps,
  "priority"
> & {
  image: UmaBlogImageAsset;
  className?: string;
  zoomOnHover?: boolean;
};

export function ContentfulImageWrapped({
  image,
  className,
  priority = false,
  zoomOnHover = false,
}: ContentfulImageWrappedProps) {
  if (!isContentfulAsset(image)) {
    return (
      <div className={cn("relative aspect-[3/2] overflow-hidden", className)}>
        <PlaceholderBlogImage
          className={cn("relative aspect-[3/2] overflow-hidden", {
            "[&>svg]:transition-transform [&>svg]:group-hover:scale-110 ":
              zoomOnHover,
          })}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative border border-background-card aspect-[3/2] overflow-hidden",
        className,
      )}
    >
      <ContentfulImage
        fill
        priority={priority}
        className={cn({
          "transition-transform object-cover group-hover:scale-110":
            zoomOnHover,
        })}
        {...image}
      />
    </div>
  );
}
