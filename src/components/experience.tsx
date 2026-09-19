"use client";

import { useState } from "react";
import { BookOpen, Briefcase, Calendar, ChevronRight, Sparkles } from "lucide-react";

import { Card, Pill, Shell } from "@/components/ui";
import { SectionHeading } from "@/components/section-heading";
import { getLocalizedArray, getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";
import { experience, sections } from "@/data";

export function ExperienceSection({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = experience[activeIndex];

  return (
    <Shell>
      <SectionHeading
        eyebrow={getLocalizedText(sections.experience.eyebrow, language)}
        title={getLocalizedText(sections.experience.title, language)}
        description={getLocalizedText(sections.experience.description, language)}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        {/* Timeline/Selector - Displays on Right on desktop */}
        <div className="flex flex-col gap-3 lg:order-2">
          {/* Mobile view: Horizontal Scrollable Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none lg:hidden border-b border-border/40">
            {experience.map((item, idx) => (
              <button
                key={`${getLocalizedText(item.company, language)}-tab`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`whitespace-nowrap rounded-2xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  activeIndex === idx
                    ? "border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(255,210,140,0.12)]"
                    : "border-border/40 bg-surface/40 text-text/60 hover:border-border hover:bg-surface hover:text-text"
                }`}
              >
                {getLocalizedText(item.company, language)}
              </button>
            ))}
          </div>

          {/* Desktop view: Vertical Timeline Selector */}
          <div className="hidden lg:flex flex-col gap-3 relative before:absolute before:left-[21px] before:top-4 before:bottom-4 before:w-[2px] before:bg-border/40">
            {experience.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={`${getLocalizedText(item.company, language)}-timeline`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-start gap-4 rounded-3xl border p-4 text-left transition-all duration-300 relative z-10 ${
                    isSelected
                      ? "border-accent bg-surface shadow-glow"
                      : "border-border/40 bg-surface/40 hover:border-border/80 hover:bg-surface/70"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/15 text-accent shadow-[0_0_12px_rgba(255,210,140,0.15)]"
                        : "border-border bg-surface2 text-text/60"
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-wide ${
                        isSelected ? "text-accent" : "text-text/50"
                      }`}
                    >
                      <Calendar className="h-3 w-3" />
                      {getLocalizedText(item.period, language)}
                    </span>
                    <h3 className="text-lg font-semibold text-text leading-snug">{getLocalizedText(item.role, language)}</h3>
                    <p className="text-sm text-accent/80 font-medium">{getLocalizedText(item.company, language)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlights Details Card - Displays on Left on desktop */}
        <div className="flex lg:order-1">
          <Card key={activeIndex} className="flex flex-col justify-between p-6 lg:p-8 w-full animate-fadeUp">
            <div className="space-y-6">
              {/* Header inside details for mobile reference or general structure */}
              <div className="flex flex-col gap-2 border-b border-border/40 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill className="border-accent/40 bg-accent/5 text-accent">
                    {getLocalizedText(activeItem.period, language)}
                  </Pill>
                  <span className="text-xs uppercase tracking-wider text-accent/80 lg:hidden">
                    {getLocalizedText(activeItem.company, language)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text mt-1">{getLocalizedText(activeItem.role, language)}</h3>
                <p className="text-base text-accent font-semibold hidden lg:block">{getLocalizedText(activeItem.company, language)}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm leading-7 text-text/80 italic">
                  &ldquo;{getLocalizedText(activeItem.summary, language)}&rdquo;
                </p>

                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text/50">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    {language === "es" ? "Impacto y Logros Clave" : "Key Impact & Achievements"}
                  </h4>
                  <ul className="grid gap-2">
                    {getLocalizedArray(activeItem.bullets, language).map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 rounded-2xl border border-border/40 bg-background/25 px-4 py-3 text-sm text-text/90 leading-6"
                      >
                        <ChevronRight className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* "Qué Aprendí" / "What I learned" Highlight Box */}
                <div className="rounded-2xl border border-accent/20 bg-gradient-to-r from-highlight/10 to-accent/5 p-4 flex gap-3 items-start hover:border-accent/30 transition-colors duration-300">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 text-accent transition-transform duration-300">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-accent/90">
                      {language === "es" ? "Qué aprendí" : "What I learned"}
                    </h5>
                    <p className="text-xs leading-relaxed text-text/90">
                      {getLocalizedText(activeItem.learned, language)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border/40 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text/50">
                {language === "en" ? "Technologies Used" : "Tecnologías Utilizadas"}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeItem.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border bg-surface2 px-3 py-1.5 text-xs text-text/80 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
