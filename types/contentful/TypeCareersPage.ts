import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeCareersPageFields = {
  content?: EntryFieldTypes.RichText;
};

export type TypeCareersPageSkeleton = EntrySkeletonType<
  TypeCareersPageFields,
  "careersPage"
>;
export type TypeCareersPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCareersPageSkeleton, Modifiers, Locales>;

export function isTypeCareersPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeCareersPage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "careersPage";
}
