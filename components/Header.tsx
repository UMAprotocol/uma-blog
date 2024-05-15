import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/components/Link";
import { Icon } from "./Icon";
import { HamburgerButton } from "./HamburgerButton";

export const nav = [
  {
    href: "https://uma.xyz/osnap",
    label: "oSnap",
  },
  {
    href: "https://uma.xyz/",
    label: "OO",
  },
  {
    href: "https://uma.xyz/oval",
    label: "Oval",
  },
] as const;

export function Header() {
  return (
    <>
      {/* DESKTOP */}
      <div className="w-full hidden sm:flex page-padding-x h-[96px] items-center py-4 justify-center">
        <Link type="internal" className="w-[80px] h-full relative" href="/">
          <Icon name="uma-logo" className="text-text w-full h-full" />
        </Link>

        <nav className="mx-auto flex items-center justify-center gap-8">
          {nav.map((route) => (
            <Link key={route.href} href={route.href} type="external">
              {route.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>

      {/* MOBILE */}
      <div className="w-full sm:hidden page-padding-x h-[96px] items-center py-4 flex justify-between">
        <Link type="internal" className="w-[80px] h-full relative" href="/">
          <Icon name="uma-logo" className="text-text w-full h-full" />
        </Link>
        <HamburgerButton />
      </div>
    </>
  );
}
