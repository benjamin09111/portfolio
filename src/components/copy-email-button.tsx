"use client";

import { useState } from "react";

import { Copy, Mail } from "lucide-react";

import { getLocalizedText } from "@/lib/content";
import type { Language } from "@/lib/types";

export function CopyEmailButton({ language, email, copyLabel, copiedLabel }: { language: Language; email: string; copyLabel: { en: string; es: string }; copiedLabel: { en: string; es: string } }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-4 py-2 text-sm text-text transition hover:border-accent/60 hover:text-accent">
        <Mail className="h-4 w-4" />
        <span>{email}</span>
      </a>
      <button type="button" onClick={handleCopy} className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-2 text-sm font-medium text-background transition hover:scale-[1.01]">
        <Copy className="h-4 w-4" />
        <span>{copied ? getLocalizedText(copiedLabel, language) : getLocalizedText(copyLabel, language)}</span>
      </button>
    </div>
  );
}
