"use client";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Button, ButtonProps } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "./Link";
import { nav } from "./Header";
import { useTheme } from "next-themes";

export function HamburgerButton({ className, ...props }: ButtonProps) {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn("h-[40px] w-[40px]", className)}
          {...props}
        >
          <Icon name="hamburger" className="h-[20px] w-[20px] text-text/75" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {nav.map((route) => (
          <DropdownMenuItem key={route.href} asChild>
            <Link href={route.href} type="external">
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex gap-1">
              <Icon
                name="sun"
                className="h-[1.2rem] text-text w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <Icon
                name="moon"
                className="absolute text-text h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
              <span>Theme</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                checked={theme === "light"}
                onCheckedChange={() => {
                  setTheme("light");
                }}
              >
                Light
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "dark"}
                onCheckedChange={() => {
                  setTheme("dark");
                }}
              >
                Dark
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={theme === "system"}
                onCheckedChange={() => {
                  setTheme("system");
                }}
              >
                System
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
