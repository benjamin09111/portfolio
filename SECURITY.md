# Security and maintenance

## Scope

This is a public portfolio, with no authentication, form submissions, database, analytics, or application API. Rendered content, downloaded PDFs, JavaScript, CSS, `/portfolio.md`, and `/llms.txt` are intentionally public. Never store credentials or confidential material in these files or in `public/`. Git ignore rules prevent accidental additions of environment files; they cannot remove secrets already committed to history.

## Implemented controls

- Next.js 16.3.5 and React 19, with a committed dependency lockfile. Use Node.js 22.18 or newer and `npm ci` for reproducible installs.
- `src/lib/portfolio.ts` is server-only. Content is validated by `portfolio-schema.ts`; `public-home.ts` explicitly selects the data the homepage needs. Project writeups and server metadata are not duplicated in homepage props.
- External content URLs require HTTPS and reject embedded credentials. CV paths accept only the configured local PDF filename pattern. React escapes rendered text; JSON-LD escapes `<` before inclusion in a script tag.
- Production browser source maps and the framework identification header are disabled. HTTP headers reject framing, MIME sniffing, camera, microphone and location access.
- CSP currently restricts document base URLs, objects, framing and form targets. **It is a baseline, not a strict script CSP.** Next.js static hydration uses inline scripts. A future strict script policy must use supported hashes or per-response nonces and be tested against hydration; nonce-based rendering changes the static caching strategy.
- No extra third-party tracking or security dependencies were added. The only browser preference stored is EN/ES.

## Verification

Run `npm run verify` for lint (zero warnings), TypeScript, security regression tests, production build, generated HTML assertions and HTTP checks. HTTP checks start their own loopback-only production server and stop it afterward. Run `npm audit` separately for current dependency advisories; a clean result is not a penetration test or a guarantee against unknown vulnerabilities.

The September 19, 2026 review passed these checks and reported zero known dependency vulnerabilities. A focused working-tree scan found no matching private-key or common API-token patterns. This did not audit Git history, deployment accounts or hosting infrastructure.

## Deployment responsibilities

- Set `url` in `src/data/portfolio.json` to the real HTTPS origin before publishing. Until then, Next.js warns about the social metadata base URL.
- Enforce HTTPS and configure HSTS at the hosting/CDN layer after verifying the production domain. Do not run `next dev` as the public production server.
- These HTTP headers are applied by Next.js hosting. A future static export needs equivalent headers at its host.
- Review the contents of the real CV before replacing the placeholder: anything downloadable is public.
- Re-run verification and dependency audits on updates. No GDPR, accessibility certification, or comprehensive security compliance is asserted by this review.

## References

- [Next.js data security](https://nextjs.org/docs/app/guides/data-security)
- [Next.js content security policy](https://nextjs.org/docs/app/guides/content-security-policy)
- [OWASP HTTP headers guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
