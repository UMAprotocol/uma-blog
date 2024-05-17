"use client";

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
import { Button } from "./ui/button";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import { useFilter } from "@/hooks/useFilter";

const products = ["optimistic oracle", "osnap", "oval"] as const;

type FilterProps = {
  className?: string;
};

export function Filter({ className }: FilterProps) {
  const {
    text,
    handleTextChange,
    productParam,
    handleProductChange,
    clearAll,
  } = useFilter();
  return (
    <div
      className={cn("relative flex flex-col md:flex-row gap-2 py-4", className)}
    >
      <Input
        value={text}
        onChange={(e) => {
          handleTextChange(e.target.value);
        }}
        className="md:max-w-[320px]"
        type="text"
        placeholder="Search"
      />
      <Divider orientation="vertical" />
      <Select
        value={productParam}
        key={productParam}
        onValueChange={(prod) => {
          handleProductChange(prod as UmaProducts);
        }}
      >
        <SelectTrigger className="w-full md:w-[180px] capitalize placeholder:font-light placeholder:text-text-secondary">
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
        onClick={() => {
          clearAll();
        }}
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
