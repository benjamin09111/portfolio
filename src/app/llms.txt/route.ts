import { portfolio, projects } from "@/lib/portfolio";
export const dynamic = "force-static";
export function GET() {
  const base = portfolio.url?.replace(/\/$/, "") ?? "";
  const body =
    [
      `# ${portfolio.name} — ${portfolio.role}`,
      `> ${portfolio.description || portfolio.positioning}`,
      "## Portfolio",
      `- [Full portfolio in Markdown](${base}/portfolio.md): Profile, metrics, skills, experience, contact and complete published case studies.`,
      `- [Website](${base}/): English portfolio; content is available in the initial HTML.`,
      ...projects.map(
        (p) => `- [${p.title}](${base}/projects/${p.slug}): ${p.problem}`,
      ),
    ].join("\n\n") + "\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
