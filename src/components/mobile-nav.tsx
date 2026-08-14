"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { th } from "@/lib/i18n/th";

const links = [
  { href: "/", label: th.nav.home },
  { href: "/about", label: th.nav.about },
  { href: "/camps", label: th.nav.camps },
  { href: "/calendar", label: th.nav.calendar },
  { href: "/sponsor", label: th.nav.sponsor },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? th.nav.closeMenu : th.nav.menu}
        className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-16 z-50 border-t border-white/10 bg-[#1e3a8a] px-4 py-4 shadow-lg">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
