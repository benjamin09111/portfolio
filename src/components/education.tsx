"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Pill, Shell } from "@/components/ui";
import { getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";
import { education, sections } from "@/data";

interface EducationItem {
  kind: { en: string; es: string };
  title: { en: string; es: string };
  institution: { en: string; es: string };
  period: { en: string; es: string };
  description: { en: string; es: string };
}

function EducationCard({ item, language }: { item: EducationItem; language: Language }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface/50 hover:shadow-[0_0_20px_rgba(255,130,180,0.05)] flex flex-col justify-between h-[230px] select-none"
    >
      {/* Sunset Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(255, 130, 180, 0.12), rgba(255, 210, 140, 0.05) 50%, transparent)`,
        }}
      />

      <div className="space-y-4">
        {/* Top bar: Kind Badge & Period */}
        <div className="flex items-center justify-between">
          <Pill className="border-accent/30 bg-accent/5 text-[10px] py-0.5 px-2 text-accent group-hover:border-highlight/30 group-hover:bg-highlight/5 group-hover:text-highlight transition-colors duration-300">
            {getLocalizedText(item.kind, language)}
          </Pill>
          <span className="font-mono text-[10px] text-text/50 group-hover:text-text/70 transition-colors duration-300">
            {getLocalizedText(item.period, language)}
          </span>
        </div>

        {/* Title & Institution */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface2 border border-border/60 text-accent group-hover:scale-110 group-hover:border-accent/30 group-hover:text-highlight transition-all duration-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-text group-hover:text-accent leading-snug transition-colors duration-300 truncate">
              {getLocalizedText(item.title, language)}
            </h3>
            <p className="text-xs text-text/60 mt-0.5 font-medium truncate">
              {getLocalizedText(item.institution, language)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-text/75 line-clamp-3">
          {getLocalizedText(item.description, language)}
        </p>
      </div>
    </div>
  );
}

export function EducationSection({ language }: { language: Language }) {
  return (
    <Shell>
      <SectionHeading
        eyebrow={getLocalizedText(sections.education.eyebrow, language)}
        title={getLocalizedText(sections.education.title, language)}
        description={getLocalizedText(sections.education.description, language)}
      />

      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {education.map((item) => (
          <EducationCard
            key={`${getLocalizedText(item.title, language)}-${getLocalizedText(item.period, language)}`}
            item={item}
            language={language}
          />
        ))}
      </div>
    </Shell>
  );
}
