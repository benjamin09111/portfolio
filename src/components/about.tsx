"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import aboutImage from "../../me.webp";
import { Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Shell } from "@/components/ui";
import { getLocalizedArray, getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";
import { about, sections } from "@/data";

function ImageCard({ src, alt }: { src: ImageProps["src"]; alt: string }) {
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
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-surface h-[380px] select-none hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(255,130,180,0.06)] transition-all duration-500 animate-float hover:[animation-play-state:paused]"
    >
      {/* Sunset Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 130, 180, 0.15), rgba(255, 210, 140, 0.05) 50%, transparent)`,
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-85"
      />
    </div>
  );
}

function InfoCard({ language }: { language: Language }) {
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
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-surface p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(255,130,180,0.06)] flex flex-col justify-between h-[380px] select-none"
    >
      {/* Sunset Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 130, 180, 0.12), rgba(255, 210, 140, 0.05) 50%, transparent)`,
        }}
      />

      <div className="space-y-6">
        {/* Bullets List */}
        <div className="space-y-4">
          {getLocalizedArray(about.bullets, language).map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3.5 text-xs leading-relaxed text-text/85">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10 border border-accent/25 text-accent group-hover:scale-105 group-hover:text-highlight transition-all duration-300">
                <Sparkles className="h-3 w-3" />
              </div>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row at the bottom */}
      <div className="grid gap-3 grid-cols-3">
        {about.stats.map((stat) => (
          <div
            key={stat.value}
            className="rounded-2xl border border-border/40 bg-surface2/60 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-surface2 hover:shadow-[0_0_12px_rgba(255,210,140,0.05)]"
          >
            <p className="text-2xl lg:text-3xl font-extrabold text-accent group-hover:text-highlight transition-colors duration-300 leading-none">
              {stat.value}
            </p>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-text/60 leading-tight">
              {getLocalizedText(stat.label, language)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSection({ language }: { language: Language }) {
  return (
    <Shell>
      <SectionHeading eyebrow={getLocalizedText(sections.about.eyebrow, language)} title={getLocalizedText(about.heading, language)} description={getLocalizedText(about.summary, language)} />

      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <ImageCard src={aboutImage} alt={language === "en" ? "Portrait" : "Retrato"} />
        <InfoCard language={language} />
      </div>
    </Shell>
  );
}
