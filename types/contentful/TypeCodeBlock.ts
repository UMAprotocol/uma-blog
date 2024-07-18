import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeCodeBlockFields = {
  title: EntryFieldTypes.Symbol;
  language: EntryFieldTypes.Symbol;
  code: EntryFieldTypes.Text;
};

export type TypeCodeBlockSkeleton = EntrySkeletonType<
  TypeCodeBlockFields,
  "codeBlock"
>;
export type TypeCodeBlock<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCodeBlockSkeleton, Modifiers, Locales>;

export function isTypeCodeBlock<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeCodeBlock<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "codeBlock";
}
