import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Link } from "../Link";

const badgeVariants = cva(
  "inline-flex items-center rounded border px-2 py-1 text-xs font-light uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-background text-text hover:bg-primary/80",
        secondary:
          "border-transparent bg-background-secondary text-text hover:bg-secondary/80",
        outline: "border-text/5 text-text/50 bg-transparent",
      },
      role: {
        link: "hover:border-text hover:text-text",
        display: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      role: "display",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    href?: string;
  };

function Badge({ className, variant, href, ...props }: BadgeProps) {
  if (href) {
    return (
      <Link type="internal" href={href}>
        <div
          className={cn(badgeVariants({ variant, role: "link" }), className)}
          {...props}
        />
      </Link>
    );
  }
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
