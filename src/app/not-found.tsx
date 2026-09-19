import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-background">
          Go home
        </Link>
      </div>
    </main>
  );
}
