import { UmaProducts } from "@/lib/contentful";
import { useSetQueryParams } from "./useSetQueryParams";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useFilter() {
  const { params, setParams, removeParams } = useSetQueryParams([
    "product",
    "search",
  ]);
  const [text, setText] = useState(params.search ?? "");

  const debouncedSetParam = useDebouncedCallback((value: string) => {
    setParams({
      search: value,
    });
  }, 300);

  function handleTextChange(value: string) {
    setText(value);
    debouncedSetParam(value);
  }

  function handleProductChange(prod: UmaProducts) {
    setParams({
      product: prod,
    });
  }

  const clearAll = useCallback(() => {
    setText("");
    removeParams(["product", "search"]);
  }, [removeParams]);

  return {
    text,
    handleTextChange,
    productParam: params.product,
    handleProductChange,
    clearAll,
  };
}
