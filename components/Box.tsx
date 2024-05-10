import { cn } from "@/lib/utils";

type BoxProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export function Box({ className, ...props }: BoxProps) {
  return (
    <div
      className={cn("border border-background-card", className)}
      {...props}
    />
  );
}
