import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/components/Link";
import { Icon } from "./Icon";

export function Header() {
  return (
    <div className="w-full px-page-padding-x h-[96px] items-center py-4 flex justify-center">
      <Link type="internal" className="w-[80px] h-full relative" href="/">
        <Icon name="uma-logo" className="text-text w-full h-full" />
      </Link>
      <nav className="mx-auto flex items-center justify-center gap-8">
        <Link href="https://uma.xyz/osnap" type="external">
          oSnap
        </Link>
        <Link href="https://uma.xyz/" type="external">
          OO
        </Link>
        <Link href="https://uma.xyz/oval" type="external">
          Oval
        </Link>
      </nav>
      <ThemeToggle />
    </div>
  );
}
