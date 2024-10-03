import { UmaProducts } from "@/lib/contentful";
import { useSetQueryParams } from "./useSetQueryParams";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useFilter() {
  const { params, setParams, removeParams } = useSetQueryParams([
    "product",
    "search",
    "tag",
    "page",
  ]);
  const [text, setText] = useState(params.search ?? "");

  const debouncedSetParam = useDebouncedCallback((value: string) => {
    setParams({
      search: value,
      page: undefined,
    });
  }, 300);

  function handleTextChange(value: string) {
    setText(value);
    debouncedSetParam(value);
  }

  function handleProductChange(prod: UmaProducts) {
    setParams({
      product: prod,
      page: undefined,
    });
  }

  function handleTagChange(value: string) {
    setParams({
      tag: value,
      page: undefined,
    });
    removeParams(["page"]);
  }

  const clearAll = useCallback(() => {
    setText("");
    removeParams(["product", "search", "tag", "page"]);
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
