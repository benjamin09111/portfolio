import type { Portfolio } from "./portfolio-schema";

/** Explicit allowlist: new server-side fields are never serialized by default. */
export function toPublicHome(p: Portfolio) {
  const order = { evals: 0, agent: 1, multimodal: 2 };
  return {
    name: p.name,
    role: p.role,
    positioning: p.positioning,
    location: p.location,
    email: p.email,
    github: p.github,
    linkedin: p.linkedin,
    cv: p.cv,
    about: p.about,
    metrics: p.metrics,
    skills: p.skills,
    background: p.background,
    experience: p.experience,
    notes: p.notes,
    logistics: p.logistics,
    projects: [...p.projects]
      .sort((a, b) => order[a.category] - order[b.category])
      .map(
        ({ slug, category, title, problem, stack, metrics, demo, repo }) => ({
          slug,
          category,
          title,
          problem,
          stack,
          metrics,
          demo,
          repo,
        }),
      ),
  };
}

export type PublicHome = ReturnType<typeof toPublicHome>;
