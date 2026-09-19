"use client";

import type { RefObject } from "react";

type IntroActionsProps = {
  labels: {
    linkedin: string;
    github: string;
    about: string;
    pending: string;
  };
  linkedin: string | null;
  github: string | null;
  onOpenAbout: () => void;
  className?: string;
};

export function IntroActions({
  linkedin,
  github,
  labels,
  onOpenAbout,
  className = "",
}: IntroActionsProps) {
  return (
    <div className={`intro-actions ${className}`.trim()}>
      {[
        { label: labels.linkedin, href: linkedin },
        { label: labels.github, href: github },
      ].map(({ label, href }) =>
        href ? (
          <a
            className="intro-action"
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <button
            className="intro-action"
            key={label}
            type="button"
            disabled
            title={labels.pending}
          >
            {label}
            <span aria-hidden="true">↗</span>
          </button>
        ),
      )}
      <button
        className="intro-action"
        type="button"
        onClick={onOpenAbout}
        aria-haspopup="dialog"
      >
        {labels.about}
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

type AboutDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  about: {
    title: string;
    introduction: string;
    sections: { title: string; text: string }[];
  };
  closeLabel: string;
};

export function AboutDialog({
  dialogRef,
  about,
  closeLabel,
}: AboutDialogProps) {
  return (
    <dialog
      ref={dialogRef}
      className="about-dialog"
      aria-labelledby="about-title"
      aria-describedby="about-introduction"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            dialogRef.current?.close();
        }
      }}
    >
      <div className="about-dialog-heading">
        <h2 id="about-title">{about.title}</h2>
        <button
          className="about-close"
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={closeLabel}
        >
          ×
        </button>
      </div>
      <p id="about-introduction">{about.introduction}</p>
      {about.sections.map((section, index) => (
        <section key={index}>
          <h3>{section.title}</h3>
          <p>{section.text}</p>
        </section>
      ))}
    </dialog>
  );
}

