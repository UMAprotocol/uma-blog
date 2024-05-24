import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function IframeContainer({
  className,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={cn("relative mx-auto block w-full aspect-video ", className)}
    >
      {children}
    </span>
  );
}
