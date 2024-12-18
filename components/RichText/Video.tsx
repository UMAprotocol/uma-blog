import { UmaBlogImageAsset } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import { HasFields } from "@/types/utils";
import { ComponentPropsWithRef } from "react";

export type VideoProps = HasFields<UmaBlogImageAsset>["fields"] &
  ComponentPropsWithRef<"video"> & {
    className?: string;
  };

export function Video({
  file,
  description,
  title,
  className,
  ...props
}: VideoProps) {
  if (description) {
    return (
      <figure className={cn("flex flex-col items-center gap-4", className)}>
        <video
          controls
          playsInline
          title={title}
          aria-description={description}
          src={file.url}
          {...props}
        >
          {description}
        </video>
        <figcaption className="text-text-secondary flex-wrap text-sm font-light text-center">
          {description}
        </figcaption>
      </figure>
    );
  }

  return (
    <video
      controls
      playsInline
      title={title}
      aria-description={description}
      src={file.url}
      {...props}
    >
      {description}
    </video>
  );
}
