import { Github, Globe, FileDown } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, Shell } from "@/components/ui";
import { CopyEmailButton } from "@/components/copy-email-button";
import { getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";
import { contact, site, ui, sections } from "@/data";

export function ContactSection({ language }: { language: Language }) {
  return (
    <Shell>
      <SectionHeading eyebrow={getLocalizedText(sections.contact.eyebrow, language)} title={getLocalizedText(contact.heading, language)} description={getLocalizedText(contact.summary, language)} />

      <Card className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">{getLocalizedText(contact.cta, language)}</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text/75">{getLocalizedText(contact.footer, language)}</p>
            <div className="mt-6">
              <CopyEmailButton language={language} email={site.email} copyLabel={ui.copyEmail} copiedLabel={ui.copiedEmail} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={site.cv.href} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition hover:scale-[1.01]">
              <FileDown className="h-4 w-4" />
              {getLocalizedText(site.cv.label, language)}
            </a>
            {site.social.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-5 py-3 text-sm text-text/85 transition hover:border-accent/60 hover:text-accent">
                {link.icon === "github" ? <Github className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                {getLocalizedText(link.label, language)}
              </a>
            ))}
          </div>
        </div>
      </Card>

      <footer className="py-8 text-center text-sm text-text/55">{getLocalizedText(contact.footer, language)}</footer>
    </Shell>
  );
}
