"use client";
import { useEffect, useRef, useState } from "react";
import translations from "@/data/translations.json";
import type { Language } from "@/lib/types";
import { IntroActions } from "@/components/intro-actions";

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
  onOpenAbout,
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
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setMenuOpen(false);
      }}
    >
      <a className="wordmark" href="#main" onClick={() => setMenuOpen(false)}>
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
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {menuOpen ? (
            <path d="m6 6 12 12M6 18 18 6" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      <div
        id="navigation-links"
        className={`nav-links${menuOpen ? " is-open" : ""}`}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a"))
            setMenuOpen(false);
        }}
      >
        <a href="#projects">{t.projects}</a>
        <a href="#experience">{t.experience}</a>
        <a href="#contact">{t.contact}</a>
        <a className="cv-download" href={cv ?? "/cv.pdf"} download>
          {t.download} <span aria-hidden="true">↓</span>
        </a>
        {onOpenAbout && (
          <div className="nav-intro-actions">
            <IntroActions
              linkedin={linkedin ?? null}
              github={github ?? null}
              labels={t.actions}
              onOpenAbout={() => {
                setMenuOpen(false);
                setTimeout(() => {
                  onOpenAbout();
                }, 50);
              }}
            />
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
