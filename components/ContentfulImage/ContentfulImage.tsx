import { ImageWithFields } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type ContentfulImageProps = ImageWithFields &
  Pick<ImageProps, "fill"> & {
    className?: string;
  };

export function ContentfulImage({
  className,
  fill,
  ...props
}: ContentfulImageProps) {
  const { description, file } = props.fields;

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
