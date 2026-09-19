"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Language } from "@/lib/types";

const STORAGE_KEY = "portfolio-language";
const CHANGE_EVENT = "portfolio-language-change";
let sessionPreference: Language | undefined;

function getSnapshot(): Language {
  if (sessionPreference) return sessionPreference;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      sessionPreference = undefined;
      notify();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, notify);
  };
}

export function usePortfolioLanguage() {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "en" as const,
  );

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    const skip = document.getElementById("skip-content");
    const previousSkipText = skip?.textContent;
    document.documentElement.lang = language;
    if (skip)
      skip.textContent =
        language === "es" ? "Saltar al contenido" : "Skip to content";
    return () => {
      document.documentElement.lang = previousLanguage;
      if (skip && previousSkipText) skip.textContent = previousSkipText;
    };
  }, [language]);

  function changeLanguage(value: Language) {
    sessionPreference = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Language selection still works without persistence.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { language, changeLanguage };
}
