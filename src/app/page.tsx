import { toPublicHome } from "@/lib/public-home";
import { portfolio as p } from "@/lib/portfolio";
import type { Metadata } from "next";
import { PortfolioHome } from "@/components/portfolio-home";
export const metadata: Metadata = {
  alternates: p.url ? { canonical: "/" } : undefined,
};
export default function HomePage() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    description: p.description,
    ...(p.url ? { url: p.url } : {}),
    ...(p.email ? { email: p.email } : {}),
    knowsAbout: p.knowsAbout,
    sameAs: [p.github, p.linkedin].filter(Boolean),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHome p={toPublicHome(p)} />
    </>
  );
}
