"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { SectionHeading, EmptyState } from "@/components/section-heading";
import { Card, Pill, Shell } from "@/components/ui";
import { cn } from "@/components/utils";
import { getLocalizedText, normalizeQuery } from "@/lib/content";
import { iconMap } from "@/lib/icons";
import type { Language } from "@/lib/types";
import { projects, ui, sections } from "@/data";

const categories = ["all", "frontend", "fullstack", "backend", "productivity"] as const;

// Helper to determine grid classes and spans dynamically to maintain absolute symmetry and no empty spots
function getGridLayout(items: typeof projects) {
  const count = items.length;

  if (count === 1) {
    return {
      gridClass: "grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto",
      spans: ["lg:col-span-1"]
    };
  }

  if (count === 2) {
    const hasFeatured = items.some(item => item.featured);
    const allFeatured = items.every(item => item.featured);
    const noneFeatured = items.every(item => !item.featured);

    if (hasFeatured && !allFeatured && !noneFeatured) {
      // 1 featured, 1 standard -> sum to 3 in a 3-column grid
      const spans = items.map(item => item.featured ? "lg:col-span-2" : "lg:col-span-1");
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense",
        spans
      };
    } else {
      // Both featured or both standard -> 2-column grid
      return {
        gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2",
        spans: ["lg:col-span-1", "lg:col-span-1"]
      };
    }
  }

  if (count === 3) {
    // 3 items in a 3-column grid -> all span 1 col
    return {
      gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spans: ["lg:col-span-1", "lg:col-span-1", "lg:col-span-1"]
    };
  }

  // 4 or more items -> 3-column grid with grid-flow-dense
  const spans = items.map(item => item.featured ? "lg:col-span-2" : "lg:col-span-1");
  return {
    gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense",
    spans
  };
}

export function ProjectsSection({ language }: { language: Language }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = normalizeQuery(query);
    return projects.filter((project) => {
      const byCategory = category === "all" || project.category === category;
      const byQuery = !search || [getLocalizedText(project.title, language), getLocalizedText(project.description, language), ...project.stack].join(" ").toLowerCase().includes(search);
      return byCategory && byQuery;
    });
  }, [category, language, query]);

  const { gridClass, spans } = useMemo(() => getGridLayout(filtered), [filtered]);

  return (
    <Shell>
      <SectionHeading
        eyebrow={getLocalizedText(sections.projects.eyebrow, language)}
        title={getLocalizedText(sections.projects.title, language)}
        description={getLocalizedText(sections.projects.description, language)}
      />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${category === item ? "border-accent bg-accent text-background" : "border-border bg-surface2 text-text/80 hover:text-text"}`}
            >
              {item === "all" ? getLocalizedText(sections.projects.categories.all, language) : getLocalizedText(sections.projects.categories[item], language)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 rounded-full border border-border bg-surface2 px-4 py-2 text-sm text-text/70">
          <Search className="h-4 w-4" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={getLocalizedText(ui.searchPlaceholder, language)}
            className="w-56 bg-transparent outline-none placeholder:text-text/40"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message={getLocalizedText(ui.noResults, language)} />
      ) : (
        <div className={cn("grid gap-5 items-stretch", gridClass)}>
          {filtered.map((project, idx) => {
            const techIcons = project.stack.map((tech) => ({ tech, Icon: iconMap[tech.toLowerCase()] ?? iconMap.code }));
            const spanClass = spans[idx];

            return (
              <Card key={getLocalizedText(project.title, language)} className={cn("relative overflow-hidden h-[340px] group border-border/40", spanClass)}>
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  {/* Background Image */}
                  <Image
                    src={project.image}
                    alt={getLocalizedText(project.title, language)}
                    fill
                    className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
                  />

                  {/* Subtle Dark Gradient Overlay - Fades in on hover for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Transparent Glassmorphism Footer - Slides up and fades in on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-background/70 backdrop-blur-md border-t border-border/40 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Pill className="border-accent/30 bg-accent/5 text-[10px] py-0.5 px-2 text-accent">
                        {project.featured ? getLocalizedText(ui.featured, language) : getLocalizedText(sections.projects.categories[project.category as keyof typeof sections.projects.categories], language)}
                      </Pill>
                      {project.active && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-accent font-mono uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                          {language === "es" ? "En desarrollo" : "In development"}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-text leading-snug">{getLocalizedText(project.title, language)}</h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-text/80 line-clamp-2">
                      {getLocalizedText(project.description, language)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {techIcons.map(({ tech, Icon }) => (
                        <span key={tech} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface2/60 px-2 py-0.5 text-[10px] text-text/80 font-medium">
                          <Icon className="h-2.5 w-2.5 text-accent" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </Shell>
  );
}
