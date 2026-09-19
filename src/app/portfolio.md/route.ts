import { portfolioMarkdown } from "@/lib/portfolio";
export const dynamic = "force-static";
export function GET() {
  return new Response(portfolioMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
