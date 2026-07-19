"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChefHat } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSession, signOut } from "@/lib/auth-client";

const loggedOutLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const loggedInExtra = [
  { href: "/ai-chef", label: "AI Chef" },
  { href: "/generate", label: "Generate" },
  { href: "/favorites", label: "Favorites" },
  { href: "/recipes/add", label: "Add Recipe" },
  { href: "/recipes/manage", label: "Manage" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const pathname = usePathname();

  const links = isLoggedIn ? [...loggedOutLinks, ...loggedInExtra] : loggedOutLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-ink/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-display text-xl font-semibold text-herb dark:text-saffron"
        >
          <ChefHat size={22} />
          MealMind
        </Link>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-body text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-paprika dark:text-saffron"
                  : "text-ink/80 hover:text-paprika dark:text-ink/70 dark:hover:text-saffron"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-full bg-paprika dark:bg-saffron" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {isLoggedIn ? (
            <button
              onClick={() => signOut().then(() => (window.location.href = "/"))}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-herb hover:bg-herb/10 dark:text-saffron dark:hover:bg-saffron/10"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-paprika px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper lg:hidden">
          <div className="flex flex-col divide-y divide-ink/10 px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base font-medium ${
                  isActive(link.href) ? "text-paprika dark:text-saffron" : "text-ink/85"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-ink/10 px-6 py-4">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  signOut().then(() => (window.location.href = "/"));
                  setOpen(false);
                }}
                className="w-full rounded-full border border-ink/15 py-2.5 text-sm font-medium text-ink"
              >
                Log out
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-herb/30 py-2.5 text-center text-sm font-medium text-herb dark:border-saffron/30 dark:text-saffron"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-paprika py-2.5 text-center text-sm font-medium text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
