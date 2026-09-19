import type { Metadata } from "next";
import type { ReactNode } from "react";
import { portfolio as p } from "@/lib/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  ...(p.url ? { metadataBase: new URL(p.url) } : {}),
  title: {
    default: `${p.name} | ${p.role}`,
    template: `%s | ${p.name} — ${p.role}`,
  },
  description: p.description || `${p.name} | ${p.role}. ${p.positioning}`,
  openGraph: {
    title: `${p.name} | ${p.role}`,
    description: p.description || p.positioning,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${p.name} | ${p.role}`,
    description: p.description || p.positioning,
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          id="skip-content"
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:p-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
