"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "href"> {
  href: string;
  className?: string;
  activeClassName?: string;
}

export function NavLink({ href, className, activeClassName, ...props }: NavLinkCompatProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return <Link href={href} className={cn(className, isActive && activeClassName)} {...props} />;
}
