"use client";
import { useEffect, useRef, useState } from "react";
import translations from "@/data/translations.json";
import type { Language } from "@/lib/types";

type Props = {
  name: string;
  cv: string | null;
  language: Language;
  onLanguageChange: (language: Language) => void;
  linkedin?: string | null;
  github?: string | null;
  onOpenAbout?: () => void;
};

export function PortfolioNavbar({
  name,
  cv,
  language,
  onLanguageChange,
  linkedin,
  github,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const siblings = Array.from(
      navbarRef.current?.parentElement?.children ?? [],
    ).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== navbarRef.current,
    );
    const previous = siblings.map((element) => element.inert);
    siblings.forEach((element) => {
      element.inert = true;
    });
    return () =>
      siblings.forEach((element, index) => {
        element.inert = previous[index];
      });
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbar.getBoundingClientRect().height}px`,
      );
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(navbar);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--navbar-height");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const t = translations[language];

  return (
    <nav
      ref={navbarRef}
      className={`topbar${menuOpen ? " menu-open" : ""}`}
      aria-label={t.navigation}
      onKeyDown={(event) => {
        if (event.key === "Tab" && menuOpen) {
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <a className="wordmark" href="#main" onClick={closeMenu}>
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")}
        <span> / </span>
        {t.engineering}
      </a>

      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="navigation-links"
        aria-label={menuOpen ? t.menuClose : t.menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        id="navigation-links"
        className={`nav-links${menuOpen ? " is-open" : ""}`}
      >
        <div className="nav-items">
          <a href="#projects" onClick={closeMenu}>
            {t.projects}
          </a>
          <a href="#experience" onClick={closeMenu}>
            {t.experience}
          </a>
          <a href="#contact" onClick={closeMenu}>
            {t.contact}
          </a>
          <a
            className="cv-download"
            href={cv ?? "/cv.pdf"}
            download
            onClick={closeMenu}
          >
            {t.download} <span aria-hidden="true">↓</span>
          </a>
        </div>

        {(linkedin || github) && (
          <div className="mobile-social-links">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                {t.actions.linkedin} <span aria-hidden="true">↗</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                {t.actions.github} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

        <div className="language-switch" role="group" aria-label={t.language}>
          {(["en", "es"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              lang={lang}
              aria-label={
                lang === "en" ? "Switch to English" : "Cambiar a español"
              }
              aria-pressed={language === lang}
              onClick={() => onLanguageChange(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
