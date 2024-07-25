import { LinkProps } from "next/link";
import { Link as NextLink } from "next-view-transitions";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export type ExternalHrefType = `http${string}`;

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

type ExternalLinkProps = CommonProps &
  React.ComponentPropsWithoutRef<"a"> & {
    type: "external";
    href: ExternalHrefType;
  };

type InternalLinkProps = CommonProps &
  LinkProps & {
    type: "internal";
  };

type Props = InternalLinkProps | ExternalLinkProps;

export function Link(props: Props) {
  if (props.type === "internal") {
    return (
      <NextLink
        className={cn(
          "text-text-secondary text-4xl font-normal group hover:text-text transition-colors",
          props.className,
        )}
        {...props}
      />
    );
  }

  return (
    <a
      className={cn(
        "text-text-secondary text-md font-normal group hover:text-text transition",
        props.className,
      )}
      target="_blank"
      {...props}
    >
      {props.children}
      <Icon
        name="arrow_up_right"
        className="ml-[0.4em] inline w-[0.6em] h-[0.6em] transition group-hover:translate-x-1"
      />
    </a>
  );
}

export function isExternal(href: string) {
  return href.startsWith("http");
}
