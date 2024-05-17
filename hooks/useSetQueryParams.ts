"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

type QueryParams = Record<string, string | undefined>;
type QueryParamKeys = (keyof QueryParams)[];

export function useSetQueryParams(paramKeys: QueryParamKeys) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [paramValues, setParamValues] = useState<QueryParams>(() => {
    const initialValues: QueryParams = {};
    paramKeys.forEach((key) => {
      const fromUrl = searchParams.get(key);
      Object.assign(initialValues, {
        [key]: fromUrl ? decodeURIComponent(fromUrl) : undefined,
      });
    });
    return initialValues;
  });

  const setParams = useCallback(
    (params: QueryParams) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, encodeURIComponent(value));
        }
      });
      router.push(`${pathname}?${newParams.toString()}`, {
        scroll: false,
      });
      setParamValues((prev) => ({ ...prev, ...params }));
    },
    [pathname, router, searchParams],
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      keys.forEach((key) => {
        newParams.delete(key);
      });
      const queryString = newParams.toString();
      const path = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(path, {
        scroll: false,
      });
      setParamValues((prev) => {
        const updatedValues = { ...prev };
        keys.forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete updatedValues[key];
        });
        return updatedValues;
      });
    },
    [pathname, router, searchParams],
  );

  return {
    params: paramValues,
    setParams,
    removeParams,
  };
}
