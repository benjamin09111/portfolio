import Image from "next/image";
import headerImage from "../../header.webp";

import { CopyEmailButton } from "@/components/copy-email-button";
import { Typewriter } from "@/components/typewriter";
import { Card, Pill, Shell } from "@/components/ui";
import { getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";
import { hero, site, ui } from "@/data";

export function Hero({ language }: { language: Language }) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:28px_28px] opacity-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fadeUp">
            <Pill>{getLocalizedText(hero.eyebrow, language)}</Pill>
            <div className="mt-6">
              <Typewriter values={hero.typewriter[language]} />
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-text sm:text-6xl lg:text-7xl">{getLocalizedText(hero.title, language)}</h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text/75">{getLocalizedText(hero.summary, language)}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition hover:scale-[1.01]">
                {getLocalizedText(hero.primaryAction, language)}
              </a>
              <a href={site.cv.href} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-5 py-3 text-sm text-text transition hover:border-accent/60 hover:text-accent">
                {getLocalizedText(hero.secondaryAction, language)}
              </a>
            </div>

            <div className="mt-8">
              <CopyEmailButton language={language} email={site.email} copyLabel={ui.copyEmail} copiedLabel={ui.copiedEmail} />
            </div>

            <p className="mt-4 text-sm text-text/60">{getLocalizedText(hero.emailLabel, language)}</p>
          </div>

          <Card className="relative overflow-hidden p-3 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-border/70">
              <Image
                src={headerImage}
                alt="Developer workspace at sunset"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mt-2 text-right font-mono text-[10px] tracking-wider text-text/40 mr-1 select-none">
              * AI Generated
            </span>
          </Card>
        </div>
      </Shell>
    </section>
  );
}
