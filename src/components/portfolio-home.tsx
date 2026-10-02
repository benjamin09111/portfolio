"use client";
import { useRef } from "react";
import type { PublicHome } from "@/lib/public-home";
import { PortfolioNavbar } from "@/components/portfolio-navbar";
import { usePortfolioLanguage } from "@/hooks/use-portfolio-language";
import { MetricList } from "@/components/metric-list";
import { IntroActions, AboutDialog } from "@/components/intro-actions";
import translations from "@/data/translations.json";

export function PortfolioHome({ p }: { p: PublicHome }) {
  const { language, changeLanguage } = usePortfolioLanguage();
  const aboutDialogRef = useRef<HTMLDialogElement>(null);
  const handleOpenAbout = () => {
    aboutDialogRef.current?.showModal();
  };
  const projects = p.projects;
  const profileLinks = [
    ...(p.cv ? [{ label: "CV (PDF)", href: p.cv }] : []),
    ...(p.email ? [{ label: p.email, href: `mailto:${p.email}` }] : []),
  ];
  const t = translations[language];
  return (
    <main id="main" className="portfolio">
      <PortfolioNavbar
        name={p.name}
        cv={p.cv}
        language={language}
        onLanguageChange={changeLanguage}
        linkedin={p.linkedin}
        github={p.github}
        onOpenAbout={handleOpenAbout}
      />
      <header className="intro">
        <div className="intro-heading">
          <h1>
            {p.name}{" "}
            <span>{language === "es" ? translations.es.role : p.role}</span>
          </h1>
          <IntroActions
            className="header-actions"
            linkedin={p.linkedin}
            github={p.github}
            labels={t.actions}
            onOpenAbout={handleOpenAbout}
          />
        </div>
        {(p.positioning || p.location) && (
          <p className="positioning">
            {p.positioning} {p.location}
          </p>
        )}
        <div className="profile-links">
          {profileLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      </header>
      <section className="evidence" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="eyebrow">
          {t.results}
        </h2>
        <MetricList metrics={p.metrics} sourceLabel={t.source} />
      </section>
      <section
        id="projects"
        className="section"
        aria-labelledby="projects-heading"
      >
        <div className="section-title">
          <span className="index">01</span>
          <h2 id="projects-heading">{t.selectedProjects}</h2>
          <span className="section-aside">{t.focus}</span>
        </div>
        {projects.map((project, i) => (
          <article className="project" key={project.slug}>
            <div className="project-header">
              <p className="eyebrow">
                0{i + 1} / {project.category}
              </p>
              {project.active && (
                <span className="project-status">
                  <span className="project-status-dot" aria-hidden="true" />
                  {t.inDevelopment}
                </span>
              )}
            </div>
            <h3>
              <a href={`/projects/${project.slug}`}>{project.title}</a>
            </h3>
            <p>{project.problem}</p>
            <p className="stack">Stack: {project.stack.join(" · ")}</p>
            <MetricList metrics={project.metrics} sourceLabel={t.source} />
            <div className="project-links">
              <a href={project.demo}>{t.demo} ↗</a>
              <a href={project.repo}>{t.repository} ↗</a>
              <a href={`/projects/${project.slug}`}>{t.writeup} →</a>
            </div>
          </article>
        ))}
      </section>
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <div className="section-title">
          <span className="index">02</span>
          <h2 id="skills-heading">{t.skills}</h2>
        </div>
        <dl className="skills">
          {p.skills.map((skill) => (
            <div key={skill.category}>
              <dt>
                {language === "es"
                  ? (translations.es.skillCategories[
                      skill.category as keyof typeof translations.es.skillCategories
                    ] ?? skill.category)
                  : skill.category}
              </dt>
              <dd>{skill.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section
        id="experience"
        className="section"
        aria-labelledby="experience-heading"
      >
        <div className="section-title">
          <span className="index">03</span>
          <h2 id="experience-heading">{t.experience}</h2>
        </div>
        {p.background && <p>{p.background}</p>}
        {p.experience.map((item) => (
          <article
            className="experience"
            key={`${item.company}-${item.period}`}
          >
            <p className="eyebrow">{item.period}</p>
            <h3>
              {item.role} · {item.company}
            </h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </section>
      {p.notes.length > 0 && (
        <section className="section" aria-labelledby="writing-heading">
          <div className="section-title">
            <h2 id="writing-heading">{t.writing}</h2>
          </div>
          {p.notes.map((note) => (
            <article key={note.href}>
              <h3>
                <a href={note.href}>{note.title} ↗</a>
              </h3>
              <p>{note.summary}</p>
            </article>
          ))}
        </section>
      )}
      <section
        id="contact"
        className="section contact"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading">{t.contactLogistics}</h2>
        {p.email && (
          <a className="email" href={`mailto:${p.email}`}>
            {p.email}
          </a>
        )}
        {p.logistics.length > 0 && <p>{p.logistics.join(" · ")}</p>}
      </section>
      <footer>
        <span>
          {p.name} · {language === "es" ? translations.es.role : p.role}
        </span>
        <div>
          <a href="/portfolio.md">{t.plainText}</a>
          <a href="/llms.txt">llms.txt</a>
        </div>
      </footer>
      <AboutDialog
        dialogRef={aboutDialogRef}
        about={language === "en" ? translations.en.about : p.about}
        closeLabel={t.actions.close}
      />
    </main>
  );
}
