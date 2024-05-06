import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeAcrossBlogPostFields = {
  title: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
  featuredImage: EntryFieldTypes.AssetLink;
  tag?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
};

export type TypeAcrossBlogPostSkeleton = EntrySkeletonType<
  TypeAcrossBlogPostFields,
  "acrossBlogPost"
>;
export type TypeAcrossBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAcrossBlogPostSkeleton, Modifiers, Locales>;

export function isTypeAcrossBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeAcrossBlogPost<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "acrossBlogPost";
}
