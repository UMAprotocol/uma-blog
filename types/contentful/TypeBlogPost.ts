import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeBlogPostFields = {
  heroImage: EntryFieldTypes.AssetLink;
  title: EntryFieldTypes.Symbol;
  product: EntryFieldTypes.Symbol<"optimistic oracle" | "osnap" | "oval">;
  publishDate: EntryFieldTypes.Date;
  content: EntryFieldTypes.RichText;
  slug: EntryFieldTypes.Symbol;
  tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
};

export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;

export function isTypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeBlogPost<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "blogPost";
}
