# Portfolio structure and content

## Implemented plan

1. One-column English page: header → metrics → projects → skills → experience → optional writing → contact.
2. The home page initially renders in English, then restores the saved EN/ES preference in the browser. Case studies are statically generated in English.
3. A single validated JSON feeds the page, project write-ups, SEO, social preview, Person JSON-LD, sitemap, `/llms.txt` and `/portfolio.md`.
4. Responsive CSS, semantic headings, visible keyboard focus, skip link, plain-text metrics and email.
5. Production build, lint and initial-HTML verification.

## Where you write

### Languages

The navbar EN/ES selector translates the home page interface and saves the preference in local storage. Edit `src/data/translations.json` for interface labels, the Spanish role and skill categories, and the English About modal. The Spanish About modal remains in `about` in `src/data/portfolio.json`. Future project descriptions, experience, and other custom portfolio content use the text you supply in `portfolio.json`; they are not automatically translated. Project detail pages and Markdown exports remain in English.

Edit **`src/data/portfolio.json`**. This is the active content source. The previous JSON files remain untouched as a reference but are no longer used by the main page or project pages. No projects, results or employment history have been authored for you.

Blank values are intentional. The layout is available now; add your content before publishing. Missing social URLs leave their buttons disabled. Writing is hidden until notes exist. All changes take effect on the next build/deployment (or immediately in development).

### Profile and SEO

- `name`, `role`: heading, title, social preview and structured data.
- `positioning`: your concise English positioning paragraph.
- `location`: your location and actual timezone/availability wording; `null` hides it.
- `email`: visible text and `mailto:` link in the header and footer contact section.
- `github`, `linkedin`: full HTTPS profile URLs; populate `sameAs` automatically.
- `cv`: `/Benjamin-Salazar-AI-Engineer.pdf`; place your real PDF in `public/`. When this field is null, the navbar uses `/cv.pdf`, currently a placeholder. Replace it with your real CV or configure the filename. Supply a PDF with selectable text; the code does not generate your résumé.
- `url`: your production HTTPS origin. Enables canonical URLs and sitemap entries. No example domain is published.
- `description`: SEO description; include your exact role naturally. Falls back to name, role and positioning when empty.
- `knowsAbout`: factual topics for Person structured data.
- `logistics`: short English strings for your confirmed contracting terms, languages, schedule and other relevant logistics. Do not assume timezone overlap or visa conditions.

### Metrics

`metrics` accepts up to four objects. Each contains `value`, `label`, `context`, `source`. All are strings; `source` is an HTTPS URL to evidence. Include measurement conditions, sample size, date/model version where relevant in `context`. Numbers are rendered as text, never baked into images.

### Projects

`projects` accepts up to three objects. No project objects have been created. Each real project you add needs:

| Field | Value |
| --- | --- |
| `slug` | Unique lowercase URL identifier with hyphens |
| `category` | `evals`, `agent` or `multimodal` |
| `title` | Actual project name |
| `problem` | One sentence about the real problem |
| `stack` | Array of technology names, rendered as prose |
| `metrics` | Two or three objects with the same shape as the top-level metrics |
| `demo`, `repo` | Actual HTTPS URLs |
| `writeup` | Object described below |

The site automatically sorts evals first, agents second and multimodal third. It generates `/projects/<slug>`, its metadata and sitemap entry. Each card has demo, repository and write-up links. Unknown slugs return 404.

`writeup` has six non-empty text fields: `context`, `approach`, `evaluation`, `failures`, `tradeoffs`, `limitations`. Write your own implementation details, reproducibility information, unsuccessful approaches and reasons for your decisions. Keep the combined text concise enough for a one-page case study. All sections render together without tabs; newlines are preserved.

### Other sections

- `skills`: objects with `category` and `description`. Four categories are prepared; add plain prose describing your actual skills, using job vocabulary where truthful.
- `background`: optional short introduction to your experience.
- `experience`: objects with `company`, `role`, `period`, `summary`; order these yourself, most recent first. Keep summaries factual and concise.
- `notes`: up to three objects with `title`, `summary`, `href` (HTTPS). This optional section stays hidden when empty.

## Commands

- `npm run dev`: local development.
- `npm run build`: validate JSON with Zod and prerender pages.
- `npm run lint`: code checks.
- `npm run verify:html`: after building, verify content is in the initial HTML, the section order, SEO and machine-readable routes.
- `npm run content:check`: report the fields you still need to fill without blocking development.
- `npm run content:ready`: the same check with a failing exit code when required content is missing; suitable for a publication pipeline.

A fresh production build is required after changing JSON. This is a Next.js prerendered site, not an SPA-only page. The existing Next.js hosting workflow is retained.
