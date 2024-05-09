import { UmaBlogImageAsset } from "@/lib/contentful";

export type NoNullValuesOfObject<T extends object> = {
  [Property in keyof T]-?: NonNullable<T[Property]>;
};
// utility for checking "fields" in assets from contentful

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObjectWithFields = Record<"fields", Record<string, any>>;
type MaybeObjectWithFields = ObjectWithFields | undefined;

export type HasFields<T> = T extends MaybeObjectWithFields
  ? T extends ObjectWithFields
    ? {
        [K in keyof T]: K extends "fields" ? NoNullValuesOfObject<T[K]> : T[K];
      }
    : never
  : never;

export function hasNoNullValues<T extends object>(
  obj: T,
): obj is NoNullValuesOfObject<T> {
  return Object.values(obj).every((val) => val !== null && val !== undefined);
}

// type guard to check contentful item fields are not undefined
export function isContentfulAsset(
  maybeContentfulAsset: UmaBlogImageAsset,
): maybeContentfulAsset is HasFields<UmaBlogImageAsset> {
  return (
    maybeContentfulAsset !== undefined &&
    "fields" in maybeContentfulAsset &&
    hasNoNullValues(maybeContentfulAsset.fields)
  );
}
