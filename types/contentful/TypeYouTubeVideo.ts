import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export type TypeYouTubeVideoFields = {
  youtubeVideo?: EntryFieldTypes.Object;
};

export type TypeYouTubeVideoSkeleton = EntrySkeletonType<
  TypeYouTubeVideoFields,
  "youTubeVideo"
>;
export type TypeYouTubeVideo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeYouTubeVideoSkeleton, Modifiers, Locales>;

export function isTypeYouTubeVideo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeYouTubeVideo<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "youTubeVideo";
}
