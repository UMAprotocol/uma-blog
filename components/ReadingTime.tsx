import { UmaBlogEntry, getReadingTimeMinutes } from "@/lib/contentful";
import { cn } from "@/lib/utils";

type Props = {
  document: UmaBlogEntry["fields"]["content"];
  className?: string;
};

// assumes no longer than an hour!
export function ReadingTime({ document, className }: Props) {
  const readingTimeMinutes = getReadingTimeMinutes(document);
  return (
    <div
      className={cn(
        "font-light text-xs tracking-widest leading-4 uppercase text-text-secondary",
        className,
      )}
    >
      {readingTimeMinutes} min read
    </div>
  );
}
