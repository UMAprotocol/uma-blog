import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  className,
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      className={cn(
        "bg-border rounded-full",
        {
          "w-auto h-[1px]": orientation === "horizontal",
          "h-auto w-[1px]": orientation === "vertical",
        },
        className,
      )}
    />
  );
}
