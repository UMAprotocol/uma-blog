import { UmaBlogImageAsset } from "@/lib/contentful";
import { isContentfulAsset } from "@/types/utils";
import { ContentfulImage } from "./ContentfulImage";
import { cn } from "@/lib/utils";

export type ContentfulImageWrappedProps = {
  image: UmaBlogImageAsset;
  className?: string;
  zoomOnHover?: boolean;
};

export function ContentfulImageWrapped({
  image,
  className,
  zoomOnHover = false,
}: ContentfulImageWrappedProps) {
  if (!isContentfulAsset(image)) {
    return null;
  }

  return (
    <div className={cn("relative aspect-[3/2] overflow-hidden", className)}>
      <ContentfulImage
        fill
        className={cn({
          "transition-transform group-hover:scale-110": zoomOnHover,
        })}
        {...image}
      />
    </div>
  );
}
