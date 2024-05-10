import { UmaBlogEntry } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
  publishDate: UmaBlogEntry["fields"]["publishDate"];
  className?: string;
};

export function PublishDate({ publishDate, className }: Props) {
  return (
    <div
      className={cn(
        "font-light text-xs tracking-widest leading-4 uppercase text-text-secondary",
        className,
      )}
    >
      {format(publishDate, "PP")}
    </div>
  );
}
