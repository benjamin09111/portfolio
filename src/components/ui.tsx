"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/components/utils";

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback for browsers without IntersectionObserver; content must remain visible.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8",
        isVisible ? "animate-fadeUp" : "opacity-0",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl", className)}>{children}</div>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl border border-border/70 bg-surface/80 shadow-glow backdrop-blur", className)}>{children}</div>;
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border border-border/80 bg-surface2 px-3 py-1 text-xs font-medium text-text", className)}>{children}</span>;
}
