import { z } from "zod";

const localizedTextSchema = z.object({
  en: z.string(),
  es: z.string(),
});

const localizedArraySchema = z.object({
  en: z.array(z.string()),
  es: z.array(z.string()),
});

const linkSchema = z.object({
  label: localizedTextSchema,
  href: z.string(),
  icon: z.string(),
});

export const siteSchema = z.object({
  name: z.string(),
  role: localizedTextSchema,
  location: localizedTextSchema,
  email: z.string(),
  cv: z.object({
    href: z.string(),
    label: localizedTextSchema,
  }),
  social: z.array(linkSchema),
  seo: z.object({
    title: localizedTextSchema,
    description: localizedTextSchema,
    keywords: z.object({ en: z.array(z.string()), es: z.array(z.string()) }),
  }),
});

export const navigationSchema = z.object({
  items: z.array(z.object({ id: z.string(), label: localizedTextSchema })),
});

export const uiSchema = z.object({
  skipLink: localizedTextSchema,
  language: localizedTextSchema,
  copyEmail: localizedTextSchema,
  copiedEmail: localizedTextSchema,
  navLabel: localizedTextSchema,
  viewAll: localizedTextSchema,
  searchPlaceholder: localizedTextSchema,
  noResults: localizedTextSchema,
  filterLabel: localizedTextSchema,
  all: localizedTextSchema,
  stack: localizedTextSchema,
  featured: localizedTextSchema,
});

export const heroSchema = z.object({
  eyebrow: localizedTextSchema,
  title: localizedTextSchema,
  summary: localizedTextSchema,
  typewriter: localizedArraySchema,
  primaryAction: localizedTextSchema,
  secondaryAction: localizedTextSchema,
  emailLabel: localizedTextSchema,
});

const experienceSchema = z.object({
  company: localizedTextSchema,
  role: localizedTextSchema,
  period: localizedTextSchema,
  summary: localizedTextSchema,
  bullets: localizedArraySchema,
  learned: localizedTextSchema,
  stack: z.array(z.string()),
});

const projectDetailsSchema = z.object({
  info: localizedTextSchema,
  whatIDid: localizedTextSchema,
  whatILearned: localizedTextSchema,
  improvements: localizedTextSchema,
});

const projectSchema = z.object({
  slug: z.string(),
  title: localizedTextSchema,
  description: localizedTextSchema,
  category: z.string(),
  image: z.string(),
  stack: z.array(z.string()),
  links: z.array(linkSchema),
  featured: z.boolean(),
  details: projectDetailsSchema,
});

const technologyItemSchema = z.object({
  name: localizedTextSchema,
  icon: z.string(),
});

const technologyCategorySchema = z.object({
  category: localizedTextSchema,
  items: z.array(technologyItemSchema),
});

const educationSchema = z.object({
  title: localizedTextSchema,
  institution: localizedTextSchema,
  period: localizedTextSchema,
  description: localizedTextSchema,
  kind: localizedTextSchema,
  link: z.string().optional(),
});

const aboutSchema = z.object({
  heading: localizedTextSchema,
  summary: localizedTextSchema,
  bullets: localizedArraySchema,
  stats: z.array(z.object({ value: z.string(), label: localizedTextSchema })),
});

const contactSchema = z.object({
  heading: localizedTextSchema,
  summary: localizedTextSchema,
  cta: localizedTextSchema,
  footer: localizedTextSchema,
});

export const schemas = {
  site: siteSchema,
  navigation: navigationSchema,
  ui: uiSchema,
  hero: heroSchema,
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  technologies: z.array(technologyCategorySchema),
  education: z.array(educationSchema),
  about: aboutSchema,
  contact: contactSchema,
};
