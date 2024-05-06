import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeSynthFields = {
  shortDescription: EntryFieldTypes.Text;
  logo?: EntryFieldTypes.AssetLink;
  category: EntryFieldTypes.Symbol<
    | "External Integration"
    | "Integrations"
    | "KPI Option"
    | "Option"
    | "Protected Token"
    | "Range Token"
    | "Success Token"
    | "Synthetic Asset"
    | "Yield Dollar"
  >;
  address: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  mintmanage?: EntryFieldTypes.Symbol;
  externalUrl?: EntryFieldTypes.Symbol;
  externalApi?: EntryFieldTypes.Symbol;
  name?: EntryFieldTypes.Symbol;
  defiLlamaApi?: EntryFieldTypes.Symbol;
  chainId: EntryFieldTypes.Integer<1 | 10 | 137 | 288 | 42161>;
};

export type TypeSynthSkeleton = EntrySkeletonType<TypeSynthFields, "synth">;
export type TypeSynth<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSynthSkeleton, Modifiers, Locales>;

export function isTypeSynth<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeSynth<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "synth";
}
