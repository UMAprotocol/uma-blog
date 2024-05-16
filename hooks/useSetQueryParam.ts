import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type Options = {
  key: string;
};

export function useSetQueryParam<ValueType extends string>({ key }: Options) {
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get(key);
  const initialValue = fromUrl
    ? (decodeURIComponent(fromUrl) as ValueType)
    : undefined;

  const [paramValue, setParamValue] = useState<ValueType | undefined>(
    initialValue,
  );
  const router = useRouter();
  const pathname = usePathname();

  function setParam(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, encodeURIComponent(value));
    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
    setParamValue(value as ValueType);
  }

  function removeParam() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
    setParamValue(undefined);
  }

  return {
    param: paramValue,
    setParam,
    removeParam,
  };
}
