import { UmaBlogEntry } from "@/lib/contentful";

export type NoNullValuesOfObject<T extends object> = {
  [Property in keyof T]-?: NonNullable<T[Property]>;
};

export function hasNoNullValues<T extends object>(
  obj: T,
): obj is NoNullValuesOfObject<T> {
  return Object.values(obj).every((val) => val !== null && val !== undefined);
}
