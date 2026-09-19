"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Language } from "@/lib/types";
import { languages, getLocalizedText } from "@/lib/content";
import { navigation, ui } from "@/data";

export function Navbar({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "#top");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={isHome ? "#top" : "/"} onClick={handleLogoClick} className="font-mono text-sm tracking-[0.25em] text-accent">
          BENJAMIN
        </Link>

        <nav aria-label={getLocalizedText(ui.navLabel, language)} className="flex max-w-[58vw] items-center gap-2 overflow-x-auto whitespace-nowrap md:max-w-none">
          {navigation.items.map((item) => (
            <Link
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="rounded-full px-3 py-2 text-sm text-text/80 transition hover:bg-surface2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              {getLocalizedText(item.label, language)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-border bg-surface2 p-1 text-sm">
            {languages.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLanguageChange(item)}
                className={`rounded-full px-3 py-1.5 transition ${language === item ? "bg-accent text-background" : "text-text/80 hover:text-text"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
