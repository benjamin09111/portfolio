import type { Language, LocalizedArray, LocalizedText } from "@/lib/types";

export const languages: Language[] = ["en", "es"];

export function getLocalizedText(value: LocalizedText, language: Language) {
  return value[language];
}

export function getLocalizedArray(value: LocalizedArray, language: Language) {
  return value[language];
}

export function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}
