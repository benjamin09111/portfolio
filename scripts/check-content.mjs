import fs from "node:fs";
import path from "node:path";
const p = JSON.parse(
  fs.readFileSync("src/data/portfolio.json", "utf8").replace(/^\uFEFF/, ""),
);
const missing = [];
for (const field of [
  "positioning",
  "description",
  "email",
  "github",
  "linkedin",
  "cv",
  "url",
  "location",
]) {
  if (!p[field]) missing.push(field);
}
if (p.metrics.length < 3) missing.push("metrics: add 3–4 measured results");
for (const category of ["evals", "agent", "multimodal"]) {
  if (!p.projects.some((item) => item.category === category))
    missing.push(`projects: ${category}`);
}
if (!p.knowsAbout.length) missing.push("knowsAbout");
if (!p.experience.length) missing.push("experience");
if (!p.logistics.length) missing.push("logistics");
for (const skill of p.skills)
  if (!skill.description) missing.push(`skills: ${skill.category}`);
if (p.cv) {
  const publicRoot = path.resolve("public");
  const cv = path.resolve(publicRoot, p.cv.replace(/^\//, ""));
  if (!cv.startsWith(publicRoot + path.sep) || !fs.existsSync(cv))
    missing.push("cv: referenced PDF file is missing");
  else if (fs.readFileSync(cv).subarray(0, 5).toString() !== "%PDF-")
    missing.push("cv: file is not a PDF");
}
if (missing.length) {
  console.log(
    "Content fields to complete in src/data/portfolio.json:\n" +
      missing.map((item) => `- ${item}`).join("\n"),
  );
  if (process.argv.includes("--strict")) process.exitCode = 1;
} else
  console.log(
    "Required content fields and CV file are present. Review factual claims, external links and PDF text selection before publishing.",
  );
