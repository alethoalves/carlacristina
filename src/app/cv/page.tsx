/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { resolveCV, type ResolvedExperience as Experience } from "@/content/cv";
import { SiteQR } from "@/components/print/SiteQR";

const {
  competencies,
  courses,
  education,
  experiences,
  profile,
  skills: skillsCore,
  stats,
  tools,
} = resolveCV(null);
import "./print.css";

export const metadata: Metadata = {
  title: "Currículo — Carla C. Felipe",
  robots: { index: false },
};

const PAGE_ONE = 2; // experiências na primeira folha

export default function CVPage() {
  const first = experiences.slice(0, PAGE_ONE);
  const rest = experiences.slice(PAGE_ONE);

  return (
    <div className="cv-root">
      <a href="/carla-felipe-curriculo.pdf" download className="cv-download">
        Baixar PDF
      </a>

      {/* ───────────── Folha 1 ───────────── */}
      <section className="sheet">
        <header className="cv-header">
          <div className="cv-header-bg" />
          <img src="/img/carla-cutout-print.png" alt="Carla C. Felipe" className="cv-portrait" />
          <div className="cv-header-shade" />
          <div className="cv-header-text">
            <p className="mono cv-kicker">Currículo · {new Date().getFullYear()}</p>
            <h1 className="cv-name">
              Carla C.<br />Felipe
            </h1>
            <p className="cv-headline serif">{profile.headline}</p>
            <p className="cv-tagline">{profile.tagline}</p>
          </div>
        </header>

        <div className="cv-contact mono">
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>

        <div className="cv-body">
          <main className="cv-main">
            <Block title="Perfil">
              <p className="cv-summary">{profile.summary}</p>
            </Block>

            <div className="cv-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="cv-stat-num">
                    {s.value.toLocaleString("pt-BR")}
                    <span>{s.suffix}</span>
                  </p>
                  <p className="cv-stat-label">{s.label}</p>
                </div>
              ))}
            </div>

            <Block title="Experiência profissional">
              {first.map((e) => (
                <Job key={e.company + e.start} e={e} />
              ))}
            </Block>
          </main>

          <aside className="cv-side">
            <Block title="Competências">
              <ul className="cv-comp">
                {competencies.map((c) => (
                  <li key={c.title}>
                    <strong>{c.title}</strong>
                    <span>{c.tags.slice(0, 3).join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Ferramentas">
              <ul className="cv-chips">
                {tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Block>
          </aside>
        </div>
        <Footer page={1} />
      </section>

      {/* ───────────── Folha 2 ───────────── */}
      <section className="sheet">
        <div className="cv-topline mono">
          <span>{profile.name}</span>
          <span>{profile.headline}</span>
        </div>
        <div className="cv-body cv-body-2">
          <main className="cv-main">
            <Block title="Experiência profissional (cont.)">
              {rest.map((e) => (
                <Job key={e.company + e.start} e={e} />
              ))}
            </Block>
          </main>
          <aside className="cv-side">
            <Block title="Objetivo">
              <p className="cv-side-text">{profile.objective}</p>
            </Block>
            <Block title="Habilidades-chave">
              <ul className="cv-list">
                {skillsCore.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Block>
            <Block title="Formação">
              {education.map((ed) => (
                <div key={ed.title} className="cv-edu">
                  <strong>{ed.title}</strong>
                  <span>
                    {ed.kind} · {ed.institution}
                  </span>
                  <span className="mono">{ed.period}</span>
                </div>
              ))}
            </Block>
            <Block title="Cursos complementares">
              <ul className="cv-list">
                {courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Block>
          </aside>
        </div>

        <div className="cv-closing">
          <div>
            <p className="mono cv-closing-kicker">Vamos conversar?</p>
            <p className="cv-closing-title">
              Pronta para somar ao seu time <span className="serif">— remoto ou híbrido.</span>
            </p>
          </div>
          <div className="cv-closing-right">
            <div className="cv-closing-contact mono">
              <span>{profile.phone}</span>
              <span>{profile.email}</span>
              {profile.site && <span>{profile.site}</span>}
            </div>
            <SiteQR track={null} className="cv-qr-closing" />
          </div>
        </div>
        <Footer page={2} />
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block">
      <h2 className="mono cv-block-title">{title}</h2>
      {children}
    </section>
  );
}

function Job({ e }: { e: Experience }) {
  return (
    <article className="cv-job">
      <div className="cv-job-head">
        <h3>
          {e.company} <span className="serif">— {e.role}</span>
        </h3>
        <span className="mono cv-job-period">{e.period}</span>
      </div>
      <p className="cv-job-summary">{e.summary}</p>
      {/* Experiências anteriores a 2020 aparecem compactas no PDF */}
      {e.start >= "2020" && (
        <ul className="cv-bullets">
          {e.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Footer({ page }: { page: number }) {
  return (
    <div className="cv-footer mono">
      <span>Carla C. Felipe — Currículo</span>
      <span>{page} / 2</span>
    </div>
  );
}
