import { UmaBlogEntries } from "@/lib/contentful";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

type Props = {
  posts: UmaBlogEntries;
  className?: string;
};

export function CardCarousel({ posts, className, ...props }: Props) {
  if (!posts.total) {
    return "No related content found...";
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("w-full", className)}
      {...props}
    >
      <CarouselContent className="-ml-1">
        {posts.items.map((post) => (
          <CarouselItem
            key={post.fields.slug}
            className="pl-1 sm:basis-1/2 @container lg:basis-1/3"
          >
            <div className="p-2 h-full">
              <Card
                className="h-full flex"
                href={`/articles/${post.fields.slug}`}
                post={post}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
