import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type PlaceholderProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

export function PlaceholderBlogImage({
  className,
  ...props
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-background flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <Icon
        name="speech_bubble"
        className="text-inherit w-[30%] max-h-[60%] aspect-square"
      />
    </div>
  );
}
