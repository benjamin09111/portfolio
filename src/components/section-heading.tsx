import { Card } from "@/components/ui";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-text/75">{description}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <Card className="p-8 text-sm text-text/75">
      <p>{message}</p>
    </Card>
  );
}
