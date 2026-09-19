import fs from "node:fs";
import assert from "node:assert/strict";
const root = ".next/server/app";
const raw = fs.readFileSync(`${root}/index.html`, "utf8");
const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one h1");
assert.match(html, /<html[^>]*lang="en"/, "English document");
assert.match(html, /<title>[^<]*AI Engineer/, "Role in title");
assert.match(html, /name="description"/, "Meta description");
assert.match(raw, /application\/ld\+json/, "Person structured data");
const jsonld = JSON.parse(
  raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(jsonld["@type"], "Person");
assert.equal(jsonld.jobTitle, "AI Engineer");
let previous = -1;
for (const id of [
  "evidence-heading",
  "projects",
  "skills",
  "experience",
  "contact",
]) {
  const index = html.indexOf(`id="${id}"`);
  assert.ok(
    index > previous,
    `${id} exists in requested order without JavaScript`,
  );
  previous = index;
}
assert.doesNotMatch(
  html,
  /example\.com|CV placeholder|Coming soon|github\.com\/(?:"|<)/i,
  "No placeholder links/content",
);
const p = JSON.parse(
  fs.readFileSync("src/data/portfolio.json", "utf8").replace(/^\uFEFF/, ""),
);
const markdown = fs.readFileSync(`${root}/portfolio.md.body`, "utf8");
const llms = fs.readFileSync(`${root}/llms.txt.body`, "utf8");
assert.ok(markdown.includes(p.name));
assert.ok(llms.includes("/portfolio.md"));
for (const project of p.projects) {
  const detail = fs
    .readFileSync(`${root}/projects/${project.slug}.html`, "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.equal((detail.match(/<h1\b/g) || []).length, 1);
  for (const heading of [
    "What did not work",
    "Decisions &amp; trade-offs",
    "Evaluation &amp; reproducibility",
  ])
    assert.ok(detail.includes(heading));
  assert.ok(markdown.includes(project.writeup.failures));
}
console.log(
  "Verified initial HTML, section order, h1, language, metadata, JSON-LD, Markdown and llms.txt.",
);
