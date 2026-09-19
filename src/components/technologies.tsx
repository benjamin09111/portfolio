"use client";

import { useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { Shell } from "@/components/ui";
import { getLocalizedText } from "@/lib/content";
import { iconMap } from "@/lib/icons";
import type { Language } from "@/lib/types";
import { technologies, sections } from "@/data";

interface TechItem {
  name: { en: string; es: string };
  icon: string;
}

function getTechDescription(name: string, language: Language): string {
  const descriptions: Record<string, { en: string; es: string }> = {
    "react": {
      en: "Single Page Apps & Interactive UI",
      es: "Single Page Apps e interfaces interactivas"
    },
    "next.js": {
      en: "Production-ready SSR & SEO architectures",
      es: "Arquitecturas SSR y SEO listas para producción"
    },
    "typescript": {
      en: "Strict type-safety & scalable codebases",
      es: "Código estructurado y libre de errores de tipo"
    },
    "tailwind css": {
      en: "Modern & pixel-perfect responsive layouts",
      es: "Maquetación moderna, fluida y responsiva"
    },
    "node.js": {
      en: "High-performance backend API servers",
      es: "Servidores y APIs backend de alto rendimiento"
    },
    "postgresql": {
      en: "Relational database design & queries optimization",
      es: "Modelado relacional y consultas optimizadas"
    },
    "prisma": {
      en: "Typesafe DB migrations & ORM schemas",
      es: "ORM moderno para consultas seguras"
    },
    "rest apis": {
      en: "Secure & scalable web services design",
      es: "Diseño de servicios web seguros y modulares"
    },
    "git": {
      en: "Collaboration, branching & version control",
      es: "Control de versiones y trabajo colaborativo"
    },
    "docker": {
      en: "Isolated & reproducible project environments",
      es: "Contenedores para entornos aislados y consistentes"
    },
    "zod": {
      en: "Strict runtime data validation & parsing",
      es: "Validación estricta de esquemas de datos"
    },
    "figma": {
      en: "UI/UX wireframing & interactive prototyping",
      es: "Prototipado interactivo y wireframes de UI/UX"
    }
  };

  const key = name.toLowerCase();
  return descriptions[key] ? descriptions[key][language] : "";
}

function getTechStartDate(name: string): string {
  switch (name.toLowerCase()) {
    case "git": return "2021";
    case "react":
    case "typescript":
    case "tailwind css":
    case "rest apis":
    case "figma":
      return "2022";
    case "next.js":
    case "node.js":
    case "postgresql":
    case "prisma":
    case "zod":
      return "2023";
    case "docker":
      return "2024";
    default:
      return "2023";
  }
}

function TechCard({ item, language, idx }: { item: TechItem; language: Language; idx: number }) {
  const Icon = iconMap[item.icon] ?? iconMap.code;
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const description = getTechDescription(item.name.en, language);
  const startDate = getTechStartDate(item.name.en);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 p-5 transition-all duration-500 hover:border-accent/30 hover:bg-surface/60 hover:shadow-[0_0_20px_rgba(255,130,180,0.06)] flex items-center gap-4 h-[90px] select-none animate-float hover:[animation-play-state:paused] hover:-translate-y-1 hover:scale-[1.02]"
      style={{
        animationDelay: `${idx * 0.18}s`,
      }}
    >
      {/* Sunset Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(255, 130, 180, 0.12), rgba(255, 210, 140, 0.05) 50%, transparent)`,
        }}
      />

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface2 border border-border/60 text-accent group-hover:scale-110 group-hover:border-accent/30 group-hover:text-highlight transition-all duration-300">
        <Icon className="h-5.5 w-5.5" />
      </div>

      <div className="flex-grow space-y-1 min-w-0">
        <h4 className="font-semibold text-text text-sm group-hover:text-accent transition-colors duration-300 truncate">
          {getLocalizedText(item.name, language)}
        </h4>
        <p className="text-[11px] text-text/60 font-medium leading-normal truncate pr-1">
          {description}
        </p>
      </div>

      <span className="shrink-0 font-mono text-[10px] text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
        {language === "es" ? "Desde" : "Since"} {startDate}
      </span>
    </div>
  );
}

export function TechnologiesSection({ language }: { language: Language }) {
  return (
    <Shell>
      <SectionHeading
        eyebrow={getLocalizedText(sections.technologies.eyebrow, language)}
        title={getLocalizedText(sections.technologies.title, language)}
        description={getLocalizedText(sections.technologies.description, language)}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {technologies.map((category, catIdx) => (
          <div key={getLocalizedText(category.category, language)} className="space-y-4">
            <h3 className="text-lg font-bold tracking-wider text-text pl-3 border-l-2 border-accent">
              {getLocalizedText(category.category, language)}
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {category.items.map((item, itemIdx) => (
                <TechCard
                  key={item.name.en}
                  item={item}
                  language={language}
                  idx={catIdx * 4 + itemIdx}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
