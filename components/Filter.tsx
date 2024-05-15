"use client";

import { useEffect, useState } from "react";
// full text search
// filter by product
// filter by tag
import { Divider } from "./Divider";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UmaProducts } from "@/lib/contentful";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Icon } from "./Icon";

//  can not pull this from CMS for some reason 🤔
const products = ["optimistic oracle", "osnap", "oval"] as const;

export function Filter() {
  const [productFilter, setProductFilter] = useState<UmaProducts>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function clear() {
    setProductFilter(undefined);
  }

  function setParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, encodeURIComponent(value));
    router.push(`${pathname}/?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }

  function removeParam(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    router.push(`${pathname}/?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }

  useEffect(() => {
    if (productFilter) {
      setParam("product", productFilter);
    } else {
      removeParam("product");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFilter]);

  return (
    <div className="relative flex flex-col md:flex-row gap-2 py-4">
      <Input className="max-w-[320px]" type="text" placeholder="Search" />
      <Divider orientation="vertical" />
      <Select
        onValueChange={(prod) => {
          setProductFilter(prod as UmaProducts);
        }}
      >
        <SelectTrigger className="w-[180px] capitalize placeholder:font-light placeholder:text-text-secondary">
          <SelectValue placeholder="Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Products</SelectLabel>
            {products.map((product) => (
              <SelectItem className="capitalize" key={product} value={product}>
                {product}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={clear}
        className="flex uppercase text-text-secondary hover:text-text font-light items-center gap-4"
        variant="outline"
      >
        clear
        <Icon className="w-[1em] h-[1em] text-inherit" name="close-x" />
      </Button>
      <Divider
        className="absolute w-[4000px] left-[calc(50%-2000px)] bottom-0"
        orientation="horizontal"
      />
    </div>
  );
}