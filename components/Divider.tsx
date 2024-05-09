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
        "w-full h-[1px] bg-border rounded-full",
        {
          "rotate-90": orientation === "vertical",
        },
        className,
      )}
    />
  );
}
