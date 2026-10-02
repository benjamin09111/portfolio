import "server-only";
import raw from "@/data/portfolio.json";
import { portfolioSchema } from "@/lib/portfolio-schema";

export const portfolio = portfolioSchema.parse(raw);
const order = { evals: 0, agent: 1, multimodal: 2 };
export const projects = [...portfolio.projects].sort(
  (a, b) => order[a.category] - order[b.category],
);
export const profileLinks = [
  { label: "GitHub", href: portfolio.github },
  { label: "CV (PDF)", href: portfolio.cv },
  {
    label: portfolio.email ?? "Email",
    href: portfolio.email ? `mailto:${portfolio.email}` : null,
  },
  { label: "LinkedIn", href: portfolio.linkedin },
].filter((link): link is { label: string; href: string } => Boolean(link.href));
export const writeupLabels = {
  context: "Problem & context",
  approach: "Implementation",
  evaluation: "Evaluation & reproducibility",
  failures: "What did not work",
  tradeoffs: "Decisions & trade-offs",
  limitations: "Limitations & next steps",
} as const;
export function portfolioMarkdown() {
  const p = portfolio;
  return (
    [
      `# ${p.name} — ${p.role}`,
      p.positioning,
      p.location,
      ...profileLinks.map((link) => `[${link.label}](${link.href})`),
      "## Measured results",
      ...p.metrics.map(
        (m) => `- ${m.value} ${m.label}. ${m.context} [Source](${m.source})`,
      ),
      "## Selected projects",
      ...projects.flatMap((project) => [
        `### ${project.title}${project.active ? " (In development)" : ""}`,
        project.problem,
        `Stack: ${project.stack.join(", ")}.`,
        ...project.metrics.map(
          (m) => `- ${m.value} ${m.label}. ${m.context} [Source](${m.source})`,
        ),
        `[Live demo](${project.demo}) · [Repository](${project.repo}) · [Write-up](/projects/${project.slug})`,
        ...Object.entries(writeupLabels).flatMap(([key, label]) => [
          `#### ${label}`,
          project.writeup[key as keyof typeof writeupLabels],
        ]),
      ]),
      "## Skills & focus",
      ...p.skills.flatMap((s) => [`### ${s.category}`, s.description]),
      "## Experience",
      p.background,
      ...p.experience.flatMap((e) => [
        `### ${e.role} · ${e.company}`,
        e.period,
        e.summary,
      ]),
      ...(p.notes.length
        ? [
            "## Writing",
            ...p.notes.map((n) => `[${n.title}](${n.href}) — ${n.summary}`),
          ]
        : []),
      "## Contact & logistics",
      p.email,
      ...p.logistics,
    ]
      .filter(Boolean)
      .join("\n\n") + "\n"
  );
}
