import { Asset, AssetDetails } from "contentful";
import Image from "next/image";

type ContentfulImageProps = Asset & {
  className?: string;
};

export function ContentfulImage({ className, ...props }: ContentfulImageProps) {
  const { description, file } = props.fields;

  return (
    <Image
      alt={description as string}
      width={(file?.details as AssetDetails)?.image?.width as number}
      height={(file?.details as AssetDetails)?.image?.height as number}
      src={`https:${file?.url}`}
      className={className}
      {...props}
    />
  );
}
