import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolio, projects, writeupLabels } from "@/lib/portfolio";
import { MetricList } from "@/components/metric-list";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.problem,
    alternates: portfolio.url
      ? { canonical: `/projects/${project.slug}` }
      : undefined,
    openGraph: { title: project.title, description: project.problem },
    twitter: { title: project.title, description: project.problem },
  };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return (
    <main id="main" className="portfolio writeup">
      <Link href="/#projects">← All projects</Link>
      <header>
        <div className="project-heading-meta">
          <p className="eyebrow">Engineering case study / {project.category}</p>
          {project.active && (
            <span className="project-status">
              <span className="project-status-dot" aria-hidden="true" />
              In development
            </span>
          )}
        </div>
        <h1>{project.title}</h1>
        <p>{project.problem}</p>
        <p className="stack">Stack: {project.stack.join(" · ")}</p>
        <div className="project-links">
          <a href={project.demo}>Live demo ↗</a>
          <a href={project.repo}>Repository ↗</a>
        </div>
      </header>
      <section aria-labelledby="results">
        <h2 id="results">Measured results</h2>
        <MetricList metrics={project.metrics} />
      </section>
      {Object.entries(writeupLabels).map(([key, label]) => (
        <section key={key} aria-labelledby={key}>
          <h2 id={key}>{label}</h2>
          <p>{project.writeup[key as keyof typeof writeupLabels]}</p>
        </section>
      ))}
      <footer>
        <Link href="/#contact">Contact {portfolio.name}</Link>
        <a href="/portfolio.md">Read as Markdown</a>
      </footer>
    </main>
  );
}
