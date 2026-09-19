"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMotion(notify: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const getMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Typewriter({ values }: { values: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeMotion,
    getMotion,
    () => true,
  );

  useEffect(() => {
    if (reduceMotion || !values.length) return;
    const current = values[index % values.length] ?? "";
    const complete = !deleting && text === current;
    const speed = complete ? 1100 : deleting ? 38 : 56;
    const timer = window.setTimeout(() => {
      if (complete) {
        setDeleting(true);
      } else if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setIndex((value) => (value + 1) % values.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [deleting, index, reduceMotion, text, values]);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.3em] text-accent">
      <span>{reduceMotion ? values[0] : text || values[0]}</span>
      <span
        className="h-4 w-[2px] animate-pulseSoft bg-highlight"
        aria-hidden="true"
      />
    </span>
  );
}
