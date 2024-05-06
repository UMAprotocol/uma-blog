import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeUmipFields = {
  title: EntryFieldTypes.Symbol;
  created?: EntryFieldTypes.Date;
  discourseLink?: EntryFieldTypes.Symbol;
  status?: EntryFieldTypes.Symbol;
  authors: EntryFieldTypes.Symbol;
  number: EntryFieldTypes.Integer;
  description?: EntryFieldTypes.Text;
  umipNumber?: EntryFieldTypes.Integer;
  umipLink?: EntryFieldTypes.Symbol;
};

export type TypeUmipSkeleton = EntrySkeletonType<TypeUmipFields, "umip">;
export type TypeUmip<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeUmipSkeleton, Modifiers, Locales>;

export function isTypeUmip<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeUmip<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "umip";
}
