import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { portfolioSchema } from "../src/lib/portfolio-schema.ts";
import { toPublicHome } from "../src/lib/public-home.ts";
import config from "../next.config.mjs";

const raw = JSON.parse(
  readFileSync(new URL("../src/data/portfolio.json", import.meta.url), "utf8"),
);

test("profile URLs reject scripts, credentials, malformed URLs and HTTP", () => {
  for (const github of [
    "javascript:alert(1)",
    "https://user:secret@example.com",
    "http://example.com",
    "invalid",
  ]) {
    assert.equal(portfolioSchema.safeParse({ ...raw, github }).success, false);
  }
  assert.equal(
    portfolioSchema.safeParse({ ...raw, github: "https://github.com/example" })
      .success,
    true,
  );
});

test("CV path cannot escape the public PDF path", () => {
  for (const cv of [
    "//example.com/cv.pdf",
    "/../secret.pdf",
    "javascript:alert(1)",
  ]) {
    assert.equal(portfolioSchema.safeParse({ ...raw, cv }).success, false);
  }
});

test("home payload excludes server metadata, writeups and unknown fields", () => {
  const p = portfolioSchema.parse(raw);
  const project = {
    slug: "test",
    category: "agent",
    title: "Test",
    problem: "Test",
    stack: [],
    metrics: [],
    demo: "https://example.com",
    repo: "https://example.com",
    writeup: { context: "not needed on home" },
  };
  const result = toPublicHome({
    ...p,
    internalSecret: "private",
    projects: [project],
  });
  assert.equal("internalSecret" in result, false);
  assert.equal("description" in result, false);
  assert.equal("url" in result, false);
  assert.equal("writeup" in result.projects[0], false);
  assert.equal(result.projects[0].slug, "test");
});

test("response headers prevent framing, MIME sniffing and sensitive browser permissions", async () => {
  const [{ headers }] = await config.headers();
  const values = Object.fromEntries(
    headers.map(({ key, value }) => [key, value]),
  );
  assert.equal(values["X-Frame-Options"], "DENY");
  assert.equal(values["X-Content-Type-Options"], "nosniff");
  assert.match(values["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.match(values["Permissions-Policy"], /camera=\(\)/);
  assert.equal(config.productionBrowserSourceMaps, false);
});

test("public directory contains no environment, private-key or source-map files", () => {
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      assert.doesNotMatch(
        entry.name,
        /^(?:\.env|\.git)|\.(?:pem|key|p12|pfx|map)$/i,
      );
      if (entry.isDirectory()) scan(join(directory, entry.name));
    }
  }
  scan(fileURLToPath(new URL("../public", import.meta.url)));
});
