export type Language = "en" | "es";

export type LocalizedText = {
  en: string;
  es: string;
};

export type LocalizedArray = {
  en: string[];
  es: string[];
};

export type LinkItem = {
  label: LocalizedText;
  href: string;
  icon: string;
};
