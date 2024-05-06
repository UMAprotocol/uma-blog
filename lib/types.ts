/* types.ts */
import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";

export type UmaBlogItem = {
  fields: {
    title: string;
    slug: string;
    heroImage: Asset;
    content: Document;
    publishDate: Date;
  };
};

export type UmaBlogItems = ReadonlyArray<UmaBlogItem>;

export type UmaBlogQueryResult = {
  items: UmaBlogItems;
};
