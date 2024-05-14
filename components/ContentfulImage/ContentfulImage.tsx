"use client";
import { ImageWithFields } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { PlaceholderBlogImage } from "../PlaceholderBlogImage";

export type ContentfulImageProps = ImageWithFields &
  Pick<ImageProps, "fill"> & {
    className?: string;
    showDescription?: boolean;
  };

export function ContentfulImage({
  className,
  fill,
  showDescription,
  ...props
}: ContentfulImageProps) {
  const { description, file } = props.fields;
  const [err, setErr] = useState(false);

  function ImageToRender() {
    if (err) {
      return (
        <PlaceholderBlogImage
          className={cn(
            {
              "object-cover w-full h-full object-center": fill,
              "w-full aspect-[3/2]": !fill,
            },
            className,
          )}
        />
      );
    }
    return (
      <Image
        className={cn(
          { "object-cover w-full h-full object-center": fill },
          className,
        )}
        alt={description}
        src={`https:${file.url}`}
        height={!fill ? file.details.image?.height : undefined}
        width={!fill ? file.details.image?.width : undefined}
        onError={() => {
          setErr(true);
        }}
        fill={fill}
      />
    );
  }

  if (showDescription) {
    return (
      <figure className="flex p-4 flex-col gap-4 items-center">
        <ImageToRender />
        <figcaption className="text-text-secondary text-sm font-light text-center">
          {description}
        </figcaption>
      </figure>
    );
  }

  return <ImageToRender />;
}
