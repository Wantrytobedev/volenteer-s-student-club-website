import Link from "next/link";
import { th } from "@/lib/i18n/th";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/", label: th.nav.home },
  { href: "/about", label: th.nav.about },
  { href: "/camps", label: th.nav.camps },
  { href: "/calendar", label: th.nav.calendar },
  { href: "/sponsor", label: th.nav.sponsor },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1e3a8a] text-white">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {th.siteName}
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
