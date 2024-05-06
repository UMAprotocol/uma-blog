import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeTestContentFields = {
  title?: EntryFieldTypes.Symbol;
};

export type TypeTestContentSkeleton = EntrySkeletonType<
  TypeTestContentFields,
  "testContent"
>;
export type TypeTestContent<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTestContentSkeleton, Modifiers, Locales>;

export function isTypeTestContent<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeTestContent<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "testContent";
}
