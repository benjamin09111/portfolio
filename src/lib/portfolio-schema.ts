import { z } from "zod";

const externalUrl = z
  .string()
  .url()
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  }, "Use an HTTPS URL without embedded credentials");
const metric = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  context: z.string().min(1),
  source: externalUrl,
});
const project = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.enum(["evals", "agent", "multimodal"]),
    title: z.string().min(1),
    problem: z.string().min(1),
    stack: z.array(z.string()).min(1),
    metrics: z.array(metric).min(2).max(3),
    demo: externalUrl,
    repo: externalUrl,
    active: z.boolean().optional().default(false),
    isActive: z.boolean().optional(),
    writeup: z.object({
      context: z.string().min(1),
      approach: z.string().min(1),
      evaluation: z.string().min(1),
      failures: z.string().min(1),
      tradeoffs: z.string().min(1),
      limitations: z.string().min(1),
    }),
  })
  .transform((item) => ({
    ...item,
    active: Boolean(item.active || item.isActive),
  }));
export const portfolioSchema = z
  .object({
    name: z.string(),
    role: z.string(),
    positioning: z.string(),
    description: z.string(),
    location: z.string().nullable(),
    email: z.string().email().nullable(),
    github: externalUrl.nullable(),
    linkedin: externalUrl.nullable(),
    about: z.object({
      title: z.string(),
      introduction: z.string(),
      sections: z.array(z.object({ title: z.string(), text: z.string() })),
    }),
    cv: z
      .string()
      .regex(/^\/[A-Za-z-]+-AI-Engineer\.pdf$/)
      .nullable(),
    url: externalUrl.nullable(),
    knowsAbout: z.array(z.string()),
    metrics: z.array(metric).max(4),
    projects: z.array(project).max(3),
    skills: z.array(
      z.object({ category: z.string(), description: z.string() }),
    ),
    background: z.string(),
    experience: z.array(
      z.object({
        company: z.string(),
        role: z.string(),
        period: z.string(),
        summary: z.string(),
      }),
    ),
    notes: z
      .array(
        z.object({ title: z.string(), summary: z.string(), href: externalUrl }),
      )
      .max(3),
    logistics: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (
      new Set(data.projects.map((item) => item.slug)).size !==
      data.projects.length
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Project slugs must be unique",
      });
    }
  });

export type Portfolio = z.infer<typeof portfolioSchema>;
