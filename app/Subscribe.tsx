import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

// TODO: wire up with UMA.xyz endpoint
export function Subscribe({ className }: Props) {
  return (
    <div
      className={cn(
        " flex flex-col items-center justify-evenly p-4 text-center card",
        className,
      )}
    >
      <p className="text-md text-text-secondary">
        Get UMA updates straight to your inbox
      </p>
      <p className="text-accent text-md">Subscribe Now</p>
    </div>
  );
}
