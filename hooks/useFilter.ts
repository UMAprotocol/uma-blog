import { UmaProducts } from "@/lib/contentful";
import { useSetQueryParams } from "./useSetQueryParams";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useFilter() {
  const { params, setParams, removeParams } = useSetQueryParams([
    "product",
    "search",
    "tag",
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

  function handleTagChange(value: string) {
    setParams({
      tag: value,
    });
  }

  const clearAll = useCallback(() => {
    setText("");
    removeParams(["product", "search", "tag"]);
  }, [removeParams]);

  return {
    text,
    handleTextChange,
    productParam: params.product,
    tag: params.tag,
    handleTagChange,
    handleProductChange,
    clearAll,
  };
}
