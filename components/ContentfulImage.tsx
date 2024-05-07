import { UmaBlogEntry } from "@/lib/contentful";
import { hasNoNullValues } from "@/types/utils";
import Image, { ImageProps } from "next/image";

type ContentfulImageProps = UmaBlogEntry["fields"]["heroImage"] &
  Partial<ImageProps> & {
    className?: string;
  };

// TODO: run type guards on whole posts at top-level
export function ContentfulImage({
  className,
  fill,
  ...props
}: ContentfulImageProps) {
  if (!("fields" in props && hasNoNullValues(props.fields))) {
    return;
  }

  const { description, file } = props.fields;

  return (
    <Image
      alt={description}
      // width={file.details.image?.width}
      // height={file.details.image?.height}
      src={`https:${file.url}`}
      fill={fill}
      className={className}
    />
  );
}
