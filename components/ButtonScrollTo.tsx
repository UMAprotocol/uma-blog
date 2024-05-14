"use client";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

type Props = ButtonProps & {
  yPosition: number;
  className?: string;
};

export function ButtonScrollTo({ yPosition, className, ...props }: Props) {
  return (
    <Button
      onClick={() => {
        window.scrollTo(0, yPosition);
      }}
      className={cn(
        "uppercase text-text-secondary hover:text-text font-light",
        className,
      )}
      {...props}
    />
  );
}
