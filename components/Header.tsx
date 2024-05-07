import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Icon } from "./Icon";

export function Header() {
  return (
    <div className="w-full px-page-padding-x h-[96px] items-center py-4 flex justify-between">
      <Link className="w-[80px] h-full relative" href="/">
        <Icon name="uma-logo" className="text-text w-full h-full" />
      </Link>
      <ThemeToggle />
    </div>
  );
}
