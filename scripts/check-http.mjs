import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout } from "node:timers/promises";

const reservation = createServer();
await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { stdio: ["ignore", "pipe", "pipe"], windowsHide: true },
);
let output = "";
child.stdout.on("data", (chunk) => {
  output += chunk;
});
child.stderr.on("data", (chunk) => {
  output += chunk;
});
const base = `http://127.0.0.1:${port}`;
try {
  let response;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (child.exitCode !== null) throw new Error(`Server exited: ${output}`);
    try {
      response = await fetch(base, { signal: AbortSignal.timeout(2000) });
      break;
    } catch {
      await setTimeout(200);
    }
  }
  assert.equal(
    response?.status,
    200,
    `Production server did not start: ${output}`,
  );
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(
    response.headers.get("content-security-policy"),
    /frame-ancestors 'none'/,
  );
  for (const path of [
    "/.env",
    "/.env.local",
    "/.git/config",
    "/src/data/portfolio.json",
    "/package.json",
    "/audit-result.json",
  ]) {
    assert.equal(
      (await fetch(base + path)).status,
      404,
      `${path} must not be published`,
    );
  }
  for (const path of [
    "/portfolio.md",
    "/llms.txt",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
  ]) {
    assert.equal(
      (await fetch(base + path)).status,
      200,
      `${path} must remain available`,
    );
  }
  console.log(
    "Production HTTP checks passed: public routes, security headers and private-file paths.",
  );
} finally {
  child.kill();
}
