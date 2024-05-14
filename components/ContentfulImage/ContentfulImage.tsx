import { ImageWithFields } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

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

  function ImageToRender() {
    return (
      <Image
        className={cn({ "object-cover object-center": fill }, className)}
        alt={description}
        src={`https:${file.url}`}
        height={!fill ? file.details.image?.height : undefined}
        width={!fill ? file.details.image?.width : undefined}
        fill={fill}
      />
    );
  }

  if (showDescription) {
    return (
      <figure className="flex flex-col gap-4 items-center">
        <ImageToRender />
        <figcaption className="text-text-secondary text-sm font-light text-center">
          {description}
        </figcaption>
      </figure>
    );
  }

  return <ImageToRender />;
}
